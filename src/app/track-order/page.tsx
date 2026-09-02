"use client";
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { formatAUD } from '@/lib/utils';

export default function TrackOrderPage(){
  const { orders } = useApp();
  const [number,setNumber]=useState(''); const [email,setEmail]=useState(''); const [result,setResult]=useState<any>(null); const [msg,setMsg]=useState('');
  const find=()=>{
    const found = orders.find(o=> o.number.toLowerCase()===number.toLowerCase().trim() && o.email.toLowerCase()===email.toLowerCase().trim());
    if(found) { setResult(found); setMsg(''); } else { setResult(null); setMsg('No order found with those details. Please check number and email.'); }
  };
  return (
    <div className="container-electro py-8 max-w-[560px]">
      <h1 className="text-xl font-black">Track Order</h1>
      <div className="bg-white border rounded-lg p-6 mt-4 space-y-3">
        <input placeholder="Order number (e.g. EH123456)" value={number} onChange={e=>setNumber(e.target.value)} className="w-full border rounded px-3 py-2"/>
        <input placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded px-3 py-2"/>
        <button onClick={find} className="w-full bg-[#0B1D3A] text-white py-2 rounded-full font-bold">Track</button>
        {msg && <p className="text-sm text-[#CC0000]">{msg}</p>}
        {result && (
          <div className="border-t pt-4 mt-4">
            <p className="font-bold">{result.number} • {result.status}</p>
            <p className="text-sm text-slate-600">Placed {new Date(result.createdAt).toLocaleString()} • Total {formatAUD(result.total)}</p>
            <p className="text-sm mt-2">Tracking: {result.tracking}</p>
            <div className="mt-3 space-y-2">
              {result.items.map((it:any)=> <div key={it.productId} className="flex justify-between text-sm border rounded p-2"><span>{it.title} × {it.qty}</span><span>{formatAUD(it.price*it.qty)}</span></div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
