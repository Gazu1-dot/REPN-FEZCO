import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";
import "./brand-refinements.css";
import "./structure.css";
import "./selection-refinements.css";
import "./homepage-experience.css";
import "./interior-refinements.css";
import { Header, Footer } from "@/components/repn/site";
export const metadata: Metadata = {
  title: { default: "REPN-FZCO | Geothermal & Oilfield Pumping Systems", template: "%s | REPN-FZCO" },
  description: "REPN-FZCO provides ESP equipment and project support for geothermal and oilfield applications: pumps, motors, protectors, cables, gas handling, monitoring and controls.",
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header />{children}<Footer /></body></html>;
}
