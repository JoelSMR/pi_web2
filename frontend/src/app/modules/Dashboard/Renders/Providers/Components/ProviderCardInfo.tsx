'use client'
import React from 'react'
import { Provider } from '../Models/ProviderModels'
/**
 * @param idProveedor  number
 * @param nombre  string
 * @param telefono  string
 * @param email  string
 * @param onEdit ( id : number, nProvider: Provider )=> void | Promise< void >
 * @param onDelete ( id : number )=> void | Promise< void >
 * @param selectedItem  Provider
 */
interface CardInfoProps extends Provider{
    onEdit?:(id:number,nProvider:Provider)=> void | Promise<void>,
    onDelete?: (id:number)=> void | Promise<void>
    selectedItem: Provider
}
/**
 * @Implementation
 * {items.map((p:Provider)=>(
 * 
 * < CardInfo
 * 
 *            key={p.productId}
 *            idProveedor={p.idProveedor}
 *            nombre={p.nombre}
 *            telefono={p.telefono}
 *            email={p.telefono}
 *            onEdit={showEditModal}
 *            onDelete={()=>showDeleteModal(p.idProveedor)}
 *            selectedItem={selectedItem}
 *          / >
 *          ))}
 * 
 * @param idProveedor  number
 * @param nombre  string
 * @param telefono  string
 * @param email  string
 * @param onEdit ( id : number, nProvider: Provider )=> void | Promise< void >
 * @param onDelete ( id : number )=> void | Promise< void >
 * @param selectedItem  Provider
 * 
 * @returns  JSX RENDER
 */
const CardInfo:React.FC<CardInfoProps> = ({idProveedor,nombre,email,telefono,onEdit, onDelete , selectedItem}) => {
  return (
    <article  
      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800"  
      aria-labelledby={`card-title-${idProveedor}`}  
      aria-describedby={`card-desc-${idProveedor}`}  
      data-idProveedor={idProveedor}  
    >  
      {/* Header */}  
      <div className="flex items-center justify-between bg-slate-50 px-4 py-2 dark:bg-slate-900/40">  
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
        </span>  
        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">  
          {/* {category}   */}
        </span>  
      </div>  
  
      {/* Body */}  
      <div className="space-y-2 px-4 py-4">  
        <h3 id={`card-title-${idProveedor}`} className="text-lg font-semibold text-slate-900 dark:text-slate-100">  
          Nombre : {nombre}  
        </h3>  
  
        <p id={`card-desc-${idProveedor}`} className="text-sm text-slate-600 dark:text-slate-300">  
          Email : {email}
        </p>  
  
        <div className="mt-3 flex items-baseline gap-2">  
          <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">  
            Telefono : {telefono}
          </span>  
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {/* IVA incl. */}
          </span>  
        </div>  
      </div>  
  
      {/* Footer / Actions (opcional) */}  
      <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-right dark:border-slate-700 dark:bg-slate-900/40">  
        <button  
          onClick={()=>onEdit?.(idProveedor,selectedItem)}
          type="button"  
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:ring-offset-slate-800"  
        >  
          Editar  
        </button>
        <button
          onClick={()=>onDelete?.(idProveedor)}
          type="button"  
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:ring-offset-slate-800"  
        >  
          Eliminar 
        </button>  
      </div>  
    </article>
  )
}

export default CardInfo