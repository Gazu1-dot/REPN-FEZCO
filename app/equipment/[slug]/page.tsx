import { notFound } from "next/navigation";
import { equipment } from "@/lib/repn-data";
import { ProductPage } from "@/components/repn/pages";
export const dynamicParams=false;
export function generateStaticParams(){return equipment.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=equipment.find(p=>p.slug===slug);return {title:product?.name||"Equipment",description:product?.description};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!equipment.some(p=>p.slug===slug))notFound();return <ProductPage slug={slug}/>;}
