import { Inter } from "next/font/google";
import "./(site)/globals.css";
import NotFoundBody from "@/components/NotFoundBody";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Root not-found renders for fully unmatched URLs, which sit above the (site)
// layout. Because the root layout is a pass-through, this must supply its own
// <html>/<body>.
export default function NotFound() {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <NotFoundBody />
      </body>
    </html>
  );
}
