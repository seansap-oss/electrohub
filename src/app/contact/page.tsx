"use client";
import { useState } from 'react';
export default function Contact(){
  const [sent,setSent]=useState(false);
  const [form,setForm]=useState({name:'', email:'', phone:'', order:'', message:'', category:'General'});
  return (
    <div className="container-electro py-8 max-w-[640px]">
      <h1 className="text-xl font-black">Contact Us</h1>
      <div className="bg-white border rounded-lg p-6 mt-4 space-y-3">
        <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full border rounded px-3 py-2"><option>General</option><option>Order Enquiry</option><option>Product Question</option><option>Returns</option></select>
        <div className="grid grid-cols-2 gap-3"><input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border rounded px-3 py-2"/><input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="border rounded px-3 py-2"/></div>
        <div className="grid grid-cols-2 gap-3"><input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="border rounded px-3 py-2"/><input placeholder="Order number (optional)" value={form.order} onChange={e=>setForm({...form,order:e.target.value})} className="border rounded px-3 py-2"/></div>
        <textarea placeholder="Message" rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="w-full border rounded px-3 py-2"/>
        <button onClick={()=>{ if(form.email.includes('@') && form.message) setSent(true); }} className="bg-[#0B1D3A] text-white px-6 py-2 rounded-full font-bold">Send Message</button>
        {sent && <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">Thanks! Enquiry received. Reference EH-{Math.floor(Math.random()*90000+10000)}</p>}
      </div>
    </div>
  );
}
