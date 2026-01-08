import type { Metadata } from "next";
import { Geist, Geist_Mono, Bungee } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Tower of Hanoi",
  description: "Play the Tower of Hanoi challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bungee.variable} antialiased`}
      >
        <div className="min-h-screen text-slate-100">
          {/* Mobile Top Nav */}
          <header className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-black/50 backdrop-blur-sm border-b border-white/10 z-30">
            <div className="flex items-center gap-2">
              <Image
                src="/adavya-image.jpg"
                alt="Adavya"
                width={60}
                height={40}
                className="rounded-lg shadow-lg"
                priority
              />
              <p
                className="text-xs uppercase tracking-wide text-slate-200"
                style={{ fontFamily: "var(--font-bungee)" }}
              >
                Takeshi Castle
              </p>
            </div>
            <Image
              src="/betalabs-medium.webp"
              alt="Beta Labs"
              width={70}
              height={45}
              className="rounded-lg shadow-lg"
              priority
            />
          </header>

          {/* Desktop Fixed Positioning */}
          <header className="hidden lg:block pointer-events-none fixed z-30 left-2 top-2">
            <div className="pointer-events-auto">
              <Image
                src="/adavya-image.jpg"
                alt="Adavya"
                width={120}
                height={80}
                className="rounded-lg shadow-lg relative left-5"
                priority
              />
              <p
                className="mt-2 text-lg uppercase tracking-wide text-slate-200"
                style={{ fontFamily: "var(--font-bungee)" }}
              >
                Takeshi Castle
              </p>
            </div>
          </header>

          <div className="hidden lg:block pointer-events-none fixed right-6 top-6 z-30">
            <Image
              src="/betalabs-medium.webp"
              alt="Beta Labs"
              width={140}
              height={90}
              className="rounded-lg shadow-lg pointer-events-auto"
              priority
            />
          </div>

          <main className="w-full flex h-full min-h-screen flex-col items-center justify-center px-4 bg-black lg:pt-0 pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
