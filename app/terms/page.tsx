import PageHeader from '@/components/sections/PageHeader';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from "react-hot-toast";
import RefundPolicy from '@/components/refundpolicy/Refund-policy';
import TermsAndConditions from '@/components/termsandconditions/TermsAndConditions';

export default function page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
     <Navbar /> 
      <PageHeader customClass="h-[500px]" title={"Terms And Conditions"} backgroundImage = {"/terms.png"}/>
      <TermsAndConditions />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
