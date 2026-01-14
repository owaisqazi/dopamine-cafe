import PageHeader from '@/components/sections/PageHeader';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from "react-hot-toast";
import Blog from '@/components/sections/Blog';

export default function page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
     <Navbar /> 
      <PageHeader  title={"Blogs"} backgroundImage = {"/gallery5.png"}/>
      <Blog />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
