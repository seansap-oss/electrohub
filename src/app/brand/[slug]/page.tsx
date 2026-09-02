"use client";
import { useParams } from 'next/navigation';
import { useApp } from '@/lib/store';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';

export default function BrandPage(){
  const { slug } = useParams() as {slug:string};
  const { brands, products } = useApp();
  const brand = brands.find(b=> b.slug===slug);
  if(!brand) return <div className="container-electro py-12">Brand not found</div>;
  const items = products.filter(p=> p.brandId===brand.id);
  return (
    <div className="container-electro py-6">
      <Link href="/brands" className="text-sm text-[#0066CC]">← All Brands</Link>
      <div className="mt-3 bg-white border rounded-lg p-6 flex items-center gap-4">
        <img src={brand.logo} alt={brand.name} className="h-12 object-contain"/>
        <div><h1 className="text-xl font-black">{brand.name}</h1><p className="text-sm text-slate-600">{items.length} products</p></div>
      </div>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map(p=> <ProductCard key={p.id} p={p}/>)}
      </div>
      {items.length===0 && <p className="text-sm text-slate-600 mt-4">No products for this brand yet.</p>}
    </div>
  );
}
