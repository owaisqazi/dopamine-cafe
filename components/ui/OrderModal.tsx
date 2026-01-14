import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "./Modal";
import { useOrderMutation } from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice"; // Apna sahi path check karein
import toast from "react-hot-toast";
import PhoneField from "../forms/PhoneField";
import { useRouter } from "next/navigation";
import axiosInstance from "../auth/axiosInstance";
//@ts-ignore
import Cookies from "js-cookie";

interface OrderModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  cartItems: any[];
  totalPrice: number;
  finalTotal: number;
  discountData: any;
  branch: any;
}

const OrderSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too short").required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
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
  discountData,
  branch,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [placeOrder, { isLoading }] = useOrderMutation();
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
    email: "",
    phone: "",
    address: "",
    notes: "",
    payment_method: "cash",
    order_type: "pickup",
    branch_id: branch?.id || "1",
    promo_code_id: discountData?.id || "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const token = Cookies.get("token");
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    formData.append("subtotal", totalPrice.toString());
    formData.append("discount", discountAmount.toString());
    formData.append("total_amount", safeFinalTotal.toString());

    cartItems.forEach((item, index) => {
      formData.append(`products[${index}][product_id]`, item.id.toString());
      formData.append(`products[${index}][quantity]`, item.quantity.toString());
      formData.append(`products[${index}][price]`, item.price.toString());
      formData.append(
        `products[${index}][total_price]`,
        (item.price * item.quantity).toString()
      );
    });

    try {
      const res = await axiosInstance.post(token ? "/user/user/order" : "/user/order", formData, {
        responseType: "text",
      });
      const win = window.open("", "_self");
      win?.document.open();
      win?.document.write(res.data);
      win?.document.close();
    } catch (err: any) {
      console.error("Payment Error", err);
      toast.error("Payment gateway open nahi ho saka");
    }
  };

  return (
    <>
      {/* @ts-ignore */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="max-w-6xl"
      >
        <section className="flex flex-col h-full max-h-[85vh]">
          {/* Header */}
          <header className="p-6 border-b flex justify-between items-center bg-white sticky top-0 z-10">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Complete Checkout
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close Modal"
              className="text-gray-400 hover:text-red-500 transition-colors text-3xl"
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
              <Form className="flex flex-col md:flex-row overflow-hidden">
                {/* Left Side: Form Fields */}
                <div className="flex-1 p-6 overflow-y-scroll space-y-4 md:border-r">
                  <h3 className="font-semibold text-lg text-gray-700 mb-4">
                    Delivery Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Full Name
                      </label>
                      <Field
                        name="name"
                        className={`w-full border rounded-lg p-2.5 mt-1 outline-none ${
                          errors.name && touched.name
                            ? "border-red-500"
                            : "focus:ring-2 focus:ring-amber-500"
                        }`}
                        placeholder="Muhammad Hussnain"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className={`w-full border rounded-lg p-2.5 mt-1 outline-none ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "focus:ring-2 focus:ring-amber-500"
                        }`}
                        placeholder="ihasnain83@gmail.com"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Phone
                      </label>
                      <PhoneField
                        name="phone"
                        className={
                          "border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                        }
                        placeholder="Enter your phone"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Order Type
                      </label>
                      <Field
                        as="select"
                        name="order_type"
                        className="w-full border rounded-lg p-2.5 mt-1 focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                      >
                        <option value="pickup">Pickup</option>
                        <option value="delivery">Delivery</option>
                      </Field>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Address
                    </label>
                    <Field
                      as="textarea"
                      name="address"
                      rows={2}
                      className={`w-full border rounded-lg p-2.5 mt-1 outline-none ${
                        errors.address && touched.address
                          ? "border-red-500"
                          : "focus:ring-2 focus:ring-amber-500"
                      }`}
                      placeholder="House No A-1433..."
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Payment Method
                      </label>
                      <Field
                        as="select"
                        name="payment_method"
                        className="w-full border rounded-lg p-2.5 mt-1 focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                      >
                        <option value="cash">Cash</option>
                        <option value="stripe">Stripe</option>
                        <option value="easypaisa">EasyPaisa</option>
                        <option value="jazzcash">JazzCash</option>
                      </Field>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Notes
                      </label>
                      <Field
                        name="notes"
                        className="w-full border rounded-lg p-2.5 mt-1 focus:ring-2 focus:ring-amber-500 outline-none"
                        placeholder="Spicy All Item"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: Order Summary */}
                <div className="w-full md:w-[350px] bg-gray-50 p-6 flex flex-col">
                  <h3 className="font-semibold text-lg text-gray-700 mb-4">
                    Summary
                  </h3>
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm bg-white p-2 rounded border border-gray-100"
                      >
                        <span className="text-gray-700">
                          {item.name}{" "}
                          <b className="text-gray-400">x{item.quantity}</b>
                        </span>
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${totalPrice?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                      <span>Total</span>
                      <span>${safeFinalTotal?.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-6 w-full py-3.5 text-white rounded-xl font-bold uppercase shadow-md transition-all active:scale-95 flex justify-center items-center ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-amber-500 hover:bg-amber-600"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
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
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
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
