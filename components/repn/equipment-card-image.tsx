import { AssetImage } from "./asset-image";

/** Shared landscape presentation for homepage and catalogue selection cards. */
export function EquipmentCardImage({ image, alt, slug }: { image: string; alt: string; slug: string }) {
  const photograph = ["oil-pump", "motor", "coating"].includes(image);
  return <div className={`equipment-card-media ${photograph ? "is-photo" : "is-component"}`} data-equipment={slug}>
    <div className="equipment-card-frame">
      <AssetImage src={`/assets/${image}.webp`} alt={alt} loading="lazy" />
    </div>
  </div>;
}
