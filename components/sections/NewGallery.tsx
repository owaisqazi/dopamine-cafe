/* eslint-disable @next/next/no-img-element */
"use client";

export default function NewGallery() {
  const galleryItems = [
    { url: "/gallery2.png", title: "Coffee", subtitle: "Freshly Brewed" },
    { url: "/gallery4.png", title: "Cakes", subtitle: "Sweet Treats" },
    { url: "/gellery1.png", title: "Tea", subtitle: "Premium Selection" },
  ];

  return (
    <section
      id="gallery"
      className="py-16 px-4 bg-[#F2ECE4]"
      style={{ backgroundAttachment: "fixed" }}
      aria-label="Gallery of Dopamine Cafe"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <header className="text-center mb-8">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Gallery</h2>
          <p className="text-xl text-gray-600">Moments that make us smile</p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          {/* LEFT LARGE IMAGE */}
          <div className="md:col-span-3 relative group overflow-hidden rounded-sm cursor-pointer">
            <img
              src={galleryItems[0].url}
              alt={galleryItems[0].title}
              className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" role="img" aria-label={`${galleryItems[0].title}: ${galleryItems[0].subtitle}`}>
                <h3 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                  {galleryItems[0].title}
                </h3>
                <p className="text-white/90 text-xl font-medium mt-2">
                  {galleryItems[0].subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {galleryItems.slice(1).map((item, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-sm h-[200px] md:h-[292px] cursor-pointer"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                    role="img"
                    aria-label={`${item.title}: ${item.subtitle}`}
                  >
                    <h3 className="text-white text-3xl font-bold uppercase">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
