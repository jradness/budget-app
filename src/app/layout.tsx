import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "Budget Radness",
  description: "Discover enhanced clarity in managing your finances with our app. Designed to provide a clearer view of your bi-weekly budget, it estimates which bills align with each pay period and calculates your available spending money.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}
