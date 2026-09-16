"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ReactNode, KeyboardEvent } from "react";
import { ArrowLeft, ArrowUpRight, ChevronRight, Download } from "lucide-react";
import { applicationFromSearch, applicationLabel, downloads, enquiryHref, equipmentHref, productApplication } from "@/lib/site-structure";
import type { ApplicationId } from "@/lib/site-structure";
import { useLocation, updateLocation } from "@/lib/use-location";
import { geothermalPumps } from "@/lib/repn-data";
import { pumpSelection, motorSpeed } from "@/lib/enquiry-helpers";

export function ProductBreadcrumb({ name }: { name: string }) {
  const location = useLocation();
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href={equipmentHref(applicationFromSearch(location))}><ArrowLeft size={14}/>Equipment</Link><ChevronRight size={13}/><span aria-current="page">{name}</span></nav>;
}

export function ProductWorkspace({ slug, name, panes }: { slug: string; name: string; panes: { application: ApplicationId; content: ReactNode }[] }) {
  const location = useLocation();
  const current = productApplication(location, panes.map(pane => pane.application));
  const controls = useRef<HTMLDivElement>(null);
  const download = current === "geothermal" || slug === "cables" ? downloads.find(item => item.equipment === slug) : undefined;
  const selectedPump = pumpSelection(location);
  const enquiryName = current === "geothermal" && slug === "pumps" ? `${geothermalPumps.find(item => item.id === selectedPump.series)!.name} / ${selectedPump.hz} Hz` : current === "geothermal" && slug === "motors" ? `${name} / 728 series / ${motorSpeed(location)} rpm` : name;
  function select(application: ApplicationId) { updateLocation({ application }, true); }
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % panes.length;
    else if (event.key === "ArrowLeft") next = (index + panes.length - 1) % panes.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = panes.length - 1;
    else return;
    event.preventDefault();
    select(panes[next].application);
    controls.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  }
  return <>
    <section className="product-specifications" aria-label="Product specifications">
      <div className="product-spec-toolbar"><div className="container">
        {panes.length > 1 ? <div ref={controls} className="product-application-tabs" role="tablist" aria-label="Application">{panes.map(({ application }, index) => <button key={application} id={`${slug}-tab-${application}`} type="button" role="tab" aria-selected={current === application} aria-controls={`${slug}-panel-${application}`} tabIndex={current === application ? 0 : -1} onClick={() => select(application)} onKeyDown={event => keyboard(event, index)}>{applicationLabel(application)}</button>)}</div> : <p className="product-single-application">{applicationLabel(current)} specifications</p>}
        {download && <a className="product-data-download" href={download.href} download><Download size={16}/>Data sheet <span>{download.format}</span></a>}
      </div></div>
      <div className="container product-specs">{panes.map(({ application, content }) => <div key={application} className="product-panel" id={`${slug}-panel-${application}`} role={panes.length > 1 ? "tabpanel" : undefined} aria-labelledby={panes.length > 1 ? `${slug}-tab-${application}` : undefined} tabIndex={panes.length > 1 ? 0 : undefined} hidden={application !== current}>{content}</div>)}</div>
    </section>
    <section className="product-enquiry"><div className="container"><div><h2>Need help selecting this equipment?</h2><p>Share your operating conditions and project requirements.</p></div><Link className="button button-red" href={enquiryHref(enquiryName,current)}>Enquire about this product<ArrowUpRight size={18}/></Link></div></section>
  </>;
}

export function ApplicationRoute({ application }: { application: ApplicationId }) {
  const href = equipmentHref(application);
  useEffect(() => { window.location.replace(href); }, [href]);
  return <main id="main" className="container route-forward"><h1>{applicationLabel(application)} equipment</h1><p>The equipment catalogue is now the direct starting point for this application.</p><Link className="button button-red" href={href}>Open equipment catalogue<ArrowUpRight size={18}/></Link></main>;
}

export function CableHeadingMark() {
 const location=useLocation();
 const oil=productApplication(location,["geothermal","oil-and-gas"])==="oil-and-gas";
 return <div className="cable-heading-mark" aria-live="polite"><strong>5 <span>kV</span></strong><p>{oil?"3 × 10–35 mm² · Copper":"3 × 33.5 mm² · 2 AWG"}</p><span>{oil?"EPR / lead · 230 °C conductor rating":"REPN-FX / REPN-QX"}</span></div>;
}
