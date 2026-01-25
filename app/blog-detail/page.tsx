import PageHeader from '@/components/sections/PageHeader';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from "react-hot-toast";
import BlogDetail from '@/components/sections/BlogDetail';

export default function page() {
  return (
   <main className="relative min-h-screen">

      {/* FIXED BACKGROUND IMAGE */}
      <div className="fixed inset-0 -z-10 bg-[url('/main.jpeg')] bg-cover bg-center bg-no-repeat" />

      {/* OPTIONAL OVERLAY */}
      <div className="fixed inset-0 -z-10 bg-[#fdeabf]/40" />
     <Navbar /> 
      <PageHeader  title={"Blog Details"} backgroundImage = {"/gallery2.png"}/>
      <BlogDetail />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
