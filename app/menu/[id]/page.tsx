import MenuPageClient from "./MenuPageClient";

// 👇 This is REQUIRED for static export
export async function generateStaticParams() {
  // You MUST return all possible IDs here
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}

export default function Page({ params }: { params: { id: string } }) {
  return <MenuPageClient />;
}