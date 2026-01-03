'use client';

import { User, Mail, Phone, Info, Pencil, Instagram, Facebook, Twitter } from "lucide-react";
import { Card } from "../ui/card";

export default function Contact() {
  return (
    <section id="contact" className="pt-14 bg-white">
      <div className="container mx-auto max-w-6xl">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600">We’d love to hear from you!</p>
        </div>

        <div className="grid md:px-0 px-6 pb-14 grid-cols-1 md:grid-cols-3 gap-16">

          {/* LEFT: Contact Info */}
          <div>
            <address className="not-italic space-y-4 text-gray-600">
              <p>785 15h Street, Office 478</p>
              <p>Berlin, DE 81566</p>
              <p>
                <a href="mailto:info@email.com" className="text-gray-800 hover:text-amber-600 transition">
                  info@email.com
                </a>
              </p>
              <p>
                <a href="tel:+18408412569" className="text-gray-800 font-medium hover:text-amber-600 transition">
                  +1 840 841 25 69
                </a>
              </p>
            </address>

            {/* Social Links */}
            <div className="flex gap-4 mt-10">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={`Visit our ${Icon.name} page`}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-amber-600 hover:text-white hover:border-amber-600 transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <form className="space-y-10 col-span-2" aria-label="Contact Form">
            
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center gap-3 border-b border-gray-300 pb-3">
                <User className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full outline-none text-gray-700 placeholder-gray-500"
                />
              </div>

              <div className="flex items-center gap-3 border-b border-gray-300 pb-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full outline-none text-gray-700 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Phone + Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center gap-3 border-b border-gray-300 pb-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="w-full outline-none text-gray-700 placeholder-gray-500"
                />
              </div>

              <div className="flex items-center gap-3 border-b border-gray-300 pb-3">
                <Info className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full outline-none text-gray-700 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex items-start gap-3 border-b border-gray-300 pb-16">
              <Pencil className="w-4 h-4 text-gray-500 mt-1" />
              <textarea
                name="message"
                rows={4}
                placeholder="How can we help you? Feel free to get in touch!"
                className="w-full resize-none outline-none text-gray-700 placeholder-gray-500"
                required
              />
            </div>

            {/* Button + Checkbox */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <button
                type="submit"
                className="bg-amber-600 text-white px-10 py-3 rounded-full hover:opacity-90 transition flex items-center gap-2"
              >
                ✈ Get In Touch
              </button>

              <label className="flex items-center gap-2 text-sm text-gray-500">
                <input type="checkbox" required />
                I agree that my submitted data is{" "}
                <span className="underline cursor-pointer">
                  collected and stored
                </span>
              </label>
            </div>
          </form>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="mx-auto">
        <Card className="overflow-hidden shadow-2xl">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115824.50396460664!2d66.9489125536689!3d24.88038354183107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e85a24caa7f%3A0x9716f7757ab105e0!2zTmV3IFlvcmsgQ29mZmVl25Qg2YbbjNmI24zYp9ix2qkg2qnYp9mB24w!5e0!3m2!1sen!2s!4v1766222723566!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dopamine Cafe Location"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
