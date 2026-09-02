"use client";
import Link from 'next/link';

const columns = [
  { title:'Information', links:[
    {label:'Our Story', href:'/about'},
    {label:'Price Promise', href:'/about'},
    {label:'Hub', href:'/hub'},
    {label:'Careers', href:'/about'},
    {label:'Competitions', href:'/about'},
    {label:'Member Program', href:'/about'},
  ]},
  { title:'Site', links:[
    {label:'Brand Directory', href:'/brands'},
    {label:'Terms & Conditions', href:'/terms'},
    {label:'Privacy Policy', href:'/privacy'},
  ]},
  { title:'Customer Service', links:[
    {label:'Store Locator', href:'/stores'},
    {label:'FAQ', href:'/about'},
    {label:'Delivery', href:'/delivery'},
    {label:'Click & Collect', href:'/delivery'},
    {label:'Payment Information', href:'/about'},
    {label:'Returns', href:'/returns'},
    {label:'Track Order', href:'/track-order'},
    {label:'Consumer Notices', href:'/about'},
  ]},
];

export function Footer(){
  return (
    <footer className="bg-[#0B1D3A] text-white mt-10">
      <div className="container-electro py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {columns.map(col=>(
          <div key={col.title}>
            <h4 className="font-bold text-sm tracking-wide uppercase mb-3">{col.title}</h4>
            <ul className="space-y-2 text-sm text-white/80">
              {col.links.map(l=> <li key={l.label}><Link href={l.href} className="hover:text-white hover:underline">{l.label}</Link></li>)}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="font-bold text-sm tracking-wide uppercase mb-3">Connect</h4>
          <p className="text-sm text-white/80">Call us: 1300 387 233</p>
          <p className="text-sm text-white/80">Email: help@electrohub.com.au</p>
          <div className="flex gap-2 mt-4">
            <span className="h-8 w-8 bg-white/10 rounded grid place-items-center text-xs">f</span>
            <span className="h-8 w-8 bg-white/10 rounded grid place-items-center text-xs">◎</span>
            <span className="h-8 w-8 bg-white/10 rounded grid place-items-center text-xs">▶</span>
          </div>
          <div className="mt-6 flex gap-2">
            <span className="bg-white text-[#0B1D3A] text-[10px] font-bold px-2 py-1 rounded">VISA</span>
            <span className="bg-white text-[#0B1D3A] text-[10px] font-bold px-2 py-1 rounded">MC</span>
            <span className="bg-white text-[#0B1D3A] text-[10px] font-bold px-2 py-1 rounded">AMEX</span>
            <span className="bg-white text-[#0B1D3A] text-[10px] font-bold px-2 py-1 rounded">PayPal</span>
            <span className="bg-white text-[#0B1D3A] text-[10px] font-bold px-2 py-1 rounded">Afterpay</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-electro py-4 text-xs text-white/60 flex flex-col lg:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} ElectroHub Australia Pty Ltd. All rights reserved. ABN 12 345 678 901</span>
          <span>AUD • GST inclusive • Prices subject to change</span>
        </div>
      </div>
    </footer>
  );
}
