export type Category = {
  id: string;
  slug: string;
  name: string;
  parentId: string | null;
  description: string;
  image: string;
  banner?: string;
  featured?: boolean;
  sort: number;
  navVisible: boolean;
};

export type Brand = {
  id: string;
  slug: string;
  name: string;
  logo: string;
  featured?: boolean;
};

export type ProductVariant = {
  id: string;
  sku: string;
  color?: string;
  size?: string;
  capacity?: string;
  price: number;
  salePrice?: number | null;
  memberPrice?: number | null;
  stock: number;
  image?: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  brandId: string;
  brandName: string;
  categoryIds: string[];
  categorySlugs: string[];
  description: string;
  features: string[];
  specs: Record<string,string>;
  price: number;
  salePrice?: number | null;
  memberPrice?: number | null;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  variants?: ProductVariant[];
  badges: string[]; // SALE, CLEARANCE etc
  status: 'published'|'draft'|'archived';
  createdAt: string;
  isNew?: boolean;
  isExclusive?: boolean;
  isOnlineOnly?: boolean;
};

export type CartItem = {
  productId: string;
  variantId?: string;
  qty: number;
  price: number; // snapshot
  title: string;
  image: string;
  sku: string;
};

export type Order = {
  id: string;
  number: string;
  email: string;
  createdAt: string;
  status: 'Pending'|'Paid'|'Processing'|'Shipped'|'Delivered'|'Cancelled'|'Refunded';
  paymentStatus: 'pending'|'paid'|'refunded';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  gst: number;
  total: number;
  coupon?: string;
  shippingAddress: Address;
  billingAddress: Address;
  tracking?: string;
};

export type Address = {
  id: string;
  name: string;
  line1: string;
  suburb: string;
  state: string;
  postcode: string;
  phone: string;
  isDefault?: boolean;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile?: string;
  addresses: Address[];
  wishlist: string[]; // productIds
  role: 'customer'|'admin';
};

export type Coupon = {
  code: string;
  type: 'percent'|'fixed'|'free_shipping';
  value: number;
  minSpend?: number;
  active: boolean;
  expiresAt?: string;
};

export type Store = {
  id: string;
  name: string;
  suburb: string;
  state: string;
  address: string;
  postcode: string;
  phone: string;
  hours: string;
  clickCollect: boolean;
  lat: number; lng: number;
};

export type HomepageBlock =
  | { id:string; type:'announcement'; text:string; url:string; bg:string; color:string; active:boolean }
  | { id:string; type:'hero'; slides: { id:string; headline:string; subtitle:string; cta:string; url:string; image:string; mobileImage:string }[] }
  | { id:string; type:'category_tiles'; title:string; categoryIds:string[] }
  | { id:string; type:'product_carousel'; title:string; collection:'bestsellers'|'new'|'sale'|'clearance'|string; productIds:string[] }
  | { id:string; type:'promo_grid'; title:string; columns:2|3|4; images:{src:string; url:string; label:string}[] }
  | { id:string; type:'brand_carousel'; title:string; brandIds:string[] }
  | { id:string; type:'editorial'; title:string; articles:{id:string; title:string; image:string; excerpt:string; url:string}[] }
  | { id:string; type:'newsletter'; heading:string; description:string };
