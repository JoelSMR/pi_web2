'use client'
import React, { useState } from 'react'
import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader'
import CreateProductModal from '../Renders/Products/Components/CreateProductModal'

interface CreateObjectButtonProps{
    onCreate:(nP:{nPrice: number, nName: string, nDescription: string, nCategory: string})=> void | Promise<void>
}
const CreateObjectButton:React.FC<CreateObjectButtonProps> = ({onCreate}) => {
    const {ToggleLoaderOff,ToggleLoaderOn} = useLoader();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)

    const handleOpen=()=>{
        setIsCreateModalOpen(true)
    }

    const handleCreate=async(nP:{nPrice: number, nName: string, nDescription: string, nCategory: string})=>{
        try{
            ToggleLoaderOn("Creando ...");
            await onCreate(nP);
        }
        finally{
            ToggleLoaderOff();
        }
    }
  return (
    <React.Fragment>
        {/*Regular Render  */}
        <button
        className=' p-1 rounded-xl bg-green-500 text-white hover:bg-green-800 dark:bg-blue-900 dark:hover:bg-blue-700'
        onClick={handleOpen}>
            Crear
        </button>

           {/* Dynamic Render */}
        <CreateProductModal
            isCreateModalOpen={isCreateModalOpen} onClose={()=>setIsCreateModalOpen(false)}
            onConfirm={handleCreate} 
        />
    </React.Fragment>
  )
}

export default CreateObjectButton