import type { Brand, Category, Product, Store, Coupon, HomepageBlock } from './types';

export const brands: Brand[] = [
  { id:'b1', slug:'electrolux', name:'Electrolux', logo:'https://picsum.photos/seed/electrolux/200/80', featured:true },
  { id:'b2', slug:'breville', name:'Breville', logo:'https://picsum.photos/seed/breville/200/80', featured:true },
  { id:'b3', slug:'dyson', name:'Dyson', logo:'https://picsum.photos/seed/dyson/200/80', featured:true },
  { id:'b4', slug:'samsung', name:'Samsung', logo:'https://picsum.photos/seed/samsung/200/80', featured:true },
  { id:'b5', slug:'lg', name:'LG', logo:'https://picsum.photos/seed/lg/200/80', featured:true },
  { id:'b6', slug:'sony', name:'Sony', logo:'https://picsum.photos/seed/sony/200/80', featured:true },
  { id:'b7', slug:'philips', name:'Philips', logo:'https://picsum.photos/seed/philips/200/80' },
  { id:'b8', slug:'bosch', name:'Bosch', logo:'https://picsum.photos/seed/bosch/200/80' },
];

export const categories: Category[] = [
  { id:'c1', slug:'women', name:'Women', parentId:null, description:'Women fashion', image:'https://picsum.photos/seed/women/600/400', sort:1, navVisible:true, featured:true },
  { id:'c2', slug:'men', name:'Men', parentId:null, description:'Men fashion', image:'https://picsum.photos/seed/men/600/400', sort:2, navVisible:true, featured:true },
  { id:'c3', slug:'bed-bath-home', name:'Bed, Bath & Home', parentId:null, description:'Home essentials', image:'https://picsum.photos/seed/home/600/400', sort:3, navVisible:true, featured:true },
  { id:'c4', slug:'kitchen-dining', name:'Kitchen & Dining', parentId:null, description:'Kitchen', image:'https://picsum.photos/seed/kitchen/600/400', sort:4, navVisible:true, featured:true },
  { id:'c5', slug:'electrical', name:'Electrical', parentId:null, description:'Electrical appliances', image:'https://picsum.photos/seed/electrical/600/400', sort:5, navVisible:true, featured:true },
  { id:'c6', slug:'hub', name:'Hub', parentId:null, description:'Inspiration', image:'https://picsum.photos/seed/hub/600/400', sort:6, navVisible:true },
  { id:'c7', slug:'clearance', name:'Clearance', parentId:null, description:'Clearance deals', image:'https://picsum.photos/seed/clearance/600/400', sort:7, navVisible:true },
  { id:'c8', slug:'on-sale', name:'On Sale', parentId:null, description:'Sale', image:'https://picsum.photos/seed/sale/600/400', sort:8, navVisible:true },
  // subcategories
  { id:'c9', slug:'womens-clothing', name:'Clothing', parentId:'c1', description:'Womens Clothing', image:'https://picsum.photos/seed/wcloth/400/300', sort:1, navVisible:true },
  { id:'c10', slug:'dresses', name:'Dresses', parentId:'c9', description:'Dresses', image:'https://picsum.photos/seed/dress/400/300', sort:1, navVisible:true },
  { id:'c11', slug:'bedding', name:'Bedding', parentId:'c3', description:'Bedding', image:'https://picsum.photos/seed/bedding/400/300', sort:1, navVisible:true },
  { id:'c12', slug:'quilts', name:'Quilts', parentId:'c11', description:'Quilts', image:'https://picsum.photos/seed/quilts/400/300', sort:1, navVisible:true },
  { id:'c13', slug:'cookware', name:'Cookware', parentId:'c4', description:'Cookware', image:'https://picsum.photos/seed/cookware/400/300', sort:1, navVisible:true },
  { id:'c14', slug:'frypans', name:'Frypans', parentId:'c13', description:'Frypans', image:'https://picsum.photos/seed/frypan/400/300', sort:1, navVisible:true },
  { id:'c15', slug:'kitchen-appliances', name:'Kitchen Appliances', parentId:'c5', description:'Appliances', image:'https://picsum.photos/seed/appliance/400/300', sort:1, navVisible:true },
  { id:'c16', slug:'air-fryers', name:'Air Fryers', parentId:'c15', description:'Air Fryers', image:'https://picsum.photos/seed/airfryer/400/300', sort:1, navVisible:true },
  { id:'c17', slug:'tv-audio', name:'TV & Audio', parentId:'c5', description:'TV', image:'https://picsum.photos/seed/tv/400/300', sort:2, navVisible:true },
  { id:'c18', slug:'laundry', name:'Laundry', parentId:'c5', description:'Laundry', image:'https://picsum.photos/seed/laundry/400/300', sort:3, navVisible:true },
];

