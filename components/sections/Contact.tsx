"use client";

import { User, Mail, Info, Pencil, Instagram, Facebook } from "lucide-react";
import { Card } from "../ui/card";
import { useContactMutation } from "@/store/api/authApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import PhoneField, { formatPhoneForApi } from "../forms/PhoneField";

interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  // agree: boolean;
}

export default function Contact() {
  const [contact] = useContactMutation();

  const initialValues: ContactFormValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    // agree: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string(),
    subject: Yup.string(),
    message: Yup.string().required("Message is required"),
    // agree: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const handleSubmit = async (
    values: ContactFormValues,
    { resetForm }: any,
  ) => {
    try {
      const formData = new FormData();

      Object.entries({
        ...values,
        phone: values.phone ? formatPhoneForApi(values.phone) : "", // ✅ default to ""
      }).forEach(([key, value]) => {
        formData.append(key, value || ""); // still safe
      });

      await contact(formData).unwrap();
      toast.success("Message sent successfully 🎉");
      resetForm();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1GUe2cv7Y2/",
      Icon: Facebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/accounts/login/?next=%2Fthedopaminecafe_&source=omni_redirect",
      Icon: Instagram,
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@thedopaminecafe?_r=1&_t=ZS-93JsmAenl6W",
      Icon: "tiktok",
    },
  ];

  return (
    <section id="contact" className="pt-20 relative z-20">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        {/* <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600">We’d love to hear from you!</p>
        </div> */}

        <div className="grid md:px-0 px-6 pb-14 grid-cols-1 md:grid-cols-3 gap-16">
          {/* LEFT: Contact Info */}
          <div>
            <address className="not-italic space-y-4 text-gray-600">
              <p>
                Shop # 2 & 3, Dopamine (Restaurant & Coffee Bar), Sindhi Muslim
                Cooperative Housing Society Block A Sindhi Muslim CHS (SMCHS),
                Karachi
              </p>
              <p>
                <a
                  href="mailto:info@thedopaminecafe.com"
                  className="text-gray-800 hover:text-[#C7862F] transition"
                >
                  info@thedopaminecafe.com
                </a>
              </p>
              <h6>Contact Number</h6>
              <p>
                <a
                  href="https://wa.me/+923002444443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 font-medium hover:text-[#C7862F] transition"
                >
                  +92 300 2444443
                </a>
              </p>
              <p>
                <a
                  href="tel:021-37229364"
                  className="text-gray-800 font-medium hover:text-[#C7862F] transition"
                >
                  021-37229364
                </a>
              </p>
            </address>

            <div className="flex gap-4 mt-10">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${item.name} page`}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-[#C7862F] hover:text-white hover:border-[#C7862F] transition"
                >
                  {item.Icon === "tiktok" ? (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.15 2h2.1c.15 1.2.75 2.4 1.8 3.3 1.05.9 2.25 1.35 3.45 1.5v2.1c-1.5 0-3-.45-4.35-1.35v6.9c0 3.45-2.85 6.3-6.3 6.3S2.7 18 2.7 14.55c0-3.3 2.55-6 5.85-6.3v2.25c-1.8.3-3.15 1.8-3.15 3.75 0 2.1 1.65 3.75 3.75 3.75s3.75-1.65 3.75-3.75V2z" />
                    </svg>
                  ) : (
                    <item.Icon className="w-4 h-4" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Contact Form with Formik */}
          <div className="col-span-2">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-10">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center gap-3 border-b border-gray-300 pb-3">
                      <User className="w-4 h-4 text-black" />{" "}
                      {/* Icon color change */}
                      <Field
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full outline-none bg-transparent text-black placeholder-[#FFEABF] placeholder:text-black"
                      />
                    </div>
                    <div className="flex items-center gap-3 border-b border-gray-300 pb-3">
                      <Mail className="w-4 h-4 text-black" />
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="w-full outline-none bg-transparent text-black placeholder-[#FFEABF] placeholder:text-black"
                      />
                    </div>
                  </div>

                  {/* Phone + Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center gap-3 border-b border-gray-300 pb-3">
                      {/* Note: PhoneField ke andar ja kar bhi aapko styling check karni hogi */}
                      <PhoneField
                        name="phone"
                        className="bg-transparent text-black placeholder-[#FFEABF] placeholder:text-black"
                        placeholder="Enter your phone"
                      />
                    </div>
                    <div className="flex items-center gap-3 border-b border-gray-300 pb-3">
                      <Info className="w-4 h-4 text-black" />
                      <Field
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="w-full outline-none bg-transparent text-black placeholder-[#FFEABF] placeholder:text-black"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex items-start gap-3 border-b border-gray-300 pb-16">
                    <Pencil className="w-4 h-4 text-black mt-1" />
                    <Field
                      as="textarea"
                      name="message"
                      rows={4}
                      placeholder="How can we help you? Feel free to get in touch!"
                      className="w-full resize-none outline-none bg-transparent text-black placeholder-[#FFEABF] placeholder:text-black"
                    />
                  </div>

                  {/* Button */}
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#C7862F] text-white px-10 py-3 rounded-full hover:opacity-90 transition flex items-center gap-2"
                    >
                      {isSubmitting ? "Submitting..." : "✈ Get In Touch"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="mx-auto">
        <Card className="overflow-hidden h-[500px] shadow-2xl">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.003051195576!2d67.05244921059484!3d24.863745377835045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f45b541471b%3A0xc5c74230cd401e3d!2sThe%20Dopamine%20Cafe!5e0!3m2!1sen!2s!4v1769136809523!5m2!1sen!2s"
              width="100%"
              height="500px"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Dopamine Cafe Location"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
