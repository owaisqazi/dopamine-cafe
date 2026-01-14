import PageHeader from '@/components/sections/PageHeader';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from "react-hot-toast";
import BlogDetail from '@/components/sections/BlogDetail';

export default function page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
     <Navbar /> 
      <PageHeader  title={"Blog Details"} backgroundImage = {"/gallery2.png"}/>
      <BlogDetail />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
