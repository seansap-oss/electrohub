import Link from 'next/link';

const articles=[
  {slug:'how-to-choose-air-fryer', title:'How to Choose the Perfect Air Fryer', image:'https://picsum.photos/seed/edit1/600/400', excerpt:'Capacity, functions and value compared.'},
  {slug:'spring-bedding', title:'Spring Bedding Refresh', image:'https://picsum.photos/seed/edit2/600/400', excerpt:'Find your ideal quilt for the season.'},
  {slug:'kitchen-upgrades', title:'5 Kitchen Upgrades Under $200', image:'https://picsum.photos/seed/edit3/600/400', excerpt:'Small changes, big impact.'},
];

export default function HubPage(){
  return (
    <div className="container-electro py-6">
      <h1 className="text-xl font-black">ElectroHub Hub</h1>
      <p className="text-sm text-slate-600">Inspiration, buying guides and ideas.</p>
      <div className="mt-4 grid lg:grid-cols-3 gap-4">
        {articles.map(a=>(
          <Link key={a.slug} href={`/hub/${a.slug}`} className="bg-white border rounded-lg overflow-hidden hover:shadow">
            <img src={a.image} alt={a.title} className="w-full h-[200px] object-cover"/>
            <div className="p-4"><h3 className="font-bold">{a.title}</h3><p className="text-sm text-slate-600 mt-1">{a.excerpt}</p></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
