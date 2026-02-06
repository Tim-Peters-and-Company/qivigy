import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Home TKTK</h1>
      <Link href="/calculator" className="text-blue-500 hover:text-blue-700">Calculator</Link>
    </div>
  );
}
