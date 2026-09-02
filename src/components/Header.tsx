"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { Search, User, Heart, ShoppingCart, MapPin, Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Header(){
  const { categories, cart, wishlist, homepageBlocks } = useApp();
  const router = useRouter();
  const [q,setQ]=useState('');
  const [mobileOpen,setMobileOpen]=useState(false);
  const [activeDept,setActiveDept]=useState<string | null>(null);
  const announcement = homepageBlocks.find(b=> b.type==='announcement' && (b as any).active) as any;
  const topLevel = categories.filter(c=> c.parentId===null && c.navVisible).sort((a,b)=>a.sort-b.sort);
  const cartCount = cart.reduce((s,c)=>s+c.qty,0);

  const onSearch=(e:React.FormEvent)=>{
    e.preventDefault();
    if(q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  // close mega on outside click handled via mouseLeave
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {announcement && (
        <div style={{background:announcement.bg, color:announcement.color}} className="text-center text-[13px] py-2 px-4">
          <Link href={announcement.url} className="underline-offset-4 hover:underline font-medium">{announcement.text}</Link>
        </div>
      )}
      {/* utility bar */}
      <div className="hidden lg:block border-b bg-[#f8fafc]">
        <div className="container-electro flex items-center justify-between text-[13px] py-2">
          <div className="flex items-center gap-4 text-slate-600">
            <button className="flex items-center gap-1.5 hover:text-slate-900"><MapPin size={14}/> Set your location</button>
            <span className="opacity-30">|</span>
            <Link href="/track-order" className="hover:text-slate-900">Track Order</Link>
            <Link href="/contact" className="hover:text-slate-900">Contact Us</Link>
          </div>
          <div className="text-slate-600 hidden xl:block">Free Click & Collect • Free Delivery over $99</div>
          <div className="flex items-center gap-3">
            <Link href="/stores" className="hover:text-slate-900">Store Locator</Link>
          </div>
        </div>
      </div>

      {/* main header */}
      <div className="container-electro flex items-center gap-4 py-3 lg:py-4">
        <button className="lg:hidden p-2 -ml-2" onClick={()=>setMobileOpen(v=>!v)} aria-label="menu">{mobileOpen? <X/> : <Menu/>}</button>
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="h-9 w-9 bg-[#0B1D3A] text-white grid place-items-center font-black text-[11px] leading-none rounded">EH</div>
          <span className="font-black text-[22px] tracking-tight text-[#0B1D3A] hidden sm:block">ElectroHub</span>
          <span className="text-[10px] tracking-[0.18em] text-slate-500 hidden sm:block -ml-1 mt-2">AUSTRALIA</span>
        </Link>

        <form onSubmit={onSearch} className="flex-1 max-w-[720px] mx-2 lg:mx-8 relative">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products..." className="w-full h-[44px] rounded-full border border-slate-300 pl-5 pr-12 text-[15px] focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20"/>
          <button type="submit" className="absolute right-1 top-1 h-[36px] w-[36px] bg-[#0B1D3A] text-white rounded-full grid place-items-center"><Search size={18}/></button>
        </form>

        <div className="flex items-center gap-1 lg:gap-3 shrink-0">
          <Link href="/account" className="hidden lg:flex flex-col items-center text-[11px] leading-none gap-1 w-[58px]"><User size={22} strokeWidth={1.7}/><span>Account</span></Link>
          <Link href="/account/wishlist" className="hidden lg:flex flex-col items-center text-[11px] leading-none gap-1 w-[58px] relative"><Heart size={22} strokeWidth={1.7}/><span>Wishlist</span>{wishlist.length>0 && <span className="absolute -top-1 right-2 bg-[#D4002A] text-white text-[10px] min-w-[18px] h-[18px] grid place-items-center rounded-full px-1">{wishlist.length}</span>}</Link>
          <Link href="/cart" className="flex flex-col items-center text-[11px] leading-none gap-1 w-[58px] relative">
            <div className="relative"><ShoppingCart size={22} strokeWidth={1.7}/>{cartCount>0 && <span className="absolute -top-2 -right-2 bg-[#D4002A] text-white text-[10px] min-w-[18px] h-[18px] grid place-items-center rounded-full px-1">{cartCount}</span>}</div>
            <span className="hidden lg:block">Cart</span>
          </Link>
          <Link href="/account" className="lg:hidden p-2"><User size={22}/></Link>
        </div>
      </div>

      {/* desktop nav */}
      <nav className="hidden lg:block border-t bg-white">
        <div className="container-electro flex items-center gap-1">
          {topLevel.map(dept=>{
            const kids = categories.filter(c=>c.parentId===dept.id);
            const isActive = activeDept===dept.id;
            return (
              <div key={dept.id} className="relative" onMouseEnter={()=>setActiveDept(dept.id)} onMouseLeave={()=>setActiveDept(null)}>
                <Link href={dept.slug==='hub' ? '/hub' : dept.slug==='clearance' || dept.slug==='on-sale' ? `/${dept.slug}` : `/category/${dept.slug}`} className={`flex items-center gap-1 px-3 py-3 text-[14px] font-semibold whitespace-nowrap ${isActive? 'text-[#0066CC]': 'text-slate-800'} hover:text-[#0066CC]`}>
                  {dept.name} {kids.length>0 && <ChevronDown size={14} className={`${isActive?'rotate-180':''} transition`}/>}
                  {dept.slug==='clearance' && <span className="ml-1 bg-[#E67E22] text-white text-[10px] px-1.5 py-0.5 rounded">HOT</span>}
                  {dept.slug==='on-sale' && <span className="ml-1 bg-[#CC0000] text-white text-[10px] px-1.5 py-0.5 rounded">SALE</span>}
                </Link>
                {isActive && kids.length>0 && (
                  <div className="absolute left-0 top-full bg-white shadow-xl border rounded-b-lg p-6 min-w-[720px] grid grid-cols-3 gap-6 z-50">
                    {kids.map(child=>{
                      const subKids = categories.filter(sc=>sc.parentId===child.id);
                      return (
                        <div key={child.id}>
                          <Link href={`/category/${child.slug}`} className="font-bold text-[13px] text-[#0B1D3A] hover:underline">{child.name}</Link>
                          <div className="mt-2 space-y-1">
                            {subKids.map(sk=> <Link key={sk.id} href={`/category/${sk.slug}`} className="block text-sm text-slate-600 hover:text-[#0066CC]">{sk.name}</Link>)}
                            {subKids.length===0 && <Link href={`/category/${child.slug}`} className="block text-sm text-slate-600 hover:text-[#0066CC]">View all {child.name}</Link>}
                          </div>
                        </div>
                      );
                    })}
                    <div className="col-span-3 border-t pt-4 flex gap-4">
                      <img src={`https://picsum.photos/seed/nav-${dept.slug}/400/220`} alt="" className="w-[200px] h-[110px] object-cover rounded"/>
                      <div><p className="font-bold">{dept.name} Picks</p><p className="text-sm text-slate-600">Discover our curated range.</p><Link href={`/category/${dept.slug}`} className="inline-block mt-2 text-sm font-semibold text-[#0066CC]">Shop {dept.name} →</Link></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div className="ml-auto flex items-center gap-2 text-[13px] font-semibold">
            <Link href="/on-sale" className="text-[#CC0000]">▲ On Sale</Link>
            <Link href="/clearance" className="text-[#E67E22]">Clearance</Link>
          </div>
        </div>
      </nav>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-[86%] max-w-[360px] bg-white h-full overflow-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-black text-lg text-[#0B1D3A]">Menu</span>
              <button onClick={()=>setMobileOpen(false)} className="p-2"><X/></button>
            </div>
            <div className="space-y-1">
              {topLevel.map(dept=>{
                const kids=categories.filter(c=>c.parentId===dept.id);
                return (
                  <details key={dept.id} className="group border-b py-2">
                    <summary className="flex items-center justify-between font-semibold list-none cursor-pointer">{dept.name} <ChevronDown size={16} className="group-open:rotate-180 transition"/></summary>
                    <div className="pl-3 mt-2 space-y-2">
                      <Link onClick={()=>setMobileOpen(false)} href={dept.slug==='hub'?'/hub':`/category/${dept.slug}`} className="block text-sm font-medium text-[#0066CC]">View all {dept.name}</Link>
                      {kids.map(k=> <Link onClick={()=>setMobileOpen(false)} key={k.id} href={`/category/${k.slug}`} className="block text-sm text-slate-700">{k.name}</Link>)}
                    </div>
                  </details>
                );
              })}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <Link href="/account" className="border rounded p-3 text-center">Account</Link>
              <Link href="/cart" className="border rounded p-3 text-center">Cart ({cartCount})</Link>
              <Link href="/track-order" className="border rounded p-3 text-center">Track Order</Link>
              <Link href="/stores" className="border rounded p-3 text-center">Stores</Link>
            </div>
          </div>
          <div className="flex-1 bg-black/40" onClick={()=>setMobileOpen(false)} />
        </div>
      )}
    </header>
  );
}
