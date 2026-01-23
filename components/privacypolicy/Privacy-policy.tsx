export default function PrivacyPolicy() {
  return (
    <main className="bg-[#1C1C1A] min-h-screen w-full">
      <div className="max-w-4xl  mx-auto px-6 py-20 text-gray-300">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white border-b border-white/10 pb-6 uppercase tracking-tight">
          Privacy Policy{" "}
          <span className="text-[#C7862F] text-2xl block mt-2 tracking-widest font-light lowercase">
            — The Dopamine Cafe
          </span>
        </h1>

        {/* 1. Introduction Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[#C7862F]">
            1. Commitment to Privacy
          </h2>
          <p className="leading-relaxed mb-6 text-lg">
            At <strong>The Dopamine Cafe</strong>, your privacy matters to us as
            much as the quality of our beans. We understand that your personal
            data is sensitive, and we are committed to being transparent about
            how we collect, use, and protect it. Whether you are ordering a
            latte via our web portal or signing up for our newsletter, we ensure
            your information is handled with extreme care.
          </p>
          <p className="leading-relaxed">
            This policy applies to all users of our website, mobile application,
            and digital services. By using our platform, you acknowledge that
            you have read and understood our data practices.
          </p>
        </section>

        {/* 2. Data Collection Section (Expanded) */}
        <section className="mb-12 border-l-2 border-[#C7862F]/30 pl-8">
          <h2 className="text-2xl font-semibold mb-6 text-white italic underline decoration-[#C7862F] decoration-2 underline-offset-8">
            2. Information We Collect
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-[#C7862F] font-bold mb-2 uppercase text-sm tracking-widest">
                A. Personal Identification
              </h3>
              <p>
                When you place an order, we collect your name, phone number,
                delivery address, and email to ensure your dopamine fix reaches
                the right person at the right time.
              </p>
            </div>
            <div>
              <h3 className="text-[#C7862F] font-bold mb-2 uppercase text-sm tracking-widest">
                B. Transactional Details
              </h3>
              <p>
                We collect order history, payment method details (processed via
                secure third-party gateways), and billing information for
                accounting and customer support purposes.
              </p>
            </div>
            <div>
              <h3 className="text-[#C7862F] font-bold mb-2 uppercase text-sm tracking-widest">
                C. Technical & Usage Data
              </h3>
              <p>
                To improve our website performance, we collect IP addresses,
                browser types, and device information through cookies. This
                helps us optimize our interface for your specific device.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Data Protection (Highlighted) */}
        <section className="bg-white/5 p-8 border border-white/10 rounded-2xl mb-12 shadow-2xl backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-[#C7862F] flex items-center gap-2">
            Security & Protection
          </h2>
          <p className="mb-4 leading-relaxed">
            <strong>The Dopamine Cafe</strong> employs industry-standard
            encryption protocols (SSL/TLS) to secure your data during
            transmission. We do not store full credit card details on our local
            servers; instead, we rely on PCI-DSS compliant payment processors.
          </p>
          <p className="text-sm opacity-80 italic">
            Note: While we take every precaution, no method of transmission over
            the internet is 100% secure. We encourage you to use strong
            passwords and avoid sharing account details.
          </p>
        </section>

        {/* 4. Third-Party Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white uppercase tracking-wider">
            3. Third-Party Disclosure
          </h2>
          <p className="mb-4">
            We value your trust. We <strong>never</strong> sell, rent, or trade
            your personal data to marketing agencies. Data sharing is limited
            to:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="bg-white/5 p-4 rounded-lg border border-white/5">
              🚚 <span className="ml-2 font-bold">Logistics Partners</span> (to
              deliver your coffee)
            </li>
            <li className="bg-white/5 p-4 rounded-lg border border-white/5">
              💳 <span className="ml-2 font-bold">Payment Processors</span> (to
              secure transactions)
            </li>
            <li className="bg-white/5 p-4 rounded-lg border border-white/5">
              ⚖️ <span className="ml-2 font-bold">Legal Authorities</span> (only
              when required by law)
            </li>
            <li className="bg-white/5 p-4 rounded-lg border border-white/5">
              🛠️ <span className="ml-2 font-bold">Tech Support</span> (to fix
              website bugs)
            </li>
          </ul>
        </section>

        {/* 5. User Rights */}
        <section className="mb-12 bg-[#C7862F]/10 p-6 rounded-lg border-r-4 border-[#C7862F]">
          <h2 className="text-xl font-bold mb-2 text-white">Your Rights</h2>
          <p>
            You have the right to request access to the data we hold about you,
            ask for corrections, or request the deletion of your account at any
            time. To exercise these rights, please contact our support team.
          </p>
        </section>

        {/* 6. Consent & Updates */}
        <section className="text-center py-10 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-2 text-white uppercase tracking-widest">
            Consent
          </h2>
          <p className="text-gray-500 italic max-w-2xl mx-auto">
            By continuing to browse this site or placing an order, you agree to
            our terms. We reserve the right to modify this policy; updates will
            be posted here immediately.
          </p>
          <div className="mt-8 text-xs text-gray-600 uppercase tracking-tighter">
            Last Updated: January 2026 | © The Dopamine Cafe
          </div>
        </section>
      </div>
    </main>
  );
}
