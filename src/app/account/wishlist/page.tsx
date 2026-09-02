"use client";
import { useApp } from '@/lib/store';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';

export default function WishlistPage(){
  const { wishlist, products } = useApp();
  const items = products.filter(p=> wishlist.includes(p.id));
  if(items.length===0) return <div className="container-electro py-12 text-center"><h1 className="font-black text-xl">Your Wishlist is Empty</h1><p className="text-slate-600 text-sm mt-2">Save items to view them here.</p><Link href="/" className="inline-block mt-4 bg-[#0B1D3A] text-white px-6 py-2 rounded-full">Continue shopping</Link></div>;
  return (
    <div className="container-electro py-6">
      <h1 className="text-xl font-black">Wishlist ({items.length})</h1>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map(p=> <ProductCard key={p.id} p={p}/>)}
      </div>
    </div>
  );
}
