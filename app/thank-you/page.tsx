import Footer from "@/components/sections/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import ThankYou from "@/components/ThankYou/ThankYou";

export default function page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      <ThankYou />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
