import React, { useMemo, useState } from 'react'
import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader'
import FormModal from '@/app/GlobalComponents/Renders/FormModal'
import ConfirmationModal from '@/app/GlobalComponents/Renders/ConfirmationModal'
import { NewProviderToCreate } from '../Models/ProviderModels'


interface CreateProviderModalProps{
    onConfirm:(nP:NewProviderToCreate)=>void | Promise<void>
    onClose:()=>void
    isOpen:boolean
}
const CreateProviderModal:React.FC<CreateProviderModalProps> = ({onConfirm, onClose, isOpen}) => {
    const [isConfirmCreateOpen, setIsConfirmCreateOpen] = useState<boolean>(false);
    const {ToggleLoaderOff, ToggleLoaderOn} = useLoader();


    type FormValues = {
        nombre: string,
        email: string,
        telefono: string
    }

    const [values, setValues] = useState<FormValues>({
        nombre: "",
        email: "",
        telefono: ""
      })

    const resetValues=()=>{ 
    setValues({
        nombre: "",
        email: "",
        telefono: ""
      })
    }
    
    type Errors = Partial<Record<keyof FormValues, string>>

    const [errors, setErrors] = useState<Errors>({});
    const ids = useMemo(
        () => ({
          id: 'field-id',
          nombre: 'field-nombre',
          email: 'field-email',
          telefono: 'field-telefono',
        }),
        []
      )
    const setField = (name: keyof FormValues, val: string) =>
        setValues((v) => ({ ...v, [name]: val }))
    
    const validate = (): Errors => {
        const e: Errors = {}
    
        if (!values.nombre.trim()) e.nombre = 'Nombre obligatorio'
        else if (values.nombre.trim().length < 2) e.nombre = 'Mínimo 2 caracteres'
    
        if (!values.email.trim()) e.email= 'Email Obligatorio'
        if (!values.telefono.trim() || values.telefono.trim().length < 3) e.telefono = 'Telefono Muy Corto'
    
        return e
      }
      /**
       * @Info  Maps an DTO to send at request
       * @returns Mapped Object(Payload)
       */
      const buildPayload = ()=> ({
        nombre: values.nombre,
        email: values.email.trim(),
        telefono: values.telefono.trim(),
      })
      

    const handleConfirm=async()=>{
        setIsConfirmCreateOpen(true);
    }

    const handleSubmit = async () => {
        try{
        ToggleLoaderOn("Añadiendo ...");
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length > 0) return
        const payload = buildPayload();
        await onConfirm(payload);}
        finally{
        setIsConfirmCreateOpen(false);
        resetValues();
        ToggleLoaderOff();
        }
    }
     

  return (
    <React.Fragment>
        <FormModal
            isOpen={isOpen}
            //Envia el comportamiento de onClose hacia su padre
            onClose={onClose}
            onConfirm={handleConfirm}
            confirmText="Crear"
            title="Añadir un Nuevo Proveedor"
            className="max-w-4xl"
        >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                {/* 2 columnas en md+ para una disposición más horizontal */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

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

     {/* Muestra Modal Confrimar Creacion */}
      <ConfirmationModal isOpen={isConfirmCreateOpen} onAccept={handleSubmit} onClose={()=>setIsConfirmCreateOpen(false)}/>
        
    </React.Fragment>
  )
}

export default CreateProviderModal