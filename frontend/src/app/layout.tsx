import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoaderProvider } from "./GlobalComponents/CustomProviders/LoaderProvider";
import SidebarNav, { NavItem } from "./GlobalComponents/Renders/SidebarNav";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sysmarket",
  description: "",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const LayoutComponent=({children}: {children:React.ReactNode})=>{
  return(
    <React.Fragment>
      <div className="min-h-screen grid grid-cols-12">
                {/* Sidebar fijo a la izquierda en md+; arriba en móvil */}
                <aside className="col-span-12 border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:col-span-3 lg:col-span-2 md:border-r md:border-b-0">
                  <div className="mb-4">
                    <div className="text-base font-semibold">App Shell</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Navegación</div>
                  </div>
                  <SidebarNav items={navItems} />
                </aside>
          
                {/* Contenido de rutas internas */}
                <main className="col-span-12  md:col-span-9 lg:col-span-10">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    {children}
                  </div>
                </main>
              </div>
    </React.Fragment>
  )
}
   const navItems: NavItem[] = [
      { label: 'ej', href: '/workspace' },
      {
        label: 'Productos',
        href: '/modules/Products', // opcional; útil para marcar activo por prefijo
        children: [
          { label: 'Lista', href: '/modules/Products' }
        ],
      },
      {
        label: 'Proveedores',
        href: '/modules/Providers', // opcional; útil para marcar activo por prefijo
        children: [
          { label: 'Lista', href: '/modules/Providers' }
        ],
      },
      {
        label: 'Configuración',
        href: '/workspace/settings',
        children: [
          { label: 'Perfil', href: '/workspace/settings/profile' },
          { label: 'Facturación', href: '/workspace/settings/billing' },
        ],
      },
    ]
    
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LoaderProvider>
          <LayoutComponent >
            {children}
          </LayoutComponent>
        </LoaderProvider>
      </body>
    </html>
  );
}
