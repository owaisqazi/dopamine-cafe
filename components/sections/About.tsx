'use client';

import { Heart, Award, Users } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
const features = [
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every drink and dish is crafted with passion and attention to detail',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'We source the finest ingredients to ensure exceptional taste',
  },
  {
    icon: Users,
    title: 'Community Vibe',
    description: 'A welcoming space where connections are made over great coffee',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            More than just a cafe, we are a happiness hub where every visit boosts your mood
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white border-none"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2024, Dopamine Cafe was born from a simple idea: create a space where
              people can escape the daily grind and find their moment of joy. Named after the
              happiness hormone, we believe in serving more than just coffee.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our baristas are artists, our chefs are passionate creators, and our space is
              designed to uplift your spirits. Whether you are working, meeting friends, or
              enjoying some alone time, Dopamine Cafe is your happy place.
            </p>
          </div>
          <div className="order-1 md:order-2 overflow-hidden rounded-2xl shadow-2xl group">
            <img
              src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Cafe interior"
              className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
