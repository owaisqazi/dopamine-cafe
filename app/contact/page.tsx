import PageHeader from '@/components/sections/PageHeader';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
     <Navbar /> 
      <PageHeader  title={"Contact Us"} backgroundImage = {"/gellery1.png"}/>
      <Contact />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
