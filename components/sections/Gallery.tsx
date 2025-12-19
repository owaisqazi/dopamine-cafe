'use client';

const images = [
  {
    url: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Latte art',
  },
  {
    url: 'https://images.pexels.com/photos/1833399/pexels-photo-1833399.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Coffee beans',
  },
  {
    url: 'https://images.pexels.com/photos/1228497/pexels-photo-1228497.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Cafe atmosphere',
  },
  {
    url: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Desserts',
  },
  {
    url: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Coffee cup',
  },
  {
    url: 'https://images.pexels.com/photos/1030946/pexels-photo-1030946.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Breakfast',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Gallery</h2>
          <p className="text-xl text-gray-600">Moments that make us smile</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-square cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
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
