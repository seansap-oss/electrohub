"use client";
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage(){
  const { login, user } = useApp();
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const router=useRouter();
  if(user) { router.push('/account'); return null; }
  return (
    <div className="container-electro py-12 max-w-[560px]">
      <div className="bg-white border rounded-lg p-6 lg:p-8">
        <h1 className="text-xl font-black">LOGIN OR SIGN UP</h1>
        <p className="text-sm text-slate-600 mt-1">Enter your email to continue. New customers will be guided to create an account.</p>
        <div className="mt-6 space-y-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" className="w-full border rounded px-3 py-3"/>
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border rounded px-3 py-3"/>
          <button onClick={()=>{ if(email.includes('@')){ login(email); router.push('/account'); }}} disabled={!email.includes('@')} className="w-full bg-[#0B1D3A] text-white py-3 rounded-full font-bold disabled:bg-slate-300">Continue</button>
          <p className="text-xs text-center text-slate-600">Admin login: admin@electrohub.com.au (any password) → access /admin</p>
          <div className="text-center text-sm"><Link href="/register" className="text-[#0066CC] font-semibold">Create account</Link> • <Link href="#" className="text-[#0066CC]">Forgot password?</Link></div>
        </div>
        <div className="mt-6 border-t pt-4 text-xs text-slate-500">
          By continuing you agree to our Terms and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
