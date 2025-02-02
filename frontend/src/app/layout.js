"use client";
import "@/styles/globals.css";
import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "@/components/shared/common/LoadingSpinner";

// Remove metadata export
// export const metadata = {
//   title: "Ruqya",
//   description: "Ruqya is a web application that helps you to perform Ruqya on yourself or others.",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/signup") {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [pathname]);

  const [loading, setLoading] = useState(true);

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
        <body className="bg-background text-foreground text-RuqyaGray sm:text-[16px] min-h-screen">
          <Loading className="min-h-screen"/>
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
      <body className="bg-background text-foreground text-RuqyaGray sm:text-[16px]">
        <Header />
        {children}
        {showFooter && <Footer />}
      </body>
    </html>
  );
}
