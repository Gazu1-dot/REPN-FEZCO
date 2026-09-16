import { AssetImage } from "./asset-image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MobileNav, DesktopNav, HeaderContact } from "./interactive";
import { ScrollFrame } from "./premium-hero";
import { SystemExplorer } from "./system-explorer";
import { applications, mainNavigation } from "@/lib/site-structure";

export function Brand() {
  return <span className="brand brand-supplied"><AssetImage src="/assets/repn-fzco-logo.png" alt="REPN-FZCO" width={240} height={60}/></span>;
}

export function Header() {
  return <header className="site-header"><div className="header-inner">
    <Link className="header-brand" href="/" aria-label="REPN-FZCO home"><Brand /></Link>
    <DesktopNav/>
    <div className="header-actions"><HeaderContact/><MobileNav /></div>
  </div></header>;
}

export function Footer() {
 return <footer className="site-footer"><div className="container footer-main">
  <div><Link href="/" aria-label="REPN-FZCO home"><Brand/></Link><p>Submersible pumping equipment<br/>and project support.</p></div>
  <nav aria-label="Footer applications"><h3>Applications</h3>{applications.map(({id,label})=><Link key={id} href={`/equipment/?application=${id}`}>{label}</Link>)}</nav>
  <nav aria-label="Footer equipment and support"><h3>Equipment &amp; support</h3>{mainNavigation.filter(item=>item.href!=="/company/").map(({href,label})=><Link key={href} href={href}>{label}</Link>)}</nav>
  <nav aria-label="Footer company"><h3>REPN-FZCO</h3><Link href="/company/">About the company</Link><Link href="/contact/">Contact</Link><Link href="/privacy/">Privacy</Link></nav>
 </div><div className="container footer-bottom"><span>© 2026 REPN-FZCO</span><span>Geothermal · Oil &amp; Gas</span></div></footer>;
}

export function Button({href, children, secondary=false}:{href:string;children:React.ReactNode;secondary?:boolean}) {
  return <Link href={href} className={`button ${secondary?"button-outline":"button-red"}`}>{children}<ArrowUpRight size={18}/></Link>;
}

export function Eyebrow({children}:{children:React.ReactNode}) {
  return <p className="eyebrow"><span/>{children}</p>;
}

export function HomePage() {
 return <ScrollFrame>
  <SystemExplorer/>
  <section className="scroll-intro container" id="applications" aria-labelledby="application-title">
   <div className="scroll-section-meta"><span>01 / APPLICATIONS</span><span>TWO ENVIRONMENTS. ONE POINT OF CONTACT.</span></div>
   <div className="scroll-intro-heading" data-reveal><h2 id="application-title">Different conditions.<br/><span>The right system.</span></h2><p>Start with your application. Explore the equipment, then build the specification around your well.</p></div>
   <div className="scroll-applications">
    <Link href="/equipment/?application=geothermal" className="scroll-application scroll-application-geo" data-reveal><AssetImage src="/assets/manufacturing-hero.webp" alt="Illustrative geothermal production field" loading="lazy"/><div className="scroll-application-content"><span className="scroll-label">HEAT BELOW THE SURFACE</span><h3>Geothermal.</h3><p>Submersible pumping equipment for geothermal fluid production.</p><span className="scroll-application-link">Explore geothermal <ArrowUpRight size={22}/></span></div></Link>
    <Link href="/equipment/?application=oil-and-gas" className="scroll-application scroll-application-oil" data-reveal><AssetImage src="/assets/oil-pump.webp" alt="ESP pump assemblies for oilfield applications" loading="lazy"/><div className="scroll-application-content"><span className="scroll-label">EQUIPMENT FOR PRODUCTION</span><h3>Oil &amp; Gas.</h3><p>Modular ESP components selected for oilfield operating conditions.</p><span className="scroll-application-link">Explore oil &amp; gas <ArrowUpRight size={22}/></span></div></Link>
   </div>
  </section>
  <section className="scroll-support container" id="project-support" aria-labelledby="support-title">
   <div className="scroll-section-meta"><span>03 / PROJECT SUPPORT</span><span>BEYOND THE COMPONENTS</span></div>
   <div className="scroll-support-grid"><figure className="scroll-support-photo" data-reveal><AssetImage src="/assets/precision-components.jpg" alt="Precision-machined metal components" loading="lazy"/><figcaption>PRECISION COMPONENTS / EQUIPMENT PRODUCTION</figcaption></figure><div className="scroll-support-copy" data-reveal><h2 id="support-title">The equipment.<br/><span>And what comes next.</span></h2><p>Support defined around your equipment and project requirements, from selection and installation to inspection and repair.</p><div className="scroll-service-list"><Link href="/services/"><span>01</span>Selection &amp; project support<ArrowUpRight size={18}/></Link><Link href="/services/"><span>02</span>Installation &amp; field support<ArrowUpRight size={18}/></Link><Link href="/services/"><span>03</span>Inspection &amp; repair<ArrowUpRight size={18}/></Link></div><Link className="scroll-inline-link" href="/company/">Meet REPN-FZCO <ArrowUpRight size={17}/></Link></div></div>
  </section>
  <section className="scroll-resources" aria-labelledby="scroll-resources-title"><div className="container"><div><span className="scroll-label">TECHNICAL DOCUMENTATION</span><h2 id="scroll-resources-title">The details behind<br/>the selection.</h2></div><div><p>Product guide, pump and motor reference data, and application-specific cable specifications.</p><Link className="scroll-inline-link" href="/resources/">Open downloads <ArrowUpRight size={18}/></Link></div></div></section>
  <section className="scroll-enquiry" id="start-project" aria-labelledby="scroll-enquiry-title"><div className="container"><div className="scroll-section-meta"><span>04 / YOUR PROJECT</span><span>LET’S START WITH YOUR WELL</span></div><div className="scroll-enquiry-grid" data-reveal><h2 id="scroll-enquiry-title">What’s below<br/><span>your surface?</span></h2><div><p>Share your operating conditions.<br/>Let’s define the equipment and support you need.</p><Link className="scroll-button scroll-button-light" href="/contact/">Prepare an enquiry <ArrowUpRight size={20}/></Link><a className="scroll-email" href="mailto:office@repnfzco.com">office@repnfzco.com</a></div></div></div></section>
 </ScrollFrame>;
}

export function EnquiryCTA({href="/contact/",title="Tell us about your well.",description="Share your operating conditions and the support you need.",id}:{href?:string;title?:string;description?:string;id?:string}) {
 return <section className="enquiry-cta" id={id}><div className="container"><div><Eyebrow>YOUR NEXT PROJECT</Eyebrow><h2>{title}</h2><p>{description}</p></div><Button href={href}>Prepare an enquiry</Button></div></section>;
}
