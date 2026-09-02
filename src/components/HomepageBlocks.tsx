"use client";
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ProductCard } from './ProductCard';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function HomepageBlocks(){
  const { homepageBlocks, products, categories, brands } = useApp();
  return (
    <div className="space-y-8">
      {homepageBlocks.map(block=>{
        if(block.type==='hero') return <Hero key={block.id} block={block as any}/>;
        if(block.type==='category_tiles') return <CategoryTiles key={block.id} block={block as any} categories={categories}/>;
        if(block.type==='product_carousel') return <ProductCarousel key={block.id} block={block as any} products={products}/>;
        if(block.type==='promo_grid') return <PromoGrid key={block.id} block={block as any}/>;
        if(block.type==='brand_carousel') return <BrandCarousel key={block.id} block={block as any} brands={brands}/>;
        if(block.type==='editorial') return <Editorial key={block.id} block={block as any}/>;
        if(block.type==='newsletter') return <Newsletter key={block.id} block={block as any}/>;
        return null;
      })}
    </div>
  );
}

function Hero({block}:{block:any}){
  const [idx,setIdx]=useState(0);
  useEffect(()=>{ const t=setInterval(()=> setIdx(i=> (i+1)%block.slides.length), 4500); return ()=>clearInterval(t); },[block.slides.length]);
  const s=block.slides[idx];
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative h-[360px] lg:h-[480px] bg-slate-900">
        <img src={s.image} alt={s.headline} className="hidden lg:block w-full h-full object-cover opacity-90"/>
        <img src={s.mobileImage} alt={s.headline} className="lg:hidden w-full h-full object-cover opacity-90"/>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"/>
        <div className="absolute inset-0 flex items-center">
          <div className="container-electro">
            <div className="max-w-[520px] text-white">
              <h2 className="text-[28px] lg:text-[42px] font-black leading-tight">{s.headline}</h2>
              <p className="mt-2 text-base lg:text-lg text-white/90">{s.subtitle}</p>
              <Link href={s.url} className="inline-block mt-5 bg-white text-[#0B1D3A] font-bold px-6 py-3 rounded-full hover:bg-slate-100">{s.cta}</Link>
            </div>
          </div>
        </div>
        <button onClick={()=>setIdx((idx-1+block.slides.length)%block.slides.length)} className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 bg-white/80 rounded-full grid place-items-center"><ChevronLeft/></button>
        <button onClick={()=>setIdx((idx+1)%block.slides.length)} className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 bg-white/80 rounded-full grid place-items-center"><ChevronRight/></button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {block.slides.map((_:any,i:number)=> <span key={i} className={`h-1.5 rounded-full transition-all ${i===idx?'w-8 bg-white':'w-2 bg-white/50'}`}/>)}
        </div>
      </div>
    </div>
  );
}

function CategoryTiles({block, categories}:{block:any, categories:any[]}){
  const cats = block.categoryIds.map((id:string)=> categories.find((c:any)=>c.id===id)).filter(Boolean);
  return (
    <section>
      <h3 className="text-[20px] font-black mb-4">{block.title}</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {cats.map((c:any)=> (
          <Link key={c.id} href={`/category/${c.slug}`} className="group relative overflow-hidden rounded-lg h-[160px] lg:h-[190px]">
            <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>
            <span className="absolute bottom-3 left-3 text-white font-bold text-sm lg:text-base bg-black/30 backdrop-blur px-2 py-1 rounded">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProductCarousel({block, products}:{block:any, products:any[]}){
  const items = block.productIds.map((id:string)=> products.find((p:any)=>p.id===id)).filter(Boolean);
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[20px] font-black">{block.title}</h3>
        <Link href="/on-sale" className="text-sm font-semibold text-[#0066CC]">View all →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((p:any)=> <ProductCard key={p.id} p={p}/>)}
      </div>
    </section>
  );
}

function PromoGrid({block}:{block:any}){
  return (
    <section>
      <h3 className="text-[20px] font-black mb-4">{block.title}</h3>
      <div className={`grid gap-3 ${block.columns===2?'grid-cols-1 lg:grid-cols-2': block.columns===3?'grid-cols-1 lg:grid-cols-3':'grid-cols-2 lg:grid-cols-4'}`}>
        {block.images.map((im:any,i:number)=>(
          <Link key={i} href={im.url} className="relative overflow-hidden rounded-lg h-[220px] group">
            <img src={im.src} alt={im.label} className="w-full h-full object-cover group-hover:scale-105 transition"/>
            <div className="absolute inset-0 bg-black/20"/>
            <span className="absolute bottom-3 left-3 bg-white text-[#0B1D3A] font-bold text-sm px-3 py-1.5 rounded-full">{im.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BrandCarousel({block, brands}:{block:any, brands:any[]}){
  const items = block.brandIds.map((id:string)=> brands.find((b:any)=>b.id===id)).filter(Boolean);
  return (
    <section>
      <h3 className="text-[20px] font-black mb-4">{block.title}</h3>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((b:any)=> (
          <Link key={b.id} href={`/brand/${b.slug}`} className="border rounded-lg bg-white p-4 h-[84px] grid place-items-center hover:shadow">
            <img src={b.logo} alt={b.name} className="max-h-[40px] object-contain"/>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Editorial({block}:{block:any}){
  return (
    <section>
      <h3 className="text-[20px] font-black mb-4">{block.title}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {block.articles.map((a:any)=>(
          <Link key={a.id} href={a.url} className="border rounded-lg overflow-hidden bg-white hover:shadow">
            <img src={a.image} alt={a.title} className="w-full h-[190px] object-cover"/>
            <div className="p-4">
              <h4 className="font-bold leading-tight">{a.title}</h4>
              <p className="text-sm text-slate-600 mt-1">{a.excerpt}</p>
              <span className="inline-block mt-3 text-sm font-semibold text-[#0066CC]">Read more →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Newsletter({block}:{block:any}){
  const [email,setEmail]=useState(''); const [msg,setMsg]=useState('');
  return (
    <section className="bg-[#0B1D3A] rounded-lg p-6 lg:p-8 text-white flex flex-col lg:flex-row items-center gap-6">
      <div className="flex-1">
        <h3 className="text-xl font-black">{block.heading}</h3>
        <p className="text-white/80 mt-1 text-sm">{block.description}</p>
      </div>
      <form onSubmit={e=>{e.preventDefault(); if(email.includes('@')) setMsg('Thanks for subscribing!'); else setMsg('Enter a valid email');}} className="flex gap-2 w-full lg:w-auto">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter email address" className="flex-1 lg:w-[320px] h-11 rounded-full px-5 text-slate-900 bg-white"/>
        <button className="h-11 px-6 bg-[#00B4D8] text-white font-bold rounded-full">Join</button>
      </form>
      {msg && <span className="text-sm bg-white text-[#0B1D3A] px-3 py-1 rounded-full">{msg}</span>}
    </section>
  );
}
