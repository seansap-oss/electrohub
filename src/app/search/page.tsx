"use client";
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/store';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';

function SearchInner(){
  const sp=useSearchParams(); const q=(sp.get('q')||'').toLowerCase();
  const { products, categories, brands } = useApp();
  const [tab,setTab]=useState<'products'|'inspiration'|'info'>('products');
  const results = products.filter(p=> !q || p.title.toLowerCase().includes(q) || p.brandName.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  const catResults = categories.filter(c=> c.name.toLowerCase().includes(q));
  const brandResults = brands.filter(b=> b.name.toLowerCase().includes(q));
  return (
    <div className="container-electro py-6">
      <h1 className="text-xl font-black">Search {q && <>for &quot;{q}&quot;</>}</h1>
      <p className="text-sm text-slate-600">{results.length} products found</p>
      <div className="mt-4 flex gap-2 border-b">
        {(['products','inspiration','info'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 text-sm font-semibold border-b-2 ${tab===t?'border-[#0B1D3A]':'border-transparent text-slate-500'}`}>{t.toUpperCase()}</button>
        ))}
      </div>
      {tab==='products' && (
        <>
          {results.length===0 ? (
            <div className="py-12 text-center bg-white border rounded-lg mt-4"><p className="font-bold">No results for &quot;{q}&quot;</p><p className="text-sm text-slate-600">Try a different term or browse categories.</p><div className="mt-4 flex flex-wrap justify-center gap-2">{categories.slice(0,6).map(c=> <Link key={c.id} href={`/category/${c.slug}`} className="border px-3 py-1 rounded-full text-sm">{c.name}</Link>)}</div></div>
          ) : (
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
              {results.map(p=> <ProductCard key={p.id} p={p}/>)}
            </div>
          )}
          {(catResults.length>0 || brandResults.length>0) && (
            <div className="mt-6 grid lg:grid-cols-2 gap-4">
              {catResults.length>0 && <div className="bg-white border rounded p-4"><p className="font-bold text-sm">Categories</p>{catResults.map(c=> <Link key={c.id} href={`/category/${c.slug}`} className="block text-sm text-[#0066CC] py-1">{c.name}</Link>)}</div>}
              {brandResults.length>0 && <div className="bg-white border rounded p-4"><p className="font-bold text-sm">Brands</p>{brandResults.map(b=> <Link key={b.id} href={`/brand/${b.slug}`} className="block text-sm text-[#0066CC] py-1">{b.name}</Link>)}</div>}
            </div>
          )}
        </>
      )}
      {tab==='inspiration' && <div className="mt-4 bg-white border rounded p-6 text-sm text-slate-600">No inspiration results for &quot;{q}&quot;. Visit <Link href="/hub" className="text-[#0066CC]">Hub</Link>.</div>}
      {tab==='info' && <div className="mt-4 bg-white border rounded p-6 text-sm text-slate-600">Help articles for &quot;{q}&quot; will appear here.</div>}
    </div>
  );
}
export default function SearchPage(){
  return <Suspense fallback={<div className="container-electro py-12">Loading search…</div>}><SearchInner/></Suspense>;
}
