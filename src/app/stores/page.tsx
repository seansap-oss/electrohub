"use client";
import { useApp } from '@/lib/store';
import { useState } from 'react';

export default function StoresPage(){
  const { stores } = useApp();
  const [q,setQ]=useState('');
  const filtered = stores.filter(s=> !q || s.suburb.toLowerCase().includes(q.toLowerCase()) || s.postcode.includes(q));
  return (
    <div className="container-electro py-6">
      <h1 className="text-xl font-black">Store Locator</h1>
      <div className="mt-4 flex gap-2 max-w-[480px]">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Enter postcode or suburb" className="flex-1 border rounded-full px-4 py-2"/>
        <button className="bg-[#0B1D3A] text-white px-6 rounded-full font-bold">Search</button>
      </div>
      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          {filtered.map(s=>(
            <div key={s.id} className="bg-white border rounded-lg p-4">
              <p className="font-bold">{s.name}</p>
              <p className="text-sm text-slate-600">{s.address}</p>
              <p className="text-sm">{s.phone} • {s.hours}</p>
              <p className="text-xs mt-1"><span className={`px-2 py-0.5 rounded text-white text-[11px] font-bold ${s.clickCollect?'bg-green-600':'bg-slate-400'}`}>{s.clickCollect?'Click & Collect':'No Click & Collect'}</span></p>
            </div>
          ))}
          {filtered.length===0 && <p className="text-sm text-slate-600">No stores found.</p>}
        </div>
        <div className="bg-[#e2e8f0] rounded-lg h-[400px] grid place-items-center text-slate-600">Map view (integrate Google Maps in production)</div>
      </div>
    </div>
  );
}
