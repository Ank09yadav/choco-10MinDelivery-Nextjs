import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/provider/queryProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import SessionProvider from "@/provider/authProvider";

const fontSans = FontSans({
  subsets: ['latin'],
  variable: "--font-sans",
}) 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CHoco: 10 min delivery App",
  description: "ank09yadav ,This is the the 10 min delivery app built with nextjs 13 and its use criptomus for payment and the clerk authentication and the prisma for the database and the zustand for the state management and the react query for the data fetching and the tailwind css for the styling and the shadcn ui for the components and the next auth for the authentication and the next js for the framework and the react for the library and the typecript for the language.",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions)
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}
      >
        <QueryProvider>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
