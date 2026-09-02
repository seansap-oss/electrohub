"use client";
import { useApp } from '@/lib/store';
import { useState } from 'react';
import Link from 'next/link';
import { formatAUD, slugify } from '@/lib/utils';
import type { Product, Category, Coupon, HomepageBlock } from '@/lib/types';

export default function AdminPage(){
  const { user, products, categories, orders, brands, coupons, homepageBlocks, addProduct, updateProduct, deleteProduct, addCategory, setHomepageBlocks, stores } = useApp();
  const [tab,setTab]=useState('dashboard');
  const [editingProduct,setEditingProduct]=useState<Product | null>(null);
  const [newProd,setNewProd]=useState<Partial<Product>>({title:'', price:99, stock:10, brandName:'Breville', brandId:'b2', categoryIds:['c5'], categorySlugs:['electrical'], images:['https://picsum.photos/seed/newprod/600/600'], badges:[], status:'published', rating:4.5, reviewCount:0, description:'New product', features:[], specs:{}, createdAt:new Date().toISOString()});

  if(!user || user.role!=='admin'){
    return (
      <div className="min-h-[60vh] grid place-items-center py-12">
        <div className="bg-white border rounded-lg p-8 max-w-[420px] text-center">
          <h1 className="font-black text-lg">Admin Access Required</h1>
          <p className="text-sm text-slate-600 mt-2">Login with <b>admin@electrohub.com.au</b> (any password) to access the admin CMS.</p>
          <Link href="/login" className="inline-block mt-4 bg-[#0B1D3A] text-white px-6 py-2 rounded-full font-bold">Go to Login</Link>
          <p className="text-xs text-slate-500 mt-3">RBAC is enforced client-side for demo; in production protect routes server-side.</p>
        </div>
      </div>
    );
  }

  const revenue = orders.reduce((s,o)=> s+o.total,0);
  const lowStock = products.filter(p=> p.stock>0 && p.stock<10);

  return (
    <div className="container-electro py-6 grid lg:grid-cols-[240px_1fr] gap-6">
      <aside className="bg-white border rounded-lg p-2 h-fit sticky top-[90px]">
        {[
          ['dashboard','Dashboard'],
          ['products','Products'],
          ['categories','Categories'],
          ['orders','Orders'],
          ['customers','Customers'],
          ['promotions','Promotions'],
          ['homepage','Homepage Builder'],
          ['navigation','Navigation'],
          ['media','Media Library'],
          ['stores','Stores'],
          ['settings','Settings'],
        ].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${tab===id?'bg-[#0B1D3A] text-white':'hover:bg-slate-50'}`}>{label}</button>
        ))}
        <div className="mt-4 p-3 bg-slate-50 rounded text-xs">
          <p className="font-bold">Admin</p><p>{user.email}</p>
        </div>
      </aside>

      <div className="space-y-4">
        {tab==='dashboard' && (
          <div className="space-y-4">
            <h1 className="text-xl font-black">Dashboard</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white border rounded-lg p-4"><p className="text-xs text-slate-500">Revenue</p><p className="text-xl font-black">{formatAUD(revenue)}</p><p className="text-xs text-slate-500">{orders.length} orders</p></div>
              <div className="bg-white border rounded-lg p-4"><p className="text-xs text-slate-500">Products</p><p className="text-xl font-black">{products.length}</p><p className="text-xs text-slate-500">{lowStock.length} low stock</p></div>
              <div className="bg-white border rounded-lg p-4"><p className="text-xs text-slate-500">Customers</p><p className="text-xl font-black">—</p><p className="text-xs text-slate-500">Demo mode</p></div>
              <div className="bg-white border rounded-lg p-4"><p className="text-xs text-slate-500">Avg Order</p><p className="text-xl font-black">{orders.length? formatAUD(revenue/orders.length): formatAUD(0)}</p></div>
            </div>
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-bold text-sm">Recent Orders</h3>
              <div className="mt-3 space-y-2">
                {orders.slice(0,5).map(o=> <div key={o.id} className="flex justify-between text-sm border rounded p-2"><span>{o.number} • {o.status}</span><span>{formatAUD(o.total)}</span></div>)}
                {orders.length===0 && <p className="text-sm text-slate-600">No orders yet. Place a test order via Checkout.</p>}
              </div>
            </div>
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-bold text-sm">Low Stock</h3>
              <div className="mt-2 space-y-1 text-sm">{lowStock.map(p=> <div key={p.id} className="flex justify-between border rounded px-2 py-1"><span>{p.title}</span><span className="text-[#CC0000] font-bold">{p.stock} left</span></div>)}</div>
            </div>
          </div>
        )}

        {tab==='products' && (
          <div>
            <div className="flex justify-between items-center"><h1 className="text-xl font-black">Products</h1><button onClick={()=>{
              const id='p'+Date.now();
              const prod:Product = {
                id, slug: slugify(newProd.title||'new-product'), title: newProd.title||'Untitled', brandId: newProd.brandId||'b2', brandName: newProd.brandName||'Breville',
                categoryIds: newProd.categoryIds||['c5'], categorySlugs: newProd.categorySlugs||['electrical'], description: newProd.description||'', features:[], specs:{}, price: Number(newProd.price)||99, salePrice: null, rating:4.5, reviewCount:0, stock: Number(newProd.stock)||10, images: newProd.images||['https://picsum.photos/seed/new/600/600'], badges:[], status:'published', createdAt:new Date().toISOString()
              };
              addProduct(prod);
            }} className="bg-[#0B1D3A] text-white px-4 py-2 rounded-full text-sm font-bold">Add Product</button></div>

            <div className="bg-white border rounded-lg p-4 mt-3">
              <p className="text-xs text-slate-600 mb-3">Create product • Edits update storefront instantly (localStorage live connection). Try changing price/stock and check PLP/PDP.</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                <input placeholder="Title" value={newProd.title} onChange={e=>setNewProd({...newProd,title:e.target.value})} className="border rounded px-2 py-1 text-sm"/>
                <input placeholder="Price" type="number" value={newProd.price} onChange={e=>setNewProd({...newProd,price:Number(e.target.value)})} className="border rounded px-2 py-1 text-sm"/>
                <input placeholder="Stock" type="number" value={newProd.stock} onChange={e=>setNewProd({...newProd,stock:Number(e.target.value)})} className="border rounded px-2 py-1 text-sm"/>
                <input placeholder="Image URL" value={newProd.images?.[0]} onChange={e=>setNewProd({...newProd,images:[e.target.value]})} className="border rounded px-2 py-1 text-sm"/>
              </div>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-xs text-slate-500 border-b"><th className="text-left py-2">Product</th><th>Price</th><th>Stock</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {products.map(p=>(
                      <tr key={p.id} className="border-b">
                        <td className="py-2 flex gap-2 items-center"><img src={p.images[0]} alt="" className="h-10 w-10 object-cover rounded border"/><span className="font-medium line-clamp-1">{p.title}</span></td>
                        <td className="text-center"><input type="number" value={p.salePrice ?? p.price} onChange={e=> updateProduct({...p, salePrice: Number(e.target.value)===p.price? null: Number(e.target.value)})} className="w-20 border rounded px-1 py-0.5"/></td>
                        <td className="text-center"><input type="number" value={p.stock} onChange={e=> updateProduct({...p, stock: Number(e.target.value)})} className="w-16 border rounded px-1 py-0.5"/></td>
                        <td className="text-center"><select value={p.status} onChange={e=> updateProduct({...p, status: e.target.value as any})} className="border rounded px-1 py-0.5 text-xs"><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></td>
                        <td className="text-right"><button onClick={()=>deleteProduct(p.id)} className="text-xs text-[#CC0000]">Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab==='categories' && (
          <div>
            <h1 className="text-xl font-black">Categories</h1>
            <div className="bg-white border rounded-lg p-4 mt-3 space-y-2">
              {categories.map(c=> <div key={c.id} className="flex justify-between items-center border rounded px-3 py-2 text-sm"><span>{c.name} <span className="text-slate-500">({c.slug})</span> {c.parentId && <span className="text-xs bg-slate-100 px-1 rounded">child of {categories.find(p=>p.id===c.parentId)?.name}</span>}</span><span className="text-xs">{c.navVisible?'Visible':'Hidden'}</span></div>)}
              <button onClick={()=>{
                const name=prompt('New category name');
                if(!name) return;
                const slug=slugify(name);
                addCategory({id:'c'+Date.now(), slug, name, parentId:null, description:name, image:'https://picsum.photos/seed/'+slug+'/400/300', sort:99, navVisible:true});
              }} className="bg-[#0B1D3A] text-white px-4 py-2 rounded-full text-sm font-bold">Add Category</button>
            </div>
          </div>
        )}

        {tab==='orders' && (
          <div>
            <h1 className="text-xl font-black">Orders</h1>
            <div className="bg-white border rounded-lg p-4 mt-3 space-y-2">
              {orders.length===0 && <p className="text-sm text-slate-600">No orders. Place a test checkout to generate data.</p>}
              {orders.map(o=> <div key={o.id} className="border rounded p-3 text-sm"><div className="flex justify-between"><span className="font-bold">{o.number}</span><select value={o.status} onChange={e=>{
                // mutate via localStorage hack: we don't have updateOrder, but we can simulate
                const idx=orders.findIndex(x=>x.id===o.id);
                if(idx>=0){ orders[idx].status=e.target.value as any; localStorage.setItem('electrohub_state_v1', JSON.stringify({...(JSON.parse(localStorage.getItem('electrohub_state_v1')||'{}')), orders})); location.reload(); }
              }} className="border rounded px-2 py-0.5 text-xs"><option>Pending</option><option>Paid</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option><option>Refunded</option></select></div><p>{o.email} • {formatAUD(o.total)} • {new Date(o.createdAt).toLocaleString()}</p><p className="text-xs text-slate-500">{o.items.map(i=>i.title).join(', ')}</p></div>)}
            </div>
          </div>
        )}

        {tab==='customers' && (
          <div>
            <h1 className="text-xl font-black">Customers</h1>
            <div className="bg-white border rounded-lg p-4 mt-3 text-sm text-slate-600">Demo mode • Real customers appear here when auth is backed by database. Integrated with /account.</div>
          </div>
        )}

        {tab==='promotions' && (
          <div>
            <h1 className="text-xl font-black">Promotions / Coupons</h1>
            <div className="bg-white border rounded-lg p-4 mt-3 space-y-2">
              {coupons.map(c=> <div key={c.code} className="flex justify-between border rounded px-3 py-2 text-sm"><span className="font-bold">{c.code}</span><span>{c.type} {c.value}{c.type==='percent'?'%':''} {c.minSpend?`• min ${formatAUD(c.minSpend)}`:''}</span></div>)}
              <p className="text-xs text-slate-500">Coupons validated server-side in production; here validated in store.</p>
            </div>
          </div>
        )}

        {tab==='homepage' && (
          <div>
            <h1 className="text-xl font-black">Homepage Builder</h1>
            <div className="bg-white border rounded-lg p-4 mt-3 space-y-3">
              {homepageBlocks.map((b,i)=>(
                <div key={b.id} className="border rounded p-3 flex justify-between items-center">
                  <div><p className="font-bold text-sm">{b.type}</p><p className="text-xs text-slate-500">{b.id}</p></div>
                  <div className="flex gap-1">
                    <button onClick={()=>{
                      const copy=[...homepageBlocks]; const tmp=copy[i]; copy[i]=copy[Math.max(0,i-1)]; copy[Math.max(0,i-1)]=tmp; setHomepageBlocks([...copy]);
                    }} className="border rounded px-2 py-1 text-xs">↑</button>
                    <button onClick={()=>{
                      const copy=[...homepageBlocks]; const tmp=copy[i]; copy[i]=copy[Math.min(copy.length-1,i+1)]; copy[Math.min(copy.length-1,i+1)]=tmp; setHomepageBlocks([...copy]);
                    }} className="border rounded px-2 py-1 text-xs">↓</button>
                  </div>
                </div>
              ))}
              <p className="text-xs text-slate-500">Drag reorder simulated with ↑/↓ • Edits reflect on homepage instantly.</p>
            </div>
          </div>
        )}

        {tab==='navigation' && (
          <div>
            <h1 className="text-xl font-black">Navigation</h1>
            <div className="bg-white border rounded-lg p-4 mt-3 text-sm">Mega-menu is driven by categories. Edit categories → navVisible / parentId to adjust. Header preview is live.</div>
          </div>
        )}

        {tab==='media' && (
          <div>
            <h1 className="text-xl font-black">Media Library</h1>
            <div className="bg-white border rounded-lg p-4 mt-3">
              <p className="text-sm text-slate-600">Uploads stored in object storage in production (Supabase Storage / S3). For demo, paste image URLs in product editor.</p>
              <div className="mt-3 grid grid-cols-3 lg:grid-cols-6 gap-2">
                {products.slice(0,6).map(p=> <img key={p.id} src={p.images[0]} alt="" className="h-20 w-full object-cover rounded border"/>)}
              </div>
            </div>
          </div>
        )}

        {tab==='stores' && (
          <div>
            <h1 className="text-xl font-black">Stores</h1>
            <div className="bg-white border rounded-lg p-4 mt-3 space-y-2">
              {stores.map(s=> <div key={s.id} className="border rounded p-2 text-sm"><p className="font-bold">{s.name}</p><p className="text-slate-600">{s.address}</p></div>)}
            </div>
          </div>
        )}

        {tab==='settings' && (
          <div>
            <h1 className="text-xl font-black">Settings</h1>
            <div className="bg-white border rounded-lg p-4 mt-3 text-sm space-y-2">
              <p><b>Store name:</b> ElectroHub Australia</p>
              <p><b>Currency:</b> AUD • GST inclusive</p>
              <p><b>Shipping:</b> Standard $9.95, FREE over $99</p>
              <p className="text-slate-600">Configure via database in production (store_settings, theme_settings).</p>
              <button onClick={()=>{ localStorage.removeItem('electrohub_state_v1'); location.reload(); }} className="border border-red-300 text-[#CC0000] px-3 py-1 rounded text-sm">Reset demo data</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
