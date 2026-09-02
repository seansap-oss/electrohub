import Link from 'next/link';
export default function NotFound(){
  return <div className="container-electro py-16 text-center"><h1 className="text-3xl font-black">404</h1><p className="text-slate-600 mt-2">Page not found</p><Link href="/" className="inline-block mt-4 bg-[#0B1D3A] text-white px-6 py-2 rounded-full">Go Home</Link></div>;
}
