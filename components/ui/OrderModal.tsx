"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice"; // Apna sahi path check karein
import toast from "react-hot-toast";
import PhoneField from "../forms/PhoneField";
import { useRouter } from "next/navigation";
import axiosInstance from "../auth/axiosInstance";
//@ts-ignore
import Cookies from "js-cookie";
import {
  useGetOrderTypesQuery,
  useGetPaymentMethodsQuery,
} from "@/store/api/authApi";

interface OrderModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  cartItems: any[];
  totalPrice: number;
  finalTotal: number;
  delivery: number;
  discountData: any;
  branch: any;
}

const OrderSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too short").required("Full name is required"),
  // email: Yup.string()
  //   .email("Invalid email address")
  //   .required("Email is required"),
  phone: Yup.string()
    .min(10, "Invalid phone number")
    .required("Phone is required"),
  address: Yup.string()
    .min(10, "Please provide full address")
    .required("Delivery address is required"),
  payment_method: Yup.string().required("Please select payment method"),
  order_type: Yup.string().required("Please select order type"),
});

const OrderModal: React.FC<OrderModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  cartItems,
  totalPrice,
  finalTotal,
  delivery,
  discountData,
  branch,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { data: orderTypes } = useGetOrderTypesQuery();
  const { data: paymentMethods } = useGetPaymentMethodsQuery();
  const calculateDiscount = () => {
    if (!discountData) return 0;
    if (discountData?.type === "percentage") {
      const percentValue = (totalPrice * discountData.amount) / 100;
      return Math.min(percentValue, totalPrice);
    }
    return Math.min(discountData.amount, totalPrice);
  };
  const discountAmount = calculateDiscount();
  const safeFinalTotal = Math.max(totalPrice - discountAmount, 0);

  const initialValues = {
    name: "",
    // email: "",
    phone: "",
    address: "",
    notes: "",
    payment_method: "cash on delivery",
    order_type: "delivery",
    branch_id: branch?.id || "1",
    promo_code_id: discountData?.id || "",
  };

  console.log(orderTypes,paymentMethods, "discountData===?");
  const handleSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    console.log(cartItems, "discountData===?");
    formData.append("subtotal", totalPrice.toString());
    formData.append("discount", discountAmount.toString());
    formData.append("delivery_charges", delivery.toString());
    formData.append("total_amount", finalTotal.toString());

    cartItems.forEach((item, itemIndex) => {
      formData.append(`products[${itemIndex}][product_id]`, item.id.toString());

      formData.append(
        `products[${itemIndex}][quantity]`,

        item.quantity.toString(),
      );

      formData.append(`products[${itemIndex}][price]`, item.price.toString());

      formData.append(
        `products[${itemIndex}][description]`,

        item.description || "",
      );

      formData.append(
        `products[${itemIndex}][total_price]`,

        (item.price * item.quantity).toString(),
      );

      const options = item?.options || [];

      if (options.length > 0) {
        options.forEach((opt: any, optIndex: number) => {
          formData.append(
            `products[${itemIndex}][options][${optIndex}]`,

            opt.id.toString(),
          );
        });
      }
    });

    try {
      const res = await axiosInstance.post(
        token ? "/user/user/order" : "/user/order",
        formData,
        { responseType: "json" },
      );

      if (res.status === 200 || res.status === 201) {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTimeInMinutes = hours * 60 + minutes;

        const isLateNightOrder =
          currentTimeInMinutes >= 180 && currentTimeInMinutes < 510;

        if (res.data?.order?.payment_method === "cash on delivery") {
          if (isLateNightOrder) {
            toast.success(
              "Your order has been successfully received. It will be delivered at 9:30 AM.",
              {
                duration: 6000,
                icon: "⏰",
              },
            );
          } else {
            toast.success(
              res.data.message || "Order successfully submitted! 🎉",
            );
          }

          dispatch(clearCart());
          router.push("/");
        } else {
          // Online Payment Flow
          const win = window.open("", "_self");
          win?.document.open();
          win?.document.write(res.data);
          win?.document.close();
          dispatch(clearCart());
        }
      }

      setIsModalOpen(false);
      setIsLoading(false);
    } catch (err: any) {
      console.error("Payment Error", err);
      setIsLoading(false);
      toast.error("We were unable to process your order. Please try again");
    }
  };

  // console.log("Payment cartItems", cartItems);

  return (
    <>
      {/* @ts-ignore */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="max-w-6xl"
      >
        <section className="relative flex flex-col md:h-full h-full max-h-[90vh] md:max-h-[85vh] overflow-hidden">
          {/* 🔹 BACKGROUND IMAGE */}
          <div className="absolute inset-0 -z-10 bg-[url('/main.jpeg')] bg-cover bg-center bg-no-repeat" />

          {/* 🔹 OVERLAY */}
          <div className="absolute inset-0 -z-10 bg-[#e2e2e2a6]/40" />
          {/* Header */}
          <header className="p-6 flex justify-between items-center sticky top-0 z-10">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Complete Checkout
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close Modal"
              className="text-[#000] hover:text-gray-900 text-3xl placeholder-[#000] font-bold  focus:outline-none"
            >
              &times;
            </button>
          </header>

          <Formik
            initialValues={initialValues}
            validationSchema={OrderSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col md:flex-row md:overflow-hidden overflow-auto h-[500px]">
                {/* Left Side: Form Fields */}
                <div className="flex-1 p-6 md:overflow-y-scroll space-y-4 md:border-r">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    Delivery Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-md font-bold text-gray-900">
                        Full Name
                      </label>
                      <Field
                        name="name"
                        className={`w-full border rounded-lg placeholder-[#000] font-bold bg-[#566b30] p-2.5 mt-1 outline-none ${
                          errors.name && touched.name
                            ? "border-red-500"
                            : "focus:ring-2 focus:ring-[#566b30]"
                        }`}
                        placeholder="Enter Your Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    {/* <div>
                      <label className="text-md font-bold text-gray-900">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className={`w-full border rounded-lg placeholder-[#000] font-bold bg-[#566b30] p-2.5 mt-1 outline-none ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "focus:ring-2 focus:ring-[#566b30]"
                        }`}
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div> */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-md font-bold text-gray-900">
                        Phone
                      </label>
                      <PhoneField
                        name="phone"
                        className={
                          "border rounded-lg placeholder-[#000] font-bold bg-[#566b30] p-2 mt-1 focus:ring-2 focus:ring-[#566b30] outline-none"
                        }
                        placeholder="Enter Your Phone"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-md font-bold text-gray-900">
                        Order Type
                      </label>

                      <Field
                        as="select"
                        name="order_type"
                        className="w-full px-2 border rounded-lg placeholder-[#000] font-bold bg-[#566b30] py-3.5 mt-1 focus:ring-2 focus:ring-[#566b30] outline-none"
                      >
                        <option value="">Select Order Type</option>

                        {orderTypes?.data?.map((item: any) => (
                          <option key={item.id} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>

                  <div>
                    <label className="text-md font-bold text-gray-900">
                      Address
                    </label>
                    <Field
                      as="textarea"
                      name="address"
                      rows={2}
                      className={`w-full border rounded-lg placeholder-[#000] font-bold bg-[#566b30] p-2.5 mt-1 outline-none ${
                        errors.address && touched.address
                          ? "border-red-500"
                          : "focus:ring-2 focus:ring-[#566b30]"
                      }`}
                      placeholder="Enter Your Address"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-md font-bold text-gray-900">
                        Payment Method
                      </label>

                      <Field
                        as="select"
                        name="payment_method"
                        className="w-full border capitalize rounded-lg placeholder-[#000] font-bold bg-[#566b30] p-2.5 mt-1 focus:ring-2 focus:ring-[#566b30] outline-none "
                      >
                        <option value="">Select Payment</option>

                        {paymentMethods?.data?.map((item: any) => (
                          <option key={item.id} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div>
                      <label className="text-md font-bold text-gray-900">
                        Notes
                      </label>
                      <Field
                        name="notes"
                        className="w-full border rounded-lg placeholder-[#000] font-bold bg-[#566b30] p-2.5 mt-1 focus:ring-2 focus:ring-[#566b30] outline-none"
                        placeholder="Enter Your Notes (e.g., Spicy All Item)"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: Order Summary */}
                <div className="w-full shadow-xl border-t  md:w-[350px] p-6 flex flex-col">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    Summary
                  </h3>
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
                    {cartItems.map((item) => {
                      const options = item?.options || [];

                      const optionsTotal = options.reduce(
                        (sum: number, opt: any) =>
                          sum + Number(opt?.price_modifier ?? 0),
                        0,
                      );

                      const itemTotal =
                        (Number(item.price) + optionsTotal) *
                        Number(item.quantity);

                      return (
                        <div
                          key={item.id}
                          className="bg-white p-3 rounded border border-gray-100 space-y-2"
                        >
                          <div className="flex justify-between text-md">
                            <span className="text-gray-900">
                              {item.name}{" "}
                              <b className="text-gray-400">
                                Qty {item.quantity}
                              </b>
                            </span>
                            <span className="font-semibold">
                              Rs.{itemTotal.toFixed(2)}
                            </span>
                          </div>

                          {/* ✅ Show Selected Options */}
                          {options.length > 0 && (
                            <div className="ml-2 space-y-1">
                              {options.map((opt: any) => {
                                const optionPrice = Number(
                                  opt?.price_modifier ?? 0,
                                );

                                return (
                                  <div
                                    key={opt.id}
                                    className="flex justify-between text-xs text-gray-900"
                                  >
                                    <span>+ {opt.name}</span>
                                    <span>Rs.{optionPrice.toFixed(2)}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t pt-4 space-y-2 text-md">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rs.{totalPrice?.toFixed(2)}</span>
                    </div>
                    {discountAmount !== 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>Discount</span>
                        <span>Rs.{Number(discountAmount)?.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span>Rs.{Number(delivery)?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between placeholder-[#000] font-bold text-lg pt-2 border-t mt-2">
                      <span>Total</span>
                      <span>Rs.{Number(finalTotal)?.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-6 w-full py-3.5 text-white rounded-xl placeholder-[#000] font-bold bg-[#566b30] uppercase shadow-md transition-all flex justify-center items-center gap-2 ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#566b30] hover:bg-[#3a3a37]"
                    }`}
                  >
                    {isLoading && (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    {isLoading ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </Modal>
    </>
  );
};

export default OrderModal;
