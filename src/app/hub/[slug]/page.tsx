import Link from 'next/link';

export default async function HubArticle({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  return (
    <div className="container-electro py-6 max-w-[800px]">
      <Link href="/hub" className="text-sm text-[#0066CC]">← Back to Hub</Link>
      <img src={`https://picsum.photos/seed/${slug}/1200/600`} alt={slug} className="w-full h-[340px] object-cover rounded-lg mt-4"/>
      <h1 className="text-2xl font-black mt-4 capitalize">{slug.replace(/-/g,' ')}</h1>
      <p className="text-sm text-slate-600 mt-2">Buying guide • 5 min read</p>
      <div className="prose prose-sm mt-4 text-slate-700">
        <p>This is a sample editorial article for ElectroHub. In production, content is managed via Admin → Content → Hub and supports rich text, related products, SEO and scheduling.</p>
        <p>Replace this placeholder with real buying guides, recipes or fashion editorial tailored to ElectroHub’s range.</p>
      </div>
      <Link href="/" className="inline-block mt-6 bg-[#0B1D3A] text-white px-6 py-2 rounded-full">Shop the Range</Link>
    </div>
  );
}
