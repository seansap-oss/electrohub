"use client";
import { useApp } from '@/lib/store';
import { formatAUD } from '@/lib/utils';
import Link from 'next/link';

export default function OrdersPage(){
  const { orders, user } = useApp();
  if(!user) return <div className="container-electro py-12">Please <Link href="/login" className="text-[#0066CC]">login</Link></div>;
  if(orders.length===0) return <div className="container-electro py-12 text-center"><h1 className="font-black text-xl">No orders yet</h1><Link href="/" className="text-[#0066CC]">Start shopping</Link></div>;
  return (
    <div className="container-electro py-6">
      <h1 className="text-xl font-black">My Orders</h1>
      <div className="mt-4 space-y-3">
        {orders.map(o=>(
          <div key={o.id} className="bg-white border rounded-lg p-4">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-bold">{o.number} • {o.status}</p>
                <p className="text-sm text-slate-600">{new Date(o.createdAt).toLocaleString()} • {o.items.length} items • {formatAUD(o.total)}</p>
              </div>
              <span className={`h-fit text-xs font-bold px-2 py-1 rounded ${o.paymentStatus==='paid'?'bg-green-100 text-green-700':'bg-amber-100 text-amber-700'}`}>{o.paymentStatus}</span>
            </div>
            <div className="mt-3 divide-y border rounded">
              {o.items.map(it=> <div key={it.productId+it.variantId} className="flex gap-3 p-2 text-sm"><img src={it.image} alt="" className="h-12 w-12 object-cover rounded border"/><span className="flex-1">{it.title} × {it.qty}</span><span className="font-semibold">{formatAUD(it.price*it.qty)}</span></div>)}
            </div>
            <p className="text-xs text-slate-500 mt-2">Tracking: {o.tracking} • Ship to: {o.shippingAddress.suburb} {o.shippingAddress.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
