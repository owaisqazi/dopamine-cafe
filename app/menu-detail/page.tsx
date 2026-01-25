import Navbar from "@/components/navbar/Navbar";
import PageHeader from "@/components/sections/PageHeader";
import Footer from "@/components/sections/Footer";
// import Detail from "@/components/sections/Detail";
import { Toaster } from "react-hot-toast";

export default function Page() {
  return (
    <main className="relative min-h-screen">

      {/* FIXED BACKGROUND IMAGE */}
      <div className="fixed inset-0 -z-10 bg-[url('/main.jpeg')] bg-cover bg-center bg-no-repeat" />

      {/* OPTIONAL OVERLAY */}
      <div className="fixed inset-0 -z-10 bg-[#fdeabf]/40" />

      <Navbar />

      {/* Page Header */}
      <PageHeader
        customClass="h-[500px]"
        title="Detail"
        backgroundImage="/gallery2.png" // yahan aap apni header image
      />

      {/* <Detail /> */}

      <Footer />

      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