function img(seed:string, w=600,h=600){ return `https://picsum.photos/seed/${seed}/${w}/${h}`; }

export const products: Product[] = [
  { id:'p1', slug:'breville-smart-oven-pro', title:'Breville Smart Oven Pro 30L', brandId:'b2', brandName:'Breville', categoryIds:['c15','c5','c4'], categorySlugs:['kitchen-appliances','electrical','kitchen-dining'], description:'Smart oven with Element IQ and 10 cooking functions. Brushed stainless steel.', features:['Element IQ','10 functions','LCD display','Convection'], specs:{Capacity:'30L', Power:'2400W', Warranty:'2 Years'}, price:499, salePrice:399, memberPrice:379, rating:4.7, reviewCount:342, stock:28, images:[img('breville-oven1',800,800), img('breville-oven2',800,800), img('breville-oven3',800,800)], badges:['SALE','MEMBER PRICE'], status:'published', createdAt:'2026-01-12', variants:[{id:'v1', sku:'BRV-SOV-SS', color:'Stainless', price:499, salePrice:399, stock:18},{id:'v1b', sku:'BRV-SOV-BK', color:'Black', price:499, salePrice:429, stock:10}] },
  { id:'p2', slug:'dyson-v15-detect', title:'Dyson V15 Detect Absolute Vacuum', brandId:'b3', brandName:'Dyson', categoryIds:['c5','c18'], categorySlugs:['electrical','laundry'], description:'Most powerful suction with laser detect and piezo sensor.', features:['Laser detect','180AW suction','60 min runtime'], specs:{Weight:'3.1kg', Bin:'0.76L', Warranty:'2 Years'}, price:1399, salePrice:1199, memberPrice:1149, rating:4.8, reviewCount:521, stock:15, images:[img('dyson-v15-1',800,800), img('dyson-v15-2',800,800)], badges:['SALE','BEST SELLER'], status:'published', createdAt:'2026-02-01' },
  { id:'p3', slug:'samsung-65-qled-4k', title:'Samsung 65" QLED 4K Smart TV', brandId:'b4', brandName:'Samsung', categoryIds:['c17','c5'], categorySlugs:['tv-audio','electrical'], description:'Quantum Dot 4K with Alexa built-in and 120Hz.', features:['QLED','4K','120Hz','Dolby Atmos'], specs:{Size:'65"', Resolution:'3840x2160', Warranty:'2 Years'}, price:1799, salePrice:1499, rating:4.6, reviewCount:210, stock:9, images:[img('samsung-tv1',800,800), img('samsung-tv2',800,800)], badges:['SALE'], status:'published', createdAt:'2026-03-02' },
  { id:'p4', slug:'philips-air-fryer-xxl', title:'Philips Premium Airfryer XXL 7.3L', brandId:'b7', brandName:'Philips', categoryIds:['c16','c15','c5'], categorySlugs:['air-fryers','kitchen-appliances','electrical'], description:'Fat removal technology, family size XXL.', features:['7.3L','Fat removal','Rapid Air'], specs:{Capacity:'7.3L', Power:'2225W', Warranty:'2 Years'}, price:499, salePrice:349, rating:4.5, reviewCount:412, stock:42, images:[img('philips-af1',800,800)], badges:['SALE','LOW STOCK'], status:'published', createdAt:'2026-01-20', isNew:true },
  { id:'p5', slug:'lg-front-load-10kg', title:'LG 10kg Front Load Washer', brandId:'b5', brandName:'LG', categoryIds:['c18','c5'], categorySlugs:['laundry','electrical'], description:'TurboWash 360 with AI Direct Drive.', features:['TurboWash','AI DD','Steam'], specs:{Capacity:'10kg', Energy:'5 stars', Warranty:'2 Years'}, price:1299, salePrice:null, rating:4.4, reviewCount:98, stock:6, images:[img('lg-washer',800,800)], badges:['NEW'], status:'published', createdAt:'2026-04-10', isNew:true },
  { id:'p6', slug:'sony-wh1000xm5', title:'Sony WH-1000XM5 Noise Cancelling Headphones', brandId:'b6', brandName:'Sony', categoryIds:['c17','c5'], categorySlugs:['tv-audio','electrical'], description:'Industry leading noise cancellation with 30hr battery.', features:['ANC','30h battery','Speak-to-chat'], specs:{Weight:'250g', Battery:'30h', Warranty:'1 Year'}, price:599, salePrice:479, memberPrice:459, rating:4.9, reviewCount:892, stock:33, images:[img('sony-xm5-1',800,800), img('sony-xm5-2',800,800)], badges:['SALE','MEMBER PRICE','BEST SELLER'], status:'published', createdAt:'2026-02-15' },
  { id:'p7', slug:'electrolux-comfort-500-quilt', title:'Electrolux Comfort 500 GSM Quilt - Queen', brandId:'b1', brandName:'Electrolux', categoryIds:['c12','c11','c3'], categorySlugs:['quilts','bedding','bed-bath-home'], description:'500GSM Australian wool blend quilt for all seasons.', features:['500GSM','Wool blend','Box stitched'], specs:{Size:'Queen', Fill:'Wool', Warranty:'2 Years'}, price:299, salePrice:199, rating:4.3, reviewCount:76, stock:50, images:[img('quilt-1',800,800)], badges:['SALE','CLEARANCE'], status:'published', createdAt:'2026-01-05' },
  { id:'p8', slug:'bosch-frypan-28cm', title:'Bosch Stainless Steel Frypan 28cm', brandId:'b8', brandName:'Bosch', categoryIds:['c14','c13','c4'], categorySlugs:['frypans','cookware','kitchen-dining'], description:'Tri-ply stainless steel with stay-cool handle.', features:['Tri-ply','Induction ready','Oven safe'], specs:{Size:'28cm', Material:'SS', Warranty:'Lifetime'}, price:149, salePrice:99, rating:4.6, reviewCount:134, stock:120, images:[img('frypan-1',800,800)], badges:['SALE'], status:'published', createdAt:'2026-03-18' },
  { id:'p9', slug:'womens-linen-dress-navy', title:"Women's Linen Midi Dress - Navy", brandId:'b1', brandName:'Electrolux', categoryIds:['c10','c9','c1'], categorySlugs:['dresses','womens-clothing','women'], description:'Breathable linen blend midi dress with pockets.', features:['Linen blend','Pockets','Machine wash'], specs:{Material:'Linen', Fit:'Relaxed', Care:'Machine wash'}, price:129, salePrice:89, rating:4.2, reviewCount:45, stock:25, images:[img('dress-navy-1',800,800), img('dress-navy-2',800,800)], badges:['SALE'], status:'published', createdAt:'2026-04-01', variants:[{id:'v9-8', sku:'DRS-NVY-8', size:'8', color:'Navy', price:129, salePrice:89, stock:5},{id:'v9-10', sku:'DRS-NVY-10', size:'10', color:'Navy', price:129, salePrice:89, stock:8},{id:'v9-12', sku:'DRS-NVY-12', size:'12', color:'Navy', price:129, salePrice:89, stock:8},{id:'v9-14', sku:'DRS-NVY-14', size:'14', color:'Navy', price:129, salePrice:89, stock:4}] },
  { id:'p10', slug:'mens-oxford-shirt-white', title:"Men's Oxford Shirt - White", brandId:'b2', brandName:'Breville', categoryIds:['c1','c2'], categorySlugs:['women','men'], description:'Classic oxford shirt, regular fit.', features:['Cotton','Regular fit','Button cuff'], specs:{Material:'Cotton', Fit:'Regular', Care:'Machine wash'}, price:89, salePrice:59, rating:4.1, reviewCount:22, stock:40, images:[img('shirt-white',800,800)], badges:['SALE'], status:'published', createdAt:'2026-03-10' },
  { id:'p11', slug:'electrical-kettle-1.7l', title:'Breville Soft Top Kettle 1.7L Brushed', brandId:'b2', brandName:'Breville', categoryIds:['c15','c5'], categorySlugs:['kitchen-appliances','electrical'], description:'Soft opening lid, 7 cup capacity.', features:['1.7L','Soft open','Auto shutoff'], specs:{Capacity:'1.7L', Power:'2400W', Warranty:'2 Years'}, price:99, salePrice:79, rating:4.5, reviewCount:201, stock:60, images:[img('kettle',800,800)], badges:['SALE'], status:'published', createdAt:'2026-02-20' },
  { id:'p12', slug:'dining-16pc-dinner-set', title:'16 Piece Porcelain Dinner Set - White', brandId:'b1', brandName:'Electrolux', categoryIds:['c4'], categorySlugs:['kitchen-dining'], description:'16 piece set service for 4.', features:['Porcelain','Dishwasher safe','Microwave safe'], specs:{Pieces:'16', Material:'Porcelain', Warranty:'1 Year'}, price:199, salePrice:149, rating:4.4, reviewCount:54, stock:30, images:[img('dinner-set',800,800)], badges:['SALE'], status:'published', createdAt:'2026-01-28' },
];

