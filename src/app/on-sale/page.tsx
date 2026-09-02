"use client";
import { useApp } from '@/lib/store';
import { ProductCard } from '@/components/ProductCard';

export default function OnSale(){
  const { products } = useApp();
  const items = products.filter(p=> p.salePrice);
  return (
    <div className="container-electro py-6">
      <h1 className="text-xl font-black">On Sale</h1>
      <p className="text-sm text-slate-600">{items.length} deals available</p>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">{items.map(p=> <ProductCard key={p.id} p={p}/>)}</div>
    </div>
  );
}
