"use client";
import { useApp } from '@/lib/store';
import Link from 'next/link';

export default function BrandsPage(){
  const { brands } = useApp();
  const letters = Array.from(new Set(brands.map(b=> b.name[0].toUpperCase()))).sort();
  return (
    <div className="container-electro py-6">
      <h1 className="text-xl font-black">Brand Directory</h1>
      <div className="mt-4 space-y-6">
        {letters.map(letter=>(
          <div key={letter}>
            <h2 className="font-black text-lg border-b pb-1">{letter}</h2>
            <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
              {brands.filter(b=> b.name[0].toUpperCase()===letter).map(b=>(
                <Link key={b.id} href={`/brand/${b.slug}`} className="bg-white border rounded p-4 flex items-center gap-3 hover:shadow">
                  <img src={b.logo} alt={b.name} className="h-10 object-contain"/>
                  <span className="font-semibold text-sm">{b.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
