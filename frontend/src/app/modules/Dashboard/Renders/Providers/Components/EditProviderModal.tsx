'use client'
import React, { useEffect, useMemo, useState } from 'react'
import FormModal from '@/app/GlobalComponents/Renders/FormModal'
import {ProviderService} from '@/app/utils/api/Provider/Service/ProviderService'
import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader'
import { Provider } from '../Models/ProviderModels'
import ConfirmationModal from '@/app/GlobalComponents/Renders/ConfirmationModal'

interface EditModalProps {
  isEditModalOpen: boolean
  onClose: () => void
  onConfirmFunction: (id:number,nproduct: Provider) => void | Promise<void>
  elementId: number
}

interface FormValues {
  idProveedor: string,
  nombre: string,
  telefono: string,
  email: string
}

type Errors = Partial<Record<keyof FormValues, string>>


const EditProviderModal: React.FC<EditModalProps> = ({
  isEditModalOpen,
  onClose,
  onConfirmFunction,
  elementId,
}) => {
    //Controls the Render of the ContextLoader
  const { ToggleLoaderOn, ToggleLoaderOff } = useLoader();
  //Here we are going to save the current Provider. Inserting this values in/by the Modal
  const [values, setValues] = useState<FormValues>({
    idProveedor: "",
    nombre: "",
    telefono: "",
    email: ""
  })
  const [errors, setErrors] = useState<Errors>({});
  //Controls the rendering of the editModal
  const [isConfirmEditOpen, setIsConfirmEditOpen] = useState<boolean>(false);

  // IDs para labels
  const ids = useMemo(
    () => ({
      idProveedor: 'field-id',
      nombre: 'field-nombre',
      telefono: 'field-telefono',
      email: 'field-email',
    }),
    []
  )

  // Carga el producto al abrir o cambiar de id
  useEffect(() => {
    /**
     * @async
     */
    const load = async () => {
      try {
        const proveedor: Provider = await ProviderService.getProviderById(elementId);
        setValues({
          idProveedor: String(proveedor.idProveedor),
          nombre: proveedor.nombre ?? '',
          email: proveedor.email ?? '',
          telefono: proveedor.telefono ?? '',
        })
        setErrors({})
      } catch (err) {
        console.error(err)
      }
    }
    if (isEditModalOpen && elementId != null) {
      load()
    }
  }, [isEditModalOpen, elementId, ToggleLoaderOn, ToggleLoaderOff])

  if (!isEditModalOpen) return null
  /**
   * @Info
   * Resets the values state, that contains the item selected. Clean the Modal inputs
   */
  const resetValues=()=>{ 
    setValues({
      idProveedor: '',
      nombre: '',
      email: '',
      telefono: ''
      })
    }
/**
 * @Info
 * * ¿Qué hace exactamente?  
 * - `setValues((v) => ...)` usa el estado previo `v` que entrega React, asegurando  
 *   que no perdemos actualizaciones cuando varias ocurren casi al mismo tiempo.  
 * - `({ ...v, [name]: val })` crea una NUEVA referencia de objeto (spread/shallow copy)  
 *   y sobreescribe solo la propiedad `name` con `val`. Esto mantiene la inmutabilidad,  
 *   requisito clave para que React detecte cambios y re-renderice componentes.
 */
  const setField = (name: keyof FormValues, val: string) =>
    setValues((v) => ({ ...v, [name]: val }))
  /**
   * 
   * @Info
   * Validates all the ModalFields.
   * Aplies Logic into the values state, this to check if the values are satisfactory
   */
  const validate = (): Errors => {
    const e: Errors = {}

    if (!values.nombre.trim()) e.nombre = 'Nombre obligatorio'
    else if (values.nombre.trim().length < 2) e.nombre = 'Mínimo 2 caracteres'

    if (!values.email.trim()) e.email = 'Email obligatoria'
    if (!values.telefono.trim() || values.telefono.trim().length < 3) e.telefono = 'Telefono muy corto'

    return e
  }
  /**
   * @Info
   * Using the values located in the state, the function will Map and return an instance of Provider
   * @returns Provider (Object)
   */
  const buildPayload = (): Provider => ({
    idProveedor: Number(values.idProveedor),
    nombre: values.nombre.trim(),
    email: values.email.trim(),
    telefono: values.telefono.trim(),
  })
  
  const openConfirmEdit=()=>{
    setIsConfirmEditOpen(true);
  }
/**
 * @async
 * 
 * @returns void
 */
  const handleSubmit = async () => {
    try{
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return
    const payload = buildPayload();
    await onConfirmFunction(elementId,payload);
    }
    finally{
      setIsConfirmEditOpen(false);
    resetValues();
    }
  }

  return (
    <React.Fragment>

    <FormModal
      isOpen={isEditModalOpen}
      //Envia el comportamiento de onClose hacia su padre
      onClose={onClose}
      onConfirm={openConfirmEdit}
      confirmText="Editar"
      title="Editar producto"
      className="max-w-4xl"
    >
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        {/* 2 columnas en md+ para una disposición más horizontal */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* ID (solo lectura) */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label
              htmlFor={ids.idProveedor}
              className="col-span-4 text-right text-sm font-medium text-gray-700 dark:text-gray-200 md:text-base"
            >
              ID
            </label>
            <div className="col-span-8">
              <input
                id={ids.idProveedor}
                type="text"
                value={values.idProveedor}
                readOnly
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-neutral-800 dark:bg-neutral-800 dark:text-gray-300"
              />
            </div>
          </div>

          {/* Nombre */}
        <div className="grid grid-cols-12 items-center gap-3">
            <label
            htmlFor={ids.nombre}
            className="col-span-4 text-right text-sm font-medium text-gray-700 dark:text-gray-200 md:text-base"
            >
            Nombre
            </label>
            <div className="col-span-8">
            <input
                id={ids.nombre}
                type="text"
                value={values.nombre}
                onChange={(e) => setField('nombre', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100"
                placeholder="Ej. Auriculares Pro"
            />
            {errors.nombre && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.nombre}</p>
            )}
            </div>
        </div>
        {/* Email */}
        <div className="grid grid-cols-12 items-center gap-3">
            <label
            htmlFor={ids.email}
            className="col-span-4 text-right text-sm font-medium text-gray-700 dark:text-gray-200 md:text-base"
            >
            Email
            </label>
            <div className="col-span-8">
            <input
                id={ids.email}
                type="text"
                value={values.email}
                onChange={(e) => setField('email', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100"
                placeholder="Ej. Audio"
            />
            {errors.email && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
            )}
            </div>
        </div>
        {/* Telefono */}
        <div className="md:col-span-2 grid grid-cols-12 items-start gap-3">
            <label
            htmlFor={ids.telefono}
            className="col-span-3 md:col-span-2 pt-2 text-right text-sm font-medium text-gray-700 dark:text-gray-200 md:text-base"
            >
            Telefono
            </label>
            <div className="col-span-9 md:col-span-10">
            <textarea
                id={ids.telefono}
                rows={3}
                value={values.telefono}
                onChange={(e) => setField('telefono', e.target.value)}
                className="w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100"
                placeholder="Breve descripción"
            />
            {errors.telefono && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.telefono}</p>
            )}
            </div>
        </div>
        </div>
      </form>
    </FormModal>

     {/* Muestra Modal Confrimar Edicion */}
      <ConfirmationModal isOpen={isConfirmEditOpen} onAccept={handleSubmit} onClose={()=>setIsConfirmEditOpen(false)}/>
    </React.Fragment>
  )
}

export default EditProviderModal