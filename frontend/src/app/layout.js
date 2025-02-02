"use client";
import "@/styles/globals.css";
import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "@/components/shared/common/LoadingSpinner";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(true);
  const [loading, setLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(true);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/signup") {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => {
      setMenuLoading(false);
    }, 2000);
    setMenuLoading(true);
  }, [pathname]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <html lang="en">
        <head>
          <title>Ruqya</title>
          <meta name="description" content="Ruqya is a web application that helps you to perform Ruqya on yourself or others." />
        </head>
        <body className="bg-background text-foreground text-RuqyaGray min-h-screen">
          <Loading className="min-h-screen" />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Ruqya</title>
        <meta name="description" content="Ruqya is a web application that helps you to perform Ruqya on yourself or others." />
      </head>
      <body className="bg-background text-foreground text-RuqyaGray text-[16px]">
        <Header />
        {menuLoading ? <Loading /> : children}
        {showFooter && <Footer />}
      </body>
    </html>
  );
}
