/* eslint-disable @next/next/no-img-element */
"use client";

const images = [
  { url: "/gellery1.png", alt: "Latte art" },
  { url: "/gallery2.png", alt: "Coffee beans" },
  { url: "/gallery3.png", alt: "Cafe atmosphere" },
  { url: "/gallery4.png", alt: "Desserts" },
  { url: "/gallery5.png", alt: "Coffee cup" },
  { url: "/gallery6.png", alt: "Breakfast" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        {/* Heading animation */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Gallery</h2>
          <p className="text-xl text-gray-600">Moments that make us smile</p>
        </div>

        {/* Images grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration={1000}
              data-aos-delay={index * 200}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-square cursor-pointer"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-white font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
