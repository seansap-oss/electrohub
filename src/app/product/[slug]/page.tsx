"use client";
import { useParams } from 'next/navigation';
import { useApp } from '@/lib/store';
import { formatAUD } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Heart, Truck, Store, Shield, ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export default function ProductPage(){
  const { slug } = useParams() as {slug:string};
  const { products, addToCart, toggleWishlist, wishlist } = useApp();
  const p = products.find(x=> x.slug===slug);
  const [activeImg,setActiveImg]=useState(0);
  const [qty,setQty]=useState(1);
  const [selectedVariant,setSelectedVariant]=useState<string | null>(p?.variants?.[0]?.id ?? null);
  const [added,setAdded]=useState(false);
  const [openSection,setOpenSection]=useState<string>('overview');

  if(!p) return <div className="container-electro py-12">Product not found. <Link href="/" className="text-[#0066CC] underline">Home</Link></div>;

  const variant = p.variants?.find(v=>v.id===selectedVariant);
  const price = variant?.salePrice ?? variant?.price ?? p.salePrice ?? p.price;
  const original = variant?.price ?? p.price;
  const stock = variant?.stock ?? p.stock;
  const discount = original>price ? Math.round((1-price/original)*100) : 0;
  const wished = wishlist.includes(p.id);

  const handleAdd=()=>{
    if(stock===0) return;
    addToCart({productId:p.id, variantId:variant?.id, qty, price, title:p.title + (variant?` - ${variant.color||variant.size||''}`:''), image: variant?.image || p.images[activeImg], sku: variant?.sku || p.id});
    setAdded(true); setTimeout(()=>setAdded(false),1500);
  };

  const related = products.filter(x=> x.id!==p.id && x.categoryIds.some(id=> p.categoryIds.includes(id))).slice(0,4);

  return (
    <div className="container-electro py-4">
      <nav className="text-sm text-slate-600 flex gap-1 flex-wrap">
        <Link href="/" className="hover:underline">Home</Link> / <Link href={`/category/${p.categorySlugs[0]}`} className="hover:underline">{p.categorySlugs[0]}</Link> / <span className="text-slate-900 font-medium">{p.title}</span>
      </nav>

      <div className="mt-4 grid lg:grid-cols-2 gap-8 bg-white border rounded-lg p-4 lg:p-6">
        {/* gallery */}
        <div>
          <div className="aspect-square bg-[#f8fafc] rounded-lg overflow-hidden relative">
            <img src={variant?.image || p.images[activeImg]} alt={p.title} className="w-full h-full object-cover"/>
            {discount>0 && <span className="absolute top-3 left-3 bg-[#CC0000] text-white text-xs font-bold px-2 py-1 rounded">-{discount}%</span>}
          </div>
          <div className="mt-3 flex gap-2 overflow-auto scrollbar-hide">
            {p.images.map((im,i)=>(
              <button key={i} onClick={()=>setActiveImg(i)} className={`h-20 w-20 rounded border overflow-hidden shrink-0 ${activeImg===i?'border-[#0066CC]':'border-slate-200'}`}>
                <img src={im} alt="" className="w-full h-full object-cover"/>
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div>
          <div className="text-xs font-bold tracking-wide text-slate-500 uppercase">{p.brandName} • SKU: {variant?.sku || p.id}</div>
          <h1 className="text-xl lg:text-2xl font-black leading-tight mt-1">{p.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="flex items-center gap-1 text-sm"><Star size={14} fill="#F59E0B" stroke="#F59E0B"/>{p.rating.toFixed(1)}</span>
            <span className="text-sm text-slate-600">({p.reviewCount} reviews)</span>
            <span className="text-xs border px-1.5 py-0.5 rounded">{stock>0 ? (stock<10?'Low Stock':'In Stock') : 'Out of Stock'}</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-black text-[#CC0000]">{formatAUD(price)}</span>
            {original>price && <span className="line-through text-slate-400">{formatAUD(original)}</span>}
            {p.memberPrice && <span className="text-sm font-bold text-[#7B2CBF] bg-[#7B2CBF]/10 px-2 py-0.5 rounded">Member {formatAUD(p.memberPrice)}</span>}
          </div>
          <p className="text-sm text-slate-600 mt-3">{p.description}</p>

          {p.variants && p.variants.length>0 && (
            <div className="mt-4">
              <p className="font-semibold text-sm">Options</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.variants.map(v=>(
                  <button key={v.id} onClick={()=>setSelectedVariant(v.id)} className={`border rounded-full px-4 py-2 text-sm ${selectedVariant===v.id?'bg-[#0B1D3A] text-white border-[#0B1D3A]':'bg-white'}`}>
                    {v.color || v.size || v.capacity} {v.stock===0?' (Out)':''}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center border rounded-full">
              <button onClick={()=>setQty(Math.max(1,qty-1))} className="h-10 w-10 grid place-items-center">–</button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button onClick={()=>setQty(Math.min(stock, qty+1))} className="h-10 w-10 grid place-items-center">+</button>
            </div>
            <span className="text-xs text-slate-600">{stock} available</span>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={handleAdd} disabled={stock===0} className={`flex-1 h-12 rounded-full font-bold ${stock===0?'bg-slate-300':'bg-[#0B1D3A] text-white hover:bg-[#132E5A]'} ${added?'!bg-green-600':''}`}>
              {stock===0? 'Out of Stock' : added? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button onClick={()=>toggleWishlist(p.id)} className={`h-12 w-12 rounded-full border grid place-items-center ${wished?'bg-[#D4002A] text-white border-[#D4002A]':'bg-white'}`}>
              <Heart size={18} fill={wished?'currentColor':'none'}/>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
            <div className="flex gap-2 items-center border rounded p-2"><Truck size={16}/> Free Delivery over $99 • Standard $9.95</div>
            <div className="flex gap-2 items-center border rounded p-2"><Store size={16}/> Click & Collect – Ready in 2 hours</div>
            <div className="flex gap-2 items-center border rounded p-2"><Shield size={16}/> 2 Year Warranty • 30 Day Returns</div>
          </div>

          <div className="mt-6 divide-y border rounded">
            {[
              {id:'overview', title:'Product Overview', content: p.description + ' ' + p.features.join(', ')},
              {id:'specs', title:'Specifications', content: Object.entries(p.specs).map(([k,v])=>`${k}: ${v}`).join(' • ')},
              {id:'delivery', title:'Delivery & Returns', content:'Standard delivery 2-5 business days. Express available. 30 day change of mind returns. See Returns page for details.'},
              {id:'warranty', title:'Warranty', content:'Manufacturer warranty included. Refer to specifications for period.'},
            ].map(sec=>(
              <div key={sec.id}>
                <button onClick={()=>setOpenSection(openSection===sec.id?'':sec.id)} className="w-full flex items-center justify-between p-3 font-semibold text-sm">
                  {sec.title} <ChevronDown className={`${openSection===sec.id?'rotate-180':''} transition`} size={16}/>
                </button>
                {openSection===sec.id && <div className="px-3 pb-3 text-sm text-slate-600">{sec.content}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length>0 && (
        <section className="mt-8">
          <h3 className="font-black text-lg mb-3">You May Also Like</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {related.map(r=> <ProductCard key={r.id} p={r}/>)}
          </div>
        </section>
      )}
    </div>
  );
}
