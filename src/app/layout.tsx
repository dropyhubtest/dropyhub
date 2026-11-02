import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter/wght-italic.css";
import "@fontsource/open-sauce-two/300.css";
import "@fontsource/open-sauce-two/400.css";
import "@fontsource/open-sauce-two/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "DropyHub | On-Demand Delivery Platform",
  description: "DropyHub - Fast, reliable on-demand delivery and logistics.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
