export default function TermsAndConditions() {
  return (
    <main className="bg-[#1C1C1A] min-h-screen w-full">
      <div className="max-w-4xl mx-auto px-6 py-20 text-gray-300">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white border-b border-white/10 pb-6 uppercase tracking-tight">
          Terms & Conditions{" "}
          <span className="text-[#C7862F] text-2xl block mt-2 tracking-widest font-light lowercase">
            — The Rules of the House
          </span>
        </h1>

        {/* 1. Usage Agreement */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[#C7862F]">
            1. Acceptance of Terms
          </h2>
          <p className="leading-relaxed mb-6 text-lg">
            By accessing or using <strong>thedopaminecafe.com</strong>, you agree to be bound by these Terms and Conditions. Our services are designed to provide you with the best cafe experience, both digitally and physically. If you do not agree with any part of these terms, please refrain from using our platform.
          </p>
          <p className="leading-relaxed border-l-2 border-[#C7862F] pl-4 italic text-sm">
            We reserve the right to modify these terms at any time. Your continued use of the site after changes are posted constitutes your acceptance of the new terms.
          </p>
        </section>

        {/* 2. Intellectual Property */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white uppercase tracking-wider">
            2. Intellectual Property
          </h2>
          <p className="mb-4">
            All content on this website, including but not limited to the logo, unique coffee blend names, photography, graphic designs, and website code, is the exclusive property of <strong>The Dopamine Cafe</strong>.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>You may not reproduce or distribute any content for commercial purposes.</li>
            <li>Unauthorized use of our branding is strictly prohibited.</li>
          </ul>
        </section>

        {/* 3. Orders & Pricing (Expanded) */}
        <section className="mb-12 bg-white/5 p-8 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-[#C7862F]">
            3. Orders, Pricing & Payments
          </h2>
          <div className="space-y-4">
            <p>
              Menu items, seasonal specials, and prices are subject to change without prior notice. While we strive for accuracy, errors in pricing may occur.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-[#1C1C1A] rounded-lg border border-white/5 text-sm">
                <span className="font-bold text-white block mb-1 underline decoration-[#C7862F]">Order Cancellations:</span>
                Orders can only be cancelled within 5 minutes of placement due to our rapid preparation process.
              </div>
              <div className="p-4 bg-[#1C1C1A] rounded-lg border border-white/5 text-sm">
                <span className="font-bold text-white block mb-1 underline decoration-[#C7862F]">Payment Security:</span>
                All payments are processed via encrypted gateways. We do not store your full card details.
              </div>
            </div>
          </div>
        </section>

        {/* 4. Service Policy & Conduct */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white uppercase tracking-wider">
            4. Service Policy & Conduct
          </h2>
          <p className="mb-4">
            We aim for perfection in every cup. However, please keep in mind:
          </p>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-[#C7862F]">☕</span>
              <p><strong>Busy Hours:</strong> During peak times, delivery and preparation may take slightly longer. We prioritize quality over speed.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-[#C7862F]">🌿</span>
              <p><strong>Dietary Concerns:</strong> Customers must inform us of any allergies or dietary restrictions during the checkout process. We are not liable for undisclosed allergies.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-[#C7862F]">🚫</span>
              <p><strong>Misuse:</strong> We reserve the right to refuse service or block accounts that show signs of fraudulent activity or abuse of our staff.</p>
            </li>
          </ul>
        </section>

        {/* 5. Limitation of Liability */}
        <section className="mb-12 bg-[#C7862F]/10 p-6 rounded-lg border-r-4 border-[#C7862F]">
          <h2 className="text-xl font-bold mb-2 text-white italic uppercase">5. Limitation of Liability</h2>
          <p className="text-sm leading-relaxed">
            The Dopamine Cafe will not be held liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our maximum liability to you for any order shall not exceed the total amount paid for that specific order.
          </p>
        </section>

        {/* 6. Governing Law */}
        <section className="text-center py-10 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-2 text-white uppercase tracking-widest">
            Governing Law
          </h2>
          <p className="text-gray-500 italic max-w-2xl mx-auto mb-6">
            These terms are governed by the local laws of the region where our headquarters are located. Any disputes shall be settled in the local courts.
          </p>
          <div className="mt-8 text-xs text-gray-600 uppercase tracking-tighter">
            Last Updated: January 2026 | Legal Department — The Dopamine Cafe
          </div>
        </section>
      </div>
    </main>
  );
}