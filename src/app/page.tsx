import { HomepageBlocks } from "@/components/HomepageBlocks";

export default function Home(){
  return (
    <div className="container-electro py-6">
      <HomepageBlocks />
      <section className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
        <div className="border bg-white rounded-lg p-4 flex gap-3 items-center"><span className="h-10 w-10 bg-[#0B1D3A] text-white grid place-items-center rounded-full">✓</span><div><p className="font-bold">Price Promise</p><p className="text-slate-600">Found cheaper? We’ll beat it.</p></div></div>
        <div className="border bg-white rounded-lg p-4 flex gap-3 items-center"><span className="h-10 w-10 bg-[#0066CC] text-white grid place-items-center rounded-full">↻</span><div><p className="font-bold">Easy Returns</p><p className="text-slate-600">30 days change of mind.</p></div></div>
        <div className="border bg-white rounded-lg p-4 flex gap-3 items-center"><span className="h-10 w-10 bg-[#0E7A3B] text-white grid place-items-center rounded-full">$</span><div><p className="font-bold">Member Prices</p><p className="text-slate-600">Join free & save.</p></div></div>
        <div className="border bg-white rounded-lg p-4 flex gap-3 items-center"><span className="h-10 w-10 bg-[#E67E22] text-white grid place-items-center rounded-full">⚡</span><div><p className="font-bold">Click & Collect</p><p className="text-slate-600">Ready in 2 hours.</p></div></div>
      </section>
    </div>
  );
}