export const stores: Store[] = [
  { id:'s1', name:'ElectroHub Melbourne Central', suburb:'Melbourne', state:'VIC', address:'300 Lonsdale St, Melbourne VIC 3000', postcode:'3000', phone:'03 9000 1111', hours:'9am-6pm Mon-Sun', clickCollect:true, lat:-37.8136, lng:144.9631 },
  { id:'s2', name:'ElectroHub Sydney Pitt St', suburb:'Sydney', state:'NSW', address:'100 Pitt St, Sydney NSW 2000', postcode:'2000', phone:'02 9000 2222', hours:'9am-6pm Mon-Sun', clickCollect:true, lat:-33.8688, lng:151.2093 },
  { id:'s3', name:'ElectroHub Brisbane Queen St', suburb:'Brisbane', state:'QLD', address:'200 Queen St, Brisbane QLD 4000', postcode:'4000', phone:'07 9000 3333', hours:'9am-6pm Mon-Sun', clickCollect:true, lat:-27.4698, lng:153.0251 },
  { id:'s4', name:'ElectroHub Perth Hay St', suburb:'Perth', state:'WA', address:'50 Hay St, Perth WA 6000', postcode:'6000', phone:'08 9000 4444', hours:'9am-5:30pm Mon-Sun', clickCollect:false, lat:-31.9505, lng:115.8605 },
];

