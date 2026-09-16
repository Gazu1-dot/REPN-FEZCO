"use client";
import { AssetImage } from "./asset-image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { mainNavigation } from "@/lib/site-structure";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href.slice(0, -1) || pathname.startsWith(href);
}

export function MobileNav() {
  const pathname = usePathname();
  const item = (href: string, label: string) => <SheetClose key={href} asChild><Link href={href} aria-current={isActive(pathname, href) ? "page" : undefined}><span>{label}</span><ArrowRight size={18} aria-hidden="true"/></Link></SheetClose>;
  return <div className="mobile-nav"><Sheet>
    <SheetTrigger aria-label="Open menu" className="menu-trigger"><Menu /></SheetTrigger>
    <SheetContent side="right" className="mobile-sheet" aria-describedby={undefined}>
      <SheetTitle><AssetImage className="mobile-brand" src="/assets/repn-fzco-logo.png" alt="REPN-FZCO" width={240} height={60} /></SheetTitle>
      <nav aria-label="Mobile navigation">
        {item("/", "Home")}
        {mainNavigation.map(({ href, label }) => item(href, label))}
        {item("/contact/", "Contact")}
      </nav>
    </SheetContent>
  </Sheet></div>;
}

export function DesktopNav() {
 const pathname=usePathname();
 return <nav className="desktop-nav" aria-label="Main navigation">{mainNavigation.map(({href,label})=><Link key={href} href={href} aria-current={isActive(pathname,href)?"page":undefined}>{label}</Link>)}</nav>;
}

export function HeaderContact() {
 const pathname=usePathname();
 return <Link className="header-cta" href="/contact/" aria-current={isActive(pathname,"/contact/")?"page":undefined}>Contact <span className="header-cta-icon" aria-hidden="true"><ArrowUpRight size={17}/></span></Link>;
}
