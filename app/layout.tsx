import "./globals.css";
import { Inter } from "next/font/google";

import ConvexClientProvider from "./(components)/ClientProvider";
import Header from "./(components)/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Outfit Builder",
  description: "Build and share outfits with your friends!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClientProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div className="p-2">{children}</div>
        </body>
      </html>
    </ConvexClientProvider>
  );
}
