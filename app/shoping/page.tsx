import PageHeader from '@/components/sections/PageHeader';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from "react-hot-toast";
import ShoppingCart from '@/components/sections/ShoppingCart';

export default function page() {
  return (
    <main className="min-h-screen bg-white">
     <Navbar /> 
      <PageHeader title={"shoping Cart"} backgroundVideo = {"/about.mp4"}/>
      <ShoppingCart />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
