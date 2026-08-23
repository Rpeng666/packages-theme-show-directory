import "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata = {
  title: "Theme Directory Showcase",
  description: "Browse every component implementation for every theme in the UI package.",
};

export const viewport = {
  themeColor: "#181818",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`${inter.className} antialiased`} style={{ height: "100%", padding: 0, margin: 0 }}>
        {children}
      </body>
    </html>
  );
}