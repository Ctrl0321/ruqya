import "@/styles/globals.css";
import Header from "@/components/shared/layout/Header";

export const metadata = {
  title: "Ruqya",
  description: "Ruqya is a web application that helps you to perform Ruqya on yourself or others.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
