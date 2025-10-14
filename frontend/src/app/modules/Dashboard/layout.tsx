import React from 'react';
import SidebarNav, { NavItem } from "../../GlobalComponents/Renders/SidebarNav";


export default async function LayoutComponent({children}: {children:React.ReactNode}){
  return(
    <React.Fragment>
      <div className="min-h-screen grid grid-cols-12">
                {/* Sidebar fijo a la izquierda en md+; arriba en móvil */}
                <aside className="col-span-12 border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:col-span-3 lg:col-span-2 md:border-r md:border-b-0">
                  <div className="mb-4">
                    <div className="text-base font-semibold dark:text-slate-400">SYSMARKET MANAGEMENT</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Navegación</div>
                  </div>
                  {/* Efectua la renderizacion dinamica del contenido del navbar, a traves de Item[] para renderizado dinamico */}
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
    