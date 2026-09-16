"use client";
import { AssetImage } from "./asset-image";
import { useState } from "react";
import { Maximize2, ExternalLink, ZoomIn, ZoomOut } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";

export function TechnicalImage({ src, alt, caption, className = "", width, height }: { src: string; alt: string; caption: string; className?: string; width?: number; height?: number; }) {
  const [actualSize, setActualSize] = useState(false);
  return <figure className={`technical-image ${className}`}>
    <Sheet onOpenChange={() => setActualSize(false)}>
      <SheetTrigger className="technical-image-trigger" aria-label={`Enlarge: ${alt}`}>
        <AssetImage src={src} alt={alt} width={width} height={height} loading="lazy"/>
        <span className="image-open-label"><Maximize2 size={16}/> Enlarge image</span>
      </SheetTrigger>
      <SheetContent side="bottom" className="image-viewer">
        <div className="image-viewer-heading"><SheetTitle>{alt}</SheetTitle><SheetDescription>{caption}</SheetDescription></div>
        <div className="image-viewer-actions"><button type="button" onClick={() => setActualSize(!actualSize)}>{actualSize ? <ZoomOut size={18}/> : <ZoomIn size={18}/>} {actualSize ? "Fit to screen" : "Original size"}</button><a href={src} target="_blank" rel="noreferrer">Open original <ExternalLink size={16}/></a></div>
        <div className={`image-viewer-stage ${actualSize ? "actual-size" : "fit-size"}`} tabIndex={0} role="region" aria-label="Image view — scroll to inspect at original size"><AssetImage src={src} alt={alt} width={width} height={height}/></div>
      </SheetContent>
    </Sheet>
    <figcaption>{caption}</figcaption>
  </figure>;
}
