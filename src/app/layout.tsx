import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

// IMPORTA ESTILOS
import "/public/assets/themes/lara-light-teal/theme.css";
import "/public/assets/layout/layout.scss";
import "/public/assets/layout/sass/routes.scss";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reservas",
  description: "Aplicación de reservas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
