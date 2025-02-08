"use client";
import "../styles/globals.css";
import "@/styles/animations.css";
import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";
import { use, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "@/components/shared/common/LoadingSpinner";
import { ChatProvider } from "@/components/getStream/chat/ChatContextProvider";
import { AuthProvider } from "@/contexts/AuthContexts";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [loading, setLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(true);
  const meetingRegex = /^\/Meeting\/\d+\/[a-zA-Z0-9]+$/;

  
  useEffect(() => {
    if (pathname === "/login" || pathname === "/signup" || pathname === "/meeting" || meetingRegex.test(pathname)) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/Meeting" || meetingRegex.test(pathname)) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
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
      <body className={`${pathname === "/Meeting" || meetingRegex.test(pathname) ? "bg-RuqyaLightGreen" : "bg-background"} text-foreground text-RuqyaGray text-[16px]`}>
        {showHeader && <Header />}
        <AuthProvider>
          <ChatProvider>{children}</ChatProvider>
        </AuthProvider>
        {showFooter && <Footer />}
      </body>
    </html>
  );
}
