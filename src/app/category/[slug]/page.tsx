"use client";
import { Suspense, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/store';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { formatAUD } from '@/lib/utils';

function CategoryInner(){
  const params=useParams(); const slug=params.slug as string;
  const searchParams=useSearchParams();
  const { categories, products, brands } = useApp();
  const cat = categories.find(c=>c.slug===slug);
  const [sort,setSort]=useState(searchParams.get('sort')||'recommended');
  const [priceRange,setPriceRange]=useState<[number,number]>([0,3000]);
  const [brandFilter,setBrandFilter]=useState<string | null>(searchParams.get('brand'));
  const [inStockOnly,setInStockOnly]=useState(false);
  const [onSaleOnly,setOnSaleOnly]=useState(false);
  const [grid,setGrid]=useState<'grid'|'list'>('grid');

  if(!cat) return <div className="container-electro py-12"><p className="text-lg font-bold">Category not found</p><Link href="/" className="text-[#0066CC]">Go home</Link></div>;

  const childIds = categories.filter(c=> c.parentId===cat.id).map(c=>c.id);
  const relevantProductIds = new Set([cat.id, ...childIds]);
  let filtered = products.filter(p=> p.categoryIds.some(id=> relevantProductIds.has(id)) || p.categorySlugs.includes(slug));
  if(slug==='on-sale') filtered = products.filter(p=> p.salePrice);
  if(slug==='clearance') filtered = products.filter(p=> p.badges.includes('CLEARANCE'));
  filtered = filtered.filter(p=>{
    const price = p.salePrice ?? p.price;
    if(price < priceRange[0] || price > priceRange[1]) return false;
    if(brandFilter && p.brandId!==brandFilter) return false;
    if(inStockOnly && p.stock===0) return false;
    if(onSaleOnly && !p.salePrice) return false;
    return p.status==='published';
  });
  const sorted = useMemo(()=>{
    const arr=[...filtered];
    if(sort==='price_asc') arr.sort((a,b)=> (a.salePrice??a.price)-(b.salePrice??b.price));
    if(sort==='price_desc') arr.sort((a,b)=> (b.salePrice??b.price)-(a.salePrice??a.price));
    if(sort==='rating') arr.sort((a,b)=> b.rating-a.rating);
    if(sort==='latest') arr.sort((a,b)=> new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());
    return arr;
  },[filtered, sort]);
  const breadcrumbs = cat.parentId ? (()=>{ const parent=categories.find(c=>c.id===cat.parentId); return parent ? [parent,cat]:[cat] })() : [cat];
  return (
    <div className="container-electro py-4">
      <nav className="text-sm text-slate-600 flex gap-1 items-center flex-wrap">
        <Link href="/" className="hover:underline">Home</Link> <span>/</span>
        {breadcrumbs.map((b,i)=> <span key={b.id} className={i===breadcrumbs.length-1? 'text-slate-900 font-semibold':''}>{i>0 && ' / '}<Link href={`/category/${b.slug}`}>{b.name}</Link></span>)}
      </nav>
      <div className="mt-3 rounded-lg overflow-hidden h-[180px] lg:h-[260px] relative bg-slate-200">
        <img src={cat.banner || cat.image} alt={cat.name} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="p-6 lg:p-8 text-white max-w-[560px]">
            <h1 className="text-2xl lg:text-3xl font-black">{cat.name}</h1>
            <p className="text-sm lg:text-base text-white/90 mt-1">{cat.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-[260px] shrink-0 space-y-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-bold text-sm">Filters</h3>
            <div className="mt-4 space-y-4">
              <div>
                <p className="font-semibold text-sm">Brand</p>
                <div className="mt-2 space-y-1">
                  <button onClick={()=>setBrandFilter(null)} className={`block text-sm ${!brandFilter?'font-bold text-[#0066CC]':''}`}>All brands</button>
                  {brands.map(b=> <button key={b.id} onClick={()=>setBrandFilter(b.id)} className={`block text-sm ${brandFilter===b.id?'font-bold text-[#0066CC]':''}`}>{b.name}</button>)}
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm">Price: {formatAUD(priceRange[0])} - {formatAUD(priceRange[1])}</p>
                <input type="range" min={0} max={3000} step={50} value={priceRange[1]} onChange={e=>setPriceRange([0, Number(e.target.value)])} className="w-full"/>
              </div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={inStockOnly} onChange={e=>setInStockOnly(e.target.checked)}/> In stock only</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={onSaleOnly} onChange={e=>setOnSaleOnly(e.target.checked)}/> On sale only</label>
              <button onClick={()=>{setBrandFilter(null); setPriceRange([0,3000]); setInStockOnly(false); setOnSaleOnly(false);}} className="text-sm text-[#0066CC] font-semibold">Clear filters</button>
            </div>
          </div>
          <div className="bg-white border rounded-lg p-4 hidden lg:block">
            <p className="font-bold text-sm">Sub-categories</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.filter(c=>c.parentId===cat.id).map(sc=> <Link key={sc.id} href={`/category/${sc.slug}`} className="text-xs border px-2 py-1 rounded-full hover:bg-slate-900 hover:text-white">{sc.name}</Link>)}
            </div>
          </div>
        </aside>
        <div className="flex-1">
          <div className="flex items-center justify-between bg-white border rounded-lg px-3 py-2">
            <p className="text-sm"><span className="font-bold">{sorted.length}</span> products</p>
            <div className="flex items-center gap-2">
              <select value={sort} onChange={e=>setSort(e.target.value)} className="border rounded px-2 py-1 text-sm">
                <option value="recommended">Recommended</option>
                <option value="price_asc">Price low → high</option>
                <option value="price_desc">Price high → low</option>
                <option value="rating">Top Rated</option>
                <option value="latest">Latest</option>
              </select>
              <div className="hidden lg:flex border rounded overflow-hidden">
                <button onClick={()=>setGrid('grid')} className={`px-2 py-1 text-sm ${grid==='grid'?'bg-slate-900 text-white':''}`}>Grid</button>
                <button onClick={()=>setGrid('list')} className={`px-2 py-1 text-sm ${grid==='list'?'bg-slate-900 text-white':''}`}>List</button>
              </div>
            </div>
          </div>
          <div className={`mt-4 grid gap-3 ${grid==='grid'?'grid-cols-2 lg:grid-cols-3':'grid-cols-1'}`}>
            {sorted.map(p=> <ProductCard key={p.id} p={p}/>)}
          </div>
          {sorted.length===0 && <div className="py-16 text-center bg-white border rounded-lg mt-4"><p className="font-bold">No products found</p><p className="text-sm text-slate-600">Try adjusting filters.</p></div>}
          <div className="mt-8 bg-white border rounded-lg p-6">
            <h2 className="font-bold">About {cat.name}</h2>
            <p className="text-sm text-slate-600 mt-2">Discover the best {cat.name.toLowerCase()} at ElectroHub. Curated range from leading brands with member prices, Click & Collect and fast delivery.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function CategoryPage(){
  return <Suspense fallback={<div className="container-electro py-12">Loading…</div>}><CategoryInner/></Suspense>;
}
