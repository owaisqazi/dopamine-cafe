import Navbar from "@/components/navbar/Navbar";
import PageHeader from "@/components/sections/PageHeader";
import Footer from "@/components/sections/Footer";
// import Detail from "@/components/sections/Detail";
import { Toaster } from "react-hot-toast";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      <PageHeader title="Detail" backgroundImage="/gallery2.png" />
      {/* <Detail /> */}
      <Footer />
      <Toaster position="top-right" />
    </main>
  );
}
