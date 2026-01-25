import PageHeader from "@/components/sections/PageHeader";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import MyOrders from "@/components/sections/MyOrders";

export default function page() {
  return (
    <main className="relative min-h-screen">
      
      {/* FIXED BACKGROUND IMAGE */}
      <div className="fixed inset-0 -z-10 bg-[url('/main.jpeg')] bg-cover bg-center bg-no-repeat" />

      {/* OPTIONAL OVERLAY */}
      <div className="fixed inset-0 -z-10 bg-[#fdeabf]/40" />

      <Navbar />

      <PageHeader
        customClass="h-[500px]"
        title={"My Orders"}
        backgroundImage={"/order.png"}
      />

      <MyOrders />

      <Footer />

      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