export const coupons: Coupon[] = [
  { code:'WELCOME10', type:'percent', value:10, minSpend:100, active:true, expiresAt:'2026-12-31' },
  { code:'SAVE20', type:'fixed', value:20, minSpend:150, active:true, expiresAt:'2026-12-31' },
  { code:'FREESHIP', type:'free_shipping', value:0, active:true },
];

export const defaultHomepageBlocks: HomepageBlock[] = [
  { id:'hb1', type:'announcement', text:'FREE DELIVERY on orders over $99 | Click & Collect available', url:'/delivery', bg:'#0B1D3A', color:'#ffffff', active:true },
  { id:'hb2', type:'hero', slides:[
    { id:'slide1', headline:'Spring Sale Up To 50% Off', subtitle:'Bedding, Kitchen & Electrical - Limited time', cta:'Shop Sale', url:'/on-sale', image:'https://picsum.photos/seed/hero1/1600/600', mobileImage:'https://picsum.photos/seed/hero1m/800/900' },
    { id:'slide2', headline:'New Season Electrical', subtitle:'Shop Dyson, Samsung, LG & more', cta:'Shop Electrical', url:'/category/electrical', image:'https://picsum.photos/seed/hero2/1600/600', mobileImage:'https://picsum.photos/seed/hero2m/800/900' },
    { id:'slide3', headline:'Member Prices Live', subtitle:'Join ElectroHub Member for extra savings', cta:'Join Now', url:'/register', image:'https://picsum.photos/seed/hero3/1600/600', mobileImage:'https://picsum.photos/seed/hero3m/800/900' },
  ]},
  { id:'hb3', type:'category_tiles', title:'Shop by Category', categoryIds:['c3','c4','c5','c1','c2','c11','c15','c17'] },
  { id:'hb4', type:'product_carousel', title:'Best Sellers', collection:'bestsellers', productIds:['p2','p6','p1','p4','p3','p8'] },
  { id:'hb5', type:'promo_grid', title:'Trending Offers', columns:3, images:[
    { src:'https://picsum.photos/seed/promo1/800/600', url:'/category/kitchen-appliances', label:'Kitchen Deals' },
    { src:'https://picsum.photos/seed/promo2/800/600', url:'/category/bedding', label:'Bedding Sale' },
    { src:'https://picsum.photos/seed/promo3/800/600', url:'/brand/dyson', label:'Dyson Range' },
  ]},
  { id:'hb6', type:'product_carousel', title:'On Sale', collection:'sale', productIds:['p1','p3','p4','p6','p7','p9'] },
  { id:'hb7', type:'brand_carousel', title:'Featured Brands', brandIds:['b1','b2','b3','b4','b5','b6'] },
  { id:'hb8', type:'editorial', title:'Inspiration & Buying Guides', articles:[
    { id:'a1', title:'How to Choose the Perfect Air Fryer', image:'https://picsum.photos/seed/edit1/600/400', excerpt:'Our experts compare capacity, features and value.', url:'/hub/how-to-choose-air-fryer' },
    { id:'a2', title:'Spring Bedding Refresh', image:'https://picsum.photos/seed/edit2/600/400', excerpt:'Linen, cotton and wool - find your ideal quilt.', url:'/hub/spring-bedding' },
    { id:'a3', title:'5 Kitchen Upgrades Under $200', image:'https://picsum.photos/seed/edit3/600/400', excerpt:'Small changes, big impact in the heart of your home.', url:'/hub/kitchen-upgrades' },
  ]},
  { id:'hb9', type:'newsletter', heading:'Join ElectroHub Member', description:'Get member prices, early access and $10 off your first order over $99.' },
];

export function priceText(p: Product){
  const effective = p.salePrice ?? p.price;
  return { effective, original: p.price, discount: p.salePrice ? Math.round((1 - p.salePrice/p.price)*100) : 0 };
}
