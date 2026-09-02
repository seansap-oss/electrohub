"use client";
import Link from 'next/link';
import { formatAUD } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { Heart, Star } from 'lucide-react';
import { useApp } from '@/lib/store';

export function ProductCard({p}:{p:Product}){
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const wished = wishlist.includes(p.id);
  const discount = p.salePrice ? Math.round((1 - p.salePrice/p.price)*100) : 0;
  return (
    <div className="group bg-white border rounded-lg overflow-hidden flex flex-col hover:shadow-md transition">
      <Link href={`/product/${p.slug}`} className="relative aspect-square bg-[#f8fafc] overflow-hidden block">
        <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-300"/>
        <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
          {p.badges.slice(0,2).map(b=>(
            <span key={b} className={`text-[11px] font-bold px-1.5 py-0.5 rounded text-white ${b==='SALE'?'bg-[#CC0000]': b==='CLEARANCE'?'bg-[#E67E22]': b==='MEMBER PRICE'?'bg-[#7B2CBF]': b==='NEW'?'bg-[#0B1D3A]': b==='BEST SELLER'?'bg-[#0E7A3B]':'bg-slate-800'}`}>{b}</span>
          ))}
          {discount>0 && <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-[#CC0000] text-white">-{discount}%</span>}
        </div>
        <button onClick={(e)=>{e.preventDefault(); toggleWishlist(p.id);}} aria-label="wishlist" className={`absolute top-2 right-2 h-8 w-8 rounded-full grid place-items-center shadow ${wished?'bg-[#D4002A] text-white':'bg-white text-slate-700'}`}>
          <Heart size={16} fill={wished ? 'currentColor' : 'none'}/>
        </button>
        {p.stock<10 && p.stock>0 && <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">LOW STOCK</span>}
        {p.stock===0 && <span className="absolute bottom-2 left-2 bg-slate-800 text-white text-[11px] font-bold px-2 py-0.5 rounded">OUT OF STOCK</span>}
      </Link>
      <div className="p-3 flex flex-col flex-1">
        <div className="text-[11px] tracking-wide font-bold text-slate-500 uppercase">{p.brandName}</div>
        <Link href={`/product/${p.slug}`} className="text-[14px] leading-[1.3] font-medium line-clamp-2 min-h-[36px] hover:text-[#0066CC]">{p.title}</Link>
        <div className="flex items-center gap-1 mt-1">
          <Star size={14} fill="#F59E0B" stroke="#F59E0B"/><span className="text-xs font-semibold">{p.rating.toFixed(1)}</span><span className="text-xs text-slate-500">({p.reviewCount})</span>
        </div>
        <div className="mt-2">
          {p.salePrice ? (
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-[18px] font-black text-[#CC0000]">{formatAUD(p.salePrice)}</span>
              <span className="text-sm line-through text-slate-400">{formatAUD(p.price)}</span>
            </div>
          ) : (
            <span className="text-[18px] font-black">{formatAUD(p.price)}</span>
          )}
          {p.memberPrice && <div className="text-xs font-bold text-[#7B2CBF]">Member {formatAUD(p.memberPrice)}</div>}
        </div>
        <div className="mt-3 flex gap-2">
          <button
            disabled={p.stock===0}
            onClick={()=> addToCart({productId:p.id, qty:1, price: p.salePrice ?? p.price, title:p.title, image:p.images[0], sku:p.id})}
            className="flex-1 h-9 bg-[#0B1D3A] text-white rounded font-semibold text-sm disabled:bg-slate-300 hover:bg-[#132E5A] transition"
          >{p.stock===0 ? 'Out of Stock' : 'Add to Cart'}</button>
        </div>
      </div>
    </div>
  );
}
