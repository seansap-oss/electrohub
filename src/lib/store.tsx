"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { CartItem, Product, Order, User, Address, Coupon } from './types';
import { products as seedProducts, categories as seedCategories, brands as seedBrands, stores as seedStores, coupons as seedCoupons, defaultHomepageBlocks } from './data';
import type { Category, Brand, Store, HomepageBlock } from './types';

type AppState = {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  stores: Store[];
  coupons: Coupon[];
  homepageBlocks: HomepageBlock[];
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  searchHistory: string[];
};

type Actions = {
  addToCart: (item: CartItem)=>void;
  updateQty: (productId:string, variantId:string|undefined, qty:number)=>void;
  removeFromCart: (productId:string, variantId?:string)=>void;
  toggleWishlist: (productId:string)=>void;
  applyCoupon: (code:string)=> { ok:boolean; msg:string };
  appliedCoupon: Coupon | null;
  setAppliedCoupon: (c:Coupon|null)=>void;
  login: (email:string)=>void;
  logout: ()=>void;
  register: (u:Partial<User> & {email:string})=>void;
  addOrder: (o:Order)=>void;
  updateProduct: (p:Product)=>void;
  addProduct: (p:Product)=>void;
  deleteProduct: (id:string)=>void;
  updateCategory: (c:Category)=>void;
  addCategory: (c:Category)=>void;
  setHomepageBlocks: (b:HomepageBlock[])=>void;
  setProducts: (p:Product[])=>void;
};

const defaultUser: User | null = null;

const STORAGE_KEY = 'electrohub_state_v1';

const AppContext = createContext<(AppState & Actions) | null>(null);

function loadInitial(): AppState {
  if (typeof window==='undefined') return {
    products: seedProducts, categories: seedCategories, brands: seedBrands, stores: seedStores, coupons: seedCoupons, homepageBlocks: defaultHomepageBlocks,
    cart: [], wishlist: [], user: null, orders: [], searchHistory: []
  };
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw){
      const parsed = JSON.parse(raw);
      // merge with seeds if missing keys but preserve user edits
      return {
        products: parsed.products ?? seedProducts,
        categories: parsed.categories ?? seedCategories,
        brands: parsed.brands ?? seedBrands,
        stores: parsed.stores ?? seedStores,
        coupons: parsed.coupons ?? seedCoupons,
        homepageBlocks: parsed.homepageBlocks ?? defaultHomepageBlocks,
        cart: parsed.cart ?? [],
        wishlist: parsed.wishlist ?? [],
        user: parsed.user ?? null,
        orders: parsed.orders ?? [],
        searchHistory: parsed.searchHistory ?? [],
      };
    }
  }catch{}
  return { products: seedProducts, categories: seedCategories, brands: seedBrands, stores: seedStores, coupons: seedCoupons, homepageBlocks: defaultHomepageBlocks, cart:[], wishlist:[], user:defaultUser, orders:[], searchHistory:[] };
}

export function AppProvider({children}:{children:React.ReactNode}){
  const [state,setState]=useState<AppState>(()=> loadInitial());
  const [appliedCoupon,setAppliedCoupon]=useState<Coupon|null>(null);

  useEffect(()=>{ // hydrate from storage after mount if needed
    setState(loadInitial());
  },[]);

  useEffect(()=>{
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch{}
  },[state]);

  const addToCart = (item: CartItem)=>{
    setState(s=>{
      const idx = s.cart.findIndex(c=>c.productId===item.productId && c.variantId===item.variantId);
      if(idx>=0){
        const copy=[...s.cart]; copy[idx]={...copy[idx], qty: copy[idx].qty + item.qty };
        return {...s, cart:copy};
      }
      return {...s, cart:[...s.cart, item]};
    });
  };
  const updateQty=(productId:string, variantId:string|undefined, qty:number)=>{
    setState(s=>{
      if(qty<=0) return {...s, cart: s.cart.filter(c=> !(c.productId===productId && c.variantId===variantId))};
      return {...s, cart: s.cart.map(c=> c.productId===productId && c.variantId===variantId ? {...c, qty} : c)};
    });
  };
  const removeFromCart=(productId:string, variantId?:string)=>{
    setState(s=>({...s, cart: s.cart.filter(c=> !(c.productId===productId && c.variantId===variantId))}));
  };
  const toggleWishlist=(productId:string)=>{
    setState(s=>{
      const has=s.wishlist.includes(productId);
      // also sync user wishlist if logged in
      let newWishlist = has ? s.wishlist.filter(id=>id!==productId) : [...s.wishlist, productId];
      let newUser = s.user ? {...s.user, wishlist: newWishlist } : s.user;
      // persist
      return {...s, wishlist:newWishlist, user: newUser as User | null};
    });
  };
  const applyCoupon=(code:string)=>{
    const found = state.coupons.find(c=>c.code.toLowerCase()===code.toLowerCase() && c.active);
    if(!found) return { ok:false, msg:'Invalid coupon' };
    if(found.expiresAt && new Date(found.expiresAt) < new Date()) return { ok:false, msg:'Coupon expired' };
    setAppliedCoupon(found);
    return { ok:true, msg:'Coupon applied' };
  };
  const login=(email:string)=>{
    // mock: if admin@electrohub.com.au -> admin role else customer
    const isAdmin = email.toLowerCase() === 'admin@electrohub.com.au';
    const user: User = {
      id: 'u_'+Date.now(), email, firstName: email.split('@')[0], lastName: 'User', mobile:'0400000000', addresses:[], wishlist: state.wishlist, role: isAdmin ? 'admin':'customer'
    };
    setState(s=>({...s, user}));
  };
  const logout=()=> setState(s=>({...s, user:null}));
  const register=(u:Partial<User> & {email:string})=>{
    const user: User = { id:'u_'+Date.now(), email:u.email, firstName:u.firstName||'New', lastName:u.lastName||'Customer', mobile:u.mobile, addresses:[], wishlist:[], role:'customer' };
    setState(s=>({...s, user}));
  };
  const addOrder=(o:Order)=> setState(s=>({...s, orders:[o, ...s.orders], cart:[]}));
  const updateProduct=(p:Product)=> setState(s=>({...s, products: s.products.map(x=> x.id===p.id? p: x)}));
  const addProduct=(p:Product)=> setState(s=>({...s, products:[p, ...s.products]}));
  const deleteProduct=(id:string)=> setState(s=>({...s, products: s.products.filter(x=>x.id!==id)}));
  const updateCategory=(c:Category)=> setState(s=>({...s, categories: s.categories.map(x=> x.id===c.id? c: x)}));
  const addCategory=(c:Category)=> setState(s=>({...s, categories:[...s.categories, c]}));
  const setHomepageBlocks=(b:HomepageBlock[])=> setState(s=>({...s, homepageBlocks:b}));
  const setProducts=(p:Product[])=> setState(s=>({...s, products:p}));

  return (
    <AppContext.Provider value={{...state, addToCart, updateQty, removeFromCart, toggleWishlist, applyCoupon, appliedCoupon, setAppliedCoupon, login, logout, register, addOrder, updateProduct, addProduct, deleteProduct, updateCategory, addCategory, setHomepageBlocks, setProducts}}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(){
  const ctx=useContext(AppContext);
  if(!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
