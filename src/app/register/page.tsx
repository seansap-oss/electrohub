"use client";
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function RegisterPage(){
  const { register } = useApp();
  const router=useRouter();
  const [form,setForm]=useState({firstName:'', lastName:'', email:'', mobile:'', password:'', confirm:''});
  return (
    <div className="container-electro py-12 max-w-[560px]">
      <div className="bg-white border rounded-lg p-6">
        <h1 className="text-xl font-black">Create Account</h1>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <input placeholder="First name" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} className="border rounded px-3 py-2"/>
          <input placeholder="Last name" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} className="border rounded px-3 py-2"/>
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="col-span-2 border rounded px-3 py-2"/>
          <input placeholder="Mobile" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})} className="col-span-2 border rounded px-3 py-2"/>
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="border rounded px-3 py-2"/>
          <input placeholder="Confirm password" type="password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} className="border rounded px-3 py-2"/>
        </div>
        <label className="flex gap-2 text-sm mt-3"><input type="checkbox"/> I agree to marketing communications</label>
        <button onClick={()=>{
          if(!form.email.includes('@') || form.password.length<6) return alert('Enter valid email and 6+ char password');
          if(form.password!==form.confirm) return alert('Passwords do not match');
          register({email:form.email, firstName:form.firstName, lastName:form.lastName, mobile:form.mobile});
          router.push('/account');
        }} className="mt-4 w-full bg-[#0B1D3A] text-white py-3 rounded-full font-bold">Create Account</button>
      </div>
    </div>
  );
}
