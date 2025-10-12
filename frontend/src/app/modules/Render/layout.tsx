import React from 'react'
import SidebarNav, { NavItem } from "@/app/GlobalComponents/Renders/SidebarNav"

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  // NavItems dinámicos: grupos con subrutas
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
      <main className="col-span-12 p-4 md:col-span-9 lg:col-span-10">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {children}
        </div>
      </main>
    </div>
  )
}