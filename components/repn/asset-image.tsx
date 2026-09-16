import Image from "next/image";
import type { ImageProps } from "next/image";
import { imageDimensions } from "@/lib/image-dimensions";

export function AssetImage({src, width, height, alt, ...props}: Omit<ImageProps, "src"> & {src:string}) {
  const dimensions = imageDimensions[src];
  if (!dimensions && (!width || !height)) throw new Error(`Missing dimensions for image: ${src}`);
  return <Image {...props} loading={props.loading ?? (props.fetchPriority === "high" || src.includes("logo") ? "eager" : "lazy")} src={src} alt={alt} width={width ?? dimensions.width} height={height ?? dimensions.height} unoptimized/>;
}
