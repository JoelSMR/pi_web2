import React, { useState } from 'react'
import { UserDB } from '../Models/LogInFormModels'
import FormModal from '@/app/GlobalComponents/Renders/FormModal'
import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader'

interface CreateUserModalProps{
    isOpen: boolean
    onConfirm: (payload:UserDB)=> void|Promise<void>
    onShow: ()=> void
    onClose : ()=> void
}
const CreateUserModal:React.FC<CreateUserModalProps> = ({isOpen, onClose, onConfirm, onShow}) => {
    type FormValues={
        id:string,
        name:string,
        email:string
    };
    type Errors = Partial<Record<keyof FormValues, string>>

    const [userValues,setUserValues] = useState<FormValues>({id:'',name:"",email:""})
    const [errors, setErrors] = useState<Errors>({});
    const {ToggleLoaderOn, ToggleLoaderOff} = useLoader();
    /**
       * @Info  Maps an DTO to send at request
       * @returns Mapped Object(Payload)
       */
    const buildPayload=():UserDB=>({
        id:Number(userValues.id),
        nombre: userValues.name,
        correo: userValues.email
    })

    const resetValues = ()=>{
        setUserValues({
                        id:'',
                        email:'',
                        name:''
                        })
    }

    const setField = (name: keyof FormValues, val: string) =>
        setUserValues((v) => ({ ...v, [name]: val }))

    const validate = (): Errors => {
        const e: Errors = {}
    
        if (!userValues.name.trim()) e.name = 'Nombre obligatorio'
        else if (userValues.name.trim().length < 2) e.name = 'Mínimo 2 caracteres'
    
        if (!userValues.email.trim()) e.email = 'Email obligatoria'    

        return e
      }

    const handleCreate = async()=>{
        try{
            onClose();
            ToggleLoaderOn("Validando ...");
            const validatedErrors = validate();
            setErrors(validatedErrors);
            if ( Object.keys(validatedErrors).length>0) return
            const payload = buildPayload();
            await onConfirm(payload);
        }
        finally{
            ToggleLoaderOff();
            onShow();
            resetValues();
        }
    }
    const handleClose =()=>{
        try{
            onClose()
        }
        finally{
            resetValues();
        }
    }
  if (!isOpen) return null;
  return (
    <React.Fragment>
        <FormModal 
            isOpen={isOpen}
            onConfirm={handleCreate}
            onClose={handleClose}
            confirmText='Crear'
            title='Creacion de Usuario'
            cancelText='Cerrar'
            className='max-w-4xl'
            >
            <form
            onSubmit={(e:React.FormEvent)=>{e.preventDefault()}}
            >
                {/* Nombre */}
                <div className="grid grid-cols-12 items-center gap-3">
                    <label 
                    className="col-span-4 text-right text-sm font-medium text-gray-700 dark:text-gray-200 md:text-base"
                    >
                    Nombre
                    </label>
                    <div className="col-span-8">
                    <input
                        type="text"
                        value={userValues.name}
                        onChange={(e) => setField('name', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100"
                        placeholder="Ej. Luis Martinez"
                    />
                    {errors.name && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                    </div>
                </div>

                {/* Correo */}
                <div className="grid grid-cols-12 items-center gap-3">
                    <label 
                    className="col-span-4 text-right text-sm font-medium text-gray-700 dark:text-gray-200 md:text-base"
                    >
                    Correo
                    </label>
                    <div className="col-span-8">
                    <input
                        type="text"
                        value={userValues.email}
                        onChange={(e) => setField('email', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100"
                        placeholder="Ej. test@test.com"
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
                    )}
                    </div>
                </div>

            </form>
        </FormModal>
    </React.Fragment>
  )
}

export default CreateUserModal