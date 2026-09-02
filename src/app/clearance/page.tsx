"use client";
import { useApp } from '@/lib/store';
import { ProductCard } from '@/components/ProductCard';

export default function Clearance(){
  const { products } = useApp();
  const items = products.filter(p=> p.badges.includes('CLEARANCE'));
  return (
    <div className="container-electro py-6">
      <h1 className="text-xl font-black">Clearance</h1>
      <p className="text-sm text-slate-600">Final reductions • Limited stock</p>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">{items.map(p=> <ProductCard key={p.id} p={p}/>)}</div>
      {items.length===0 && <p className="text-sm text-slate-600 mt-4">No clearance items right now.</p>}
    </div>
  );
}
