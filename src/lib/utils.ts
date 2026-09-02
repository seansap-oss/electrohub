export function formatAUD(n:number){ return new Intl.NumberFormat('en-AU',{style:'currency', currency:'AUD'}).format(n); }
export function slugify(s:string){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
export function cn(...a:(string|false|undefined|null)[]){ return a.filter(Boolean).join(' '); }
export function gstCalc(total:number){ return Math.round(total * 0.090909 *100)/100; } // GST 10% inclusive approx
