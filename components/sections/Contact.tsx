'use client';

import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Location',
    content: '123 Coffee Street, Cafe District, Mumbai - 400001',
  },
  {
    icon: Clock,
    title: 'Hours',
    content: 'Mon - Sun: 8:00 AM - 11:00 PM',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+91 98765 43210',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'hello@dopaminecafe.com',
  },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Visit Us</h2>
          <p className="text-xl text-gray-600">We would love to see you!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{info.title}</h3>
                  <p className="text-gray-600 text-sm">{info.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.14571092415!2d72.71637696565174!3d19.08219783894024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Card>

          <div className="flex justify-center gap-6 mt-8">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-600 text-white hover:bg-amber-700 hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
