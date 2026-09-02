"use client";
import { useApp } from '@/lib/store';
import { formatAUD } from '@/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage(){
  const { cart, user, addOrder, appliedCoupon } = useApp();
  const router=useRouter();
  const [step,setStep]=useState(1);
  const [email,setEmail]=useState(user?.email||'');
  const [address,setAddress]=useState({name:'', line1:'', suburb:'', state:'NSW', postcode:'', phone:''});
  const [delivery,setDelivery]=useState<'delivery'|'clickcollect'>('delivery');
  const [card,setCard]=useState({number:'4242 4242 4242 4242', name:'Test User', expiry:'12/29', cvc:'123'});
  const [placing,setPlacing]=useState(false);

  const subtotal = cart.reduce((s,c)=> s + c.price*c.qty,0);
  const shipping = appliedCoupon?.type==='free_shipping' ? 0 : delivery==='clickcollect' ? 0 : subtotal>99?0:9.95;
  const discount = appliedCoupon?.type==='percent' ? Math.round(subtotal*appliedCoupon.value/100*100)/100 : appliedCoupon?.type==='fixed'? appliedCoupon.value :0;
  const total = subtotal - discount + shipping;

  if(cart.length===0) return <div className="container-electro py-12 text-center">Cart empty. <a href="/" className="text-[#0066CC]">Shop</a></div>;

  const placeOrder=()=>{
    setPlacing(true);
    const order = {
      id: 'ord_'+Date.now(),
      number: 'EH'+Math.floor(100000+Math.random()*900000),
      email,
      createdAt: new Date().toISOString(),
      status:'Paid' as const,
      paymentStatus:'paid' as const,
      items: cart,
      subtotal, discount, shipping,
      gst: Math.round(total*0.090909*100)/100,
      total,
      coupon: appliedCoupon?.code,
      shippingAddress: {id:'a1', name:address.name||'Customer', line1:address.line1, suburb:address.suburb, state:address.state, postcode:address.postcode, phone:address.phone},
      billingAddress: {id:'a1', name:address.name||'Customer', line1:address.line1, suburb:address.suburb, state:address.state, postcode:address.postcode, phone:address.phone},
      tracking: 'EH'+Math.floor(100000000+Math.random()*900000000),
    };
    setTimeout(()=>{
      addOrder(order);
      router.push(`/account/orders`);
    },800);
  };

  return (
    <div className="container-electro py-6 grid lg:grid-cols-[1fr_380px] gap-6">
      <div className="bg-white border rounded-lg p-6">
        <h1 className="text-xl font-black">Checkout</h1>
        <p className="text-sm text-slate-600">Complete your purchase securely.</p>

        <div className="mt-6 space-y-6">
          <section className={`border rounded-lg p-4 ${step===1?'border-[#0066CC]':''}`}>
            <div className="flex justify-between items-center"><h2 className="font-bold">1. Contact</h2>{step>1 && <button onClick={()=>setStep(1)} className="text-sm text-[#0066CC]">Edit</button>}</div>
            {step===1 ? (
              <div className="mt-3 space-y-3">
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" className="w-full border rounded px-3 py-2"/>
                <label className="flex gap-2 text-sm"><input type="checkbox"/> Create account after order (optional)</label>
                <button onClick={()=>setStep(2)} disabled={!email.includes('@')} className="bg-[#0B1D3A] text-white px-6 py-2 rounded-full font-bold disabled:bg-slate-300">Continue</button>
              </div>
            ) : <p className="text-sm mt-1">{email}</p>}
          </section>

          <section className={`border rounded-lg p-4 ${step===2?'border-[#0066CC]':''}`}>
            <div className="flex justify-between items-center"><h2 className="font-bold">2. Delivery</h2>{step>2 && <button onClick={()=>setStep(2)} className="text-sm text-[#0066CC]">Edit</button>}</div>
            {step===2 ? (
              <div className="mt-3 space-y-3">
                <div className="flex gap-2">
                  <button onClick={()=>setDelivery('delivery')} className={`flex-1 border rounded p-3 text-sm font-semibold ${delivery==='delivery'?'bg-[#0B1D3A] text-white':''}`}>Home Delivery</button>
                  <button onClick={()=>setDelivery('clickcollect')} className={`flex-1 border rounded p-3 text-sm font-semibold ${delivery==='clickcollect'?'bg-[#0B1D3A] text-white':''}`}>Click & Collect</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <input placeholder="Full name" value={address.name} onChange={e=>setAddress({...address,name:e.target.value})} className="border rounded px-3 py-2"/>
                  <input placeholder="Phone" value={address.phone} onChange={e=>setAddress({...address,phone:e.target.value})} className="border rounded px-3 py-2"/>
                  <input placeholder="Address line 1" value={address.line1} onChange={e=>setAddress({...address,line1:e.target.value})} className="lg:col-span-2 border rounded px-3 py-2"/>
                  <input placeholder="Suburb" value={address.suburb} onChange={e=>setAddress({...address,suburb:e.target.value})} className="border rounded px-3 py-2"/>
                  <input placeholder="Postcode" value={address.postcode} onChange={e=>setAddress({...address,postcode:e.target.value})} className="border rounded px-3 py-2"/>
                  <select value={address.state} onChange={e=>setAddress({...address,state:e.target.value})} className="border rounded px-3 py-2"><option>NSW</option><option>VIC</option><option>QLD</option><option>WA</option><option>SA</option><option>TAS</option><option>ACT</option><option>NT</option></select>
                </div>
                <button onClick={()=>setStep(3)} className="bg-[#0B1D3A] text-white px-6 py-2 rounded-full font-bold">Continue</button>
              </div>
            ) : <p className="text-sm mt-1">{address.line1} {address.suburb} {address.state} {address.postcode} • {delivery}</p>}
          </section>

          <section className={`border rounded-lg p-4 ${step===3?'border-[#0066CC]':''}`}>
            <h2 className="font-bold">3. Payment</h2>
            {step===3 ? (
              <div className="mt-3 space-y-3">
                <input placeholder="Card number" value={card.number} onChange={e=>setCard({...card,number:e.target.value})} className="w-full border rounded px-3 py-2"/>
                <div className="grid grid-cols-3 gap-3">
                  <input placeholder="Name on card" value={card.name} onChange={e=>setCard({...card,name:e.target.value})} className="col-span-3 lg:col-span-1 border rounded px-3 py-2"/>
                  <input placeholder="MM/YY" value={card.expiry} onChange={e=>setCard({...card,expiry:e.target.value})} className="border rounded px-3 py-2"/>
                  <input placeholder="CVC" value={card.cvc} onChange={e=>setCard({...card,cvc:e.target.value})} className="border rounded px-3 py-2"/>
                </div>
                <p className="text-xs text-slate-500">Test card: 4242 4242 4242 4242 • Any future expiry • Any CVC</p>
                <button onClick={()=>setStep(4)} className="bg-[#0B1D3A] text-white px-6 py-2 rounded-full font-bold">Continue to Review</button>
              </div>
            ) : <p className="text-sm mt-1">Card ending 4242</p>}
          </section>

          {step===4 && (
            <section className="border rounded-lg p-4">
              <h2 className="font-bold">4. Review & Place Order</h2>
              <label className="flex gap-2 text-sm mt-3"><input type="checkbox" defaultChecked/> I agree to Terms & Privacy Policy</label>
              <button onClick={placeOrder} disabled={placing} className="mt-4 w-full bg-[#0B1D3A] text-white py-3 rounded-full font-bold disabled:bg-slate-400">
                {placing? 'Processing…':'Pay '+formatAUD(total)}
              </button>
            </section>
          )}
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4 h-fit sticky top-[88px]">
        <h3 className="font-bold">Order Summary</h3>
        <div className="mt-3 space-y-3">
          {cart.map(c=> <div key={c.productId+c.variantId} className="flex gap-3 text-sm"><img src={c.image} alt="" className="h-12 w-12 object-cover rounded border"/><div className="flex-1"><p className="leading-tight">{c.title}</p><p className="text-slate-500">Qty {c.qty}</p></div><span className="font-semibold">{formatAUD(c.price*c.qty)}</span></div>)}
        </div>
        <div className="mt-4 border-t pt-3 space-y-1 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatAUD(subtotal)}</span></div>
          {discount>0 && <div className="flex justify-between text-green-700"><span>Discount</span><span>-{formatAUD(discount)}</span></div>}
          <div className="flex justify-between"><span>Shipping</span><span>{shipping===0?'FREE':formatAUD(shipping)}</span></div>
          <div className="flex justify-between font-black text-base border-t pt-2"><span>Total</span><span>{formatAUD(total)}</span></div>
        </div>
      </div>
    </div>
  );
}
