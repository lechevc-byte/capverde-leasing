import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CaboVerde Leasing — Marketplace de Leasing em Cabo Verde",
  description:
    "O primeiro marketplace de leasing operacional em Cabo Verde. Veículos, informática, telefonia, mobiliário, equipamento CHR.",
  openGraph: {
    title: "CaboVerde Leasing — Marketplace de Leasing em Cabo Verde",
    description:
      "O primeiro marketplace de leasing operacional em Cabo Verde. Veículos, informática, telefonia, mobiliário, equipamento CHR.",
    siteName: "CaboVerde Leasing",
    locale: "pt_PT",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profil = null;
  if (user) {
    const { data } = await supabase
      .from('profils')
      .select('prenom, nom')
      .eq('id', user.id)
      .single();
    profil = data;
  }

  return (
    <html lang="pt" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <Header user={profil} />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
