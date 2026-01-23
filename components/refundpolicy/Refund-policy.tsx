
export default function RefundPolicy() {
  return (
    <main className="bg-[#1C1C1A] min-h-screen w-full">
      <div className="max-w-4xl mx-auto px-6 py-20 text-gray-300">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white border-b border-white/10 pb-6 uppercase tracking-tight">
          Refund Policy{" "}
          <span className="text-[#C7862F] text-2xl block mt-2 tracking-widest font-light lowercase">
            — Satisfaction Guaranteed
          </span>
        </h1>

        {/* 1. General Rule Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[#C7862F]">
            1. General Philosophy
          </h2>
          <p className="leading-relaxed mb-6 text-lg">
            At <strong>The Dopamine Cafe</strong>, we strive to deliver the perfect cup and the freshest treats every single time. 
            Due to the perishable nature of our food and beverage products, <strong>all sales are generally final.</strong> 
            However, we are human, and if we miss the mark, we are committed to making it right.
          </p>
        </section>

        {/* 2. Quality Assurance & Eligibility */}
        <section className="mb-12 border-l-2 border-[#C7862F]/30 pl-8">
          <h2 className="text-2xl font-semibold mb-6 text-white italic underline decoration-[#C7862F] decoration-2 underline-offset-8">
            2. Eligibility for Refund or Exchange
          </h2>
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
              <h3 className="text-[#C7862F] font-bold mb-2 uppercase text-sm tracking-widest">
                A. Quality Concerns
              </h3>
              <p>
                If your coffee isn&lsquo;t up to our usual standards (e.g., burnt milk, incorrect roast) or your food is undercooked, we take full responsibility. 
                Verified quality concerns will receive a full replacement or refund, even if the item has been partially consumed.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
              <h3 className="text-[#C7862F] font-bold mb-2 uppercase text-sm tracking-widest">
                B. Incorrect Orders
              </h3>
              <p>
                Did we serve you a Latte instead of a Flat White? Or maybe a different pastry? Please notify our staff or contact support immediately so we can swap it out for you at no extra cost.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
              <h3 className="text-[#C7862F] font-bold mb-2 uppercase text-sm tracking-widest">
                C. Non-Perishable Items
              </h3>
              <p>
                For merchandise (mugs, coffee beans bags, or equipment), items must be returned within 7 days in their original, unopened packaging for a full refund.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Reporting Window (Highlighted) */}
        <section className="bg-white/5 p-8 border border-white/10 rounded-2xl mb-12 shadow-2xl backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-[#C7862F] flex items-center gap-2">
            Reporting & Timelines
          </h2>
          <p className="mb-4 leading-relaxed">
            All issues must be reported <strong>immediately or on the same day of purchase</strong>. 
            For online orders, please reach out via our support channel within 2 hours of delivery to qualify for a re-delivery or refund.
          </p>
          <div className="bg-[#C7862F]/20 p-4 rounded text-sm text-amber-100 font-medium border border-[#C7862F]/30">
            💡 Pro Tip: Keeping your digital or physical receipt makes the verification process much faster!
          </div>
        </section>

        {/* 4. Non-Refundable Situations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white uppercase tracking-wider">
            3. Non-Refundable Scenarios
          </h2>
          <p className="mb-4 text-gray-400">Please note that we cannot offer refunds in the following cases:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="bg-red-900/10 p-4 rounded-lg border border-red-900/20 text-gray-400">
              ❌ <span className="ml-2">Change of mind after consumption.</span>
            </li>
            <li className="bg-red-900/10 p-4 rounded-lg border border-red-900/20 text-gray-400">
              ❌ <span className="ml-2">Incorrect address provided by customer.</span>
            </li>
            <li className="bg-red-900/10 p-4 rounded-lg border border-red-900/20 text-gray-400">
              ❌ <span className="ml-2">Late pickup of take-away orders.</span>
            </li>
            <li className="bg-red-900/10 p-4 rounded-lg border border-red-900/20 text-gray-400">
              ❌ <span className="ml-2">Slight taste variations in natural beans.</span>
            </li>
          </ul>
        </section>

        {/* 5. Processing Time */}
        <section className="mb-12 bg-[#C7862F]/10 p-6 rounded-lg border-r-4 border-[#C7862F]">
          <h2 className="text-xl font-bold mb-2 text-white italic">How you get your money back</h2>
          <p>
            Approved refunds will be processed through the <strong>original payment method</strong>. 
            Credit card or digital wallet refunds usually take <strong>3 to 5 business days</strong> 
            to reflect in your statement, depending on your bank&lsquo;s policies.
          </p>
        </section>

        {/* 6. Closing */}
        <section className="text-center py-10 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-2 text-white uppercase tracking-widest">
            Need Help?
          </h2>
          <p className="text-gray-500 italic max-w-2xl mx-auto">
            Our goal is to keep your dopamine levels high. If you are unhappy with your order, 
            please talk to our manager on duty or email us at support@thedopaminecafe.com.
          </p>
          <div className="mt-8 text-xs text-gray-600 uppercase tracking-tighter">
            Last Updated: January 2026 | Quality Team — The Dopamine Cafe
          </div>
        </section>
      </div>
    </main>
  );
}