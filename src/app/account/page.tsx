"use client";
import { useApp } from '@/lib/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AccountPage(){
  const { user, orders, logout, wishlist, products } = useApp();
  const router=useRouter();
  if(!user) return <div className="container-electro py-12"><p className="font-bold">Please login</p><Link href="/login" className="text-[#0066CC]">Go to login</Link></div>;
  return (
    <div className="container-electro py-6 grid lg:grid-cols-[240px_1fr] gap-6">
      <aside className="bg-white border rounded-lg p-2 h-fit">
        {[
          {label:'Overview', href:'/account'},
          {label:'Personal Details', href:'#'},
          {label:'Addresses', href:'#'},
          {label:'Orders', href:'/account/orders'},
          {label:'Wishlist', href:'/account/wishlist'},
          {label:'Track Order', href:'/track-order'},
        ].map(i=> <Link key={i.label} href={i.href} className="block px-3 py-2 text-sm rounded hover:bg-slate-50 font-medium">{i.label}</Link>)}
        <button onClick={()=>{logout(); router.push('/');}} className="w-full text-left px-3 py-2 text-sm text-[#CC0000]">Logout</button>
      </aside>
      <div className="space-y-4">
        <div className="bg-white border rounded-lg p-6">
          <h1 className="text-xl font-black">Welcome, {user.firstName}</h1>
          <p className="text-sm text-slate-600">{user.email} • {user.role==='admin' && <Link href="/admin" className="text-[#0066CC] font-bold">Go to Admin →</Link>}</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="bg-white border rounded-lg p-4"><p className="font-bold">Recent Order</p>{orders[0] ? <div className="text-sm mt-2"><p className="font-semibold">{orders[0].number}</p><p>{orders[0].status} • {new Date(orders[0].createdAt).toLocaleDateString()}</p><Link href="/account/orders" className="text-[#0066CC] text-sm">View all</Link></div> : <p className="text-sm text-slate-600 mt-2">No orders yet.</p>}</div>
          <div className="bg-white border rounded-lg p-4"><p className="font-bold">Wishlist</p><p className="text-sm text-slate-600 mt-2">{wishlist.length} items saved</p><Link href="/account/wishlist" className="text-[#0066CC] text-sm">View wishlist</Link></div>
          <div className="bg-white border rounded-lg p-4"><p className="font-bold">Member</p><p className="text-sm text-slate-600 mt-2">Member prices unlocked on eligible items.</p></div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-bold">Personal Details</h3>
          <div className="mt-2 text-sm">
            <p>{user.firstName} {user.lastName}</p><p>{user.email}</p><p>{user.mobile}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
