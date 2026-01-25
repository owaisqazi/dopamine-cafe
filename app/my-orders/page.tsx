import PageHeader from '@/components/sections/PageHeader';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from "react-hot-toast";
import MyOrders from '@/components/sections/MyOrders';

export default function page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
     <Navbar /> 
      <PageHeader customClass="h-[500px]" title={"My Orders"} backgroundImage = {"/order.png"}/>
      <MyOrders />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
