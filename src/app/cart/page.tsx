"use client";
import { useApp } from '@/lib/store';
import { formatAUD } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage(){
  const { cart, updateQty, removeFromCart, applyCoupon, appliedCoupon, setAppliedCoupon } = useApp();
  const [code,setCode]=useState(''); const [msg,setMsg]=useState('');
  const subtotal = cart.reduce((s,c)=> s + c.price*c.qty, 0);
  const shipping = appliedCoupon?.type==='free_shipping' ? 0 : subtotal>99 || subtotal===0 ? 0 : 9.95;
  const discount = appliedCoupon?.type==='percent' ? Math.round(subtotal*appliedCoupon.value/100*100)/100 : appliedCoupon?.type==='fixed' ? appliedCoupon.value : 0;
  const gst = Math.round((subtotal - discount + shipping)*0.090909*100)/100;
  const total = subtotal - discount + shipping;

  if(cart.length===0) return (
    <div className="container-electro py-12 text-center">
      <h1 className="text-2xl font-black">Your Cart is Empty</h1>
      <p className="text-slate-600 mt-2">Add products to get started.</p>
      <Link href="/" className="inline-block mt-6 bg-[#0B1D3A] text-white px-6 py-3 rounded-full font-bold">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="container-electro py-6 grid lg:grid-cols-[1fr_380px] gap-6">
      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="font-black text-lg">Shopping Cart ({cart.length})</h1>
          <Link href="/" className="text-sm text-[#0066CC] font-semibold">Continue shopping</Link>
        </div>
        <div className="divide-y">
          {cart.map(item=>(
            <div key={item.productId+ (item.variantId||'')} className="p-4 flex gap-4">
              <img src={item.image} alt={item.title} className="h-24 w-24 object-cover rounded border"/>
              <div className="flex-1">
                <p className="font-medium text-sm leading-tight">{item.title}</p>
                <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                <p className="font-bold mt-1">{formatAUD(item.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center border rounded-full">
                    <button onClick={()=>updateQty(item.productId,item.variantId, item.qty-1)} className="h-8 w-8 grid place-items-center">–</button>
                    <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                    <button onClick={()=>updateQty(item.productId,item.variantId, item.qty+1)} className="h-8 w-8 grid place-items-center">+</button>
                  </div>
                  <button onClick={()=>removeFromCart(item.productId,item.variantId)} className="text-xs text-[#CC0000] font-semibold">Remove</button>
                </div>
              </div>
              <div className="font-bold">{formatAUD(item.price*item.qty)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white border rounded-lg p-4">
          <p className="font-bold text-sm">Order Summary</p>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold">{formatAUD(subtotal)}</span></div>
            {discount>0 && <div className="flex justify-between text-green-700"><span>Discount ({appliedCoupon?.code})</span><span>-{formatAUD(discount)}</span></div>}
            <div className="flex justify-between"><span>Shipping</span><span>{shipping===0? 'FREE' : formatAUD(shipping)}</span></div>
            <div className="flex justify-between text-slate-500"><span>Includes GST</span><span>{formatAUD(gst)}</span></div>
            <div className="flex justify-between font-black text-base border-t pt-2"><span>Total</span><span>{formatAUD(total)}</span></div>
          </div>

          <div className="mt-4 flex gap-2">
            <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Discount code" className="flex-1 border rounded-full px-3 py-2 text-sm"/>
            <button onClick={()=>{
              const res=applyCoupon(code);
              setMsg(res.msg);
              if(!res.ok) setTimeout(()=>setMsg(''),2000);
              if(res.ok) setCode('');
            }} className="bg-[#0B1D3A] text-white px-4 py-2 rounded-full text-sm font-bold">Apply</button>
          </div>
          {appliedCoupon && <div className="mt-2 text-sm bg-green-50 border border-green-200 rounded px-3 py-2 flex justify-between"><span>Applied: {appliedCoupon.code}</span><button onClick={()=>setAppliedCoupon(null)} className="text-[#CC0000]">Remove</button></div>}
          {msg && <p className="text-sm mt-2">{msg}</p>}
          <p className="text-xs text-slate-500 mt-2">Try codes: WELCOME10, SAVE20, FREESHIP</p>

          <Link href="/checkout" className="mt-4 block text-center bg-[#0B1D3A] text-white py-3 rounded-full font-bold hover:bg-[#132E5A]">Proceed to Checkout</Link>
          <p className="text-xs text-center text-slate-500 mt-2">Secure checkout • 30 day returns</p>
        </div>
        <div className="bg-white border rounded-lg p-4 text-sm">
          <p className="font-bold">Need help?</p>
          <p className="text-slate-600 mt-1">Call 1300 387 233 Mon–Sun 9am–6pm</p>
        </div>
      </div>
    </div>
  );
}
