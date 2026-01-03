"use client";

import { FC } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import PhoneField, { formatPhoneForApi } from "./PhoneField";
import { useLoginMutation, useRegisterMutation } from "@/store/api/authApi";

export interface AuthFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthFormProps {
  isSignup: boolean;
  toggleSignup: () => void;
}

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().required("Password required"),
});

const signupSchema = Yup.object({
  name: Yup.string().required("Name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  phone: Yup.string().min(8, "Invalid phone number").required("Phone required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password required"),
});

const AuthForm: FC<AuthFormProps> = ({ isSignup, toggleSignup }) => {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const handleSubmit = async (
    values: AuthFormValues,
    { setSubmitting, resetForm }: FormikHelpers<AuthFormValues>
  ) => {
    const toastId = toast.loading(isSignup ? "Creating account..." : "Logging in...");
    try {
      // FormData banayein
      const formData = new FormData();
      Object.entries({
        ...values,
        phone: formatPhoneForApi(values.phone), // format phone for API
      }).forEach(([key, value]) => formData.append(key, value));

      const res = isSignup
        ? await register(formData).unwrap()
        : await login(formData).unwrap();

      // Token store
      if (res?.token) localStorage.setItem("token", res.token);

      toast.success(isSignup ? "Account created 🎉" : "Login successful 👋", { id: toastId });
      resetForm();
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid credentials", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<AuthFormValues>
      initialValues={{ name: "", email: "", phone: "", password: "" }}
      validationSchema={isSignup ? signupSchema : loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-5">
          {isSignup && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <div className="flex items-center gap-3 border-b pb-2.5">
                  <User size={16} />
                  <Field name="name" placeholder="Full Name" className="w-full outline-none" />
                </div>
                {touched.name && errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <PhoneField name="phone" className={"border-b"} placeholder="Enter your phone" />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="flex items-center gap-3 border-b pb-2">
            <Mail size={16} />
            <Field
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full outline-none"
            />
          </div>
          {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* Password */}
          <div className="flex items-center gap-3 border-b pb-2">
            <Lock size={16} />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="w-full outline-none"
            />
          </div>
          {touched.password && errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 hover:bg-amber-700"
          >
            {isSubmitting ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
          </Button>

          <p className="text-center text-sm mt-6">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={toggleSignup}
              className="text-amber-600 ml-1 font-medium"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
