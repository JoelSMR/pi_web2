'use client'
import React, { useState } from 'react'
import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader'
import CreateProductModal from '../Renders/Products/Components/CreateProductModal'
import { NewProductToCreate } from '../Renders/Products/Models/ProductModels'
import { NewProviderToCreate } from '../Renders/Providers/Models/ProviderModels'
import CreateProviderModal from '../Renders/Providers/Components/CreateProviderModal'
import { DropdownItem } from '@/app/GlobalComponents/Renders/Dropdown'

//@Deprecated. No build in typescript due to undefined treshold 
//interface CreateObjectButtonProps{
//     onCreateProduct?:(nP:NewProductToCreate)=> void | Promise<void>
//     onCreateProvider?:(nP:NewProviderToCreate)=> void | Promise<void>
//     instanceOf: string
//     dropdownItems: DropdownItem[]
// }

type BaseProps={
    dropdownItems: DropdownItem[]
}

type ProductProps = BaseProps &{
    instanceOf: 'product'
    onCreateProduct:(nP:NewProductToCreate)=> void | Promise<void>
}
type ProviderProps = {
    instanceOf: 'provider'
    onCreateProvider:(nP:NewProviderToCreate)=> void | Promise<void>
}
type CreateObjectButtonProps = ProductProps|ProviderProps
 
/**
 * @Implementation  < CreateObjectButton instanceOf={modelname} onCreate={functionCore} / >
 * @param onCreate  Receives a function that contains core funcs. Executes it to create
 * @returns JSX BUTTON with functionability
 */
const CreateObjectButton:React.FC<CreateObjectButtonProps> = (props) => {
    const {ToggleLoaderOff,ToggleLoaderOn} = useLoader();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)

    const handleOpen=()=>{
        setIsCreateModalOpen(true)
    }
    const hideCreateModal=()=>{
        setIsCreateModalOpen(false);
    }
    if (props.instanceOf == 'product'){
        const {onCreateProduct, dropdownItems } = props;

        const handleCreateProduct=async(nP:NewProductToCreate)=>{
            try{
                ToggleLoaderOn("Creando ...");
                await onCreateProduct(nP);
            }
            finally{
                setIsCreateModalOpen(false);
                ToggleLoaderOff();
            }
        }
        return (
            <CreateProductModal
                isOpen={isCreateModalOpen}
                onClose={()=>setIsCreateModalOpen(false)}
                onConfirm={handleCreateProduct} 
                providersArray={dropdownItems}
            />
        )

    }
    if ( props.instanceOf=='provider'){
        const {onCreateProvider} = props;

        const handleCreateProvider=async(nP:NewProviderToCreate)=>{
            try{
                ToggleLoaderOn("Creando ...");
                await onCreateProvider(nP);
            }
            finally{
                setIsCreateModalOpen(false);
                ToggleLoaderOff();
            }
        }
        return (
            <CreateProviderModal 
                isOpen={isCreateModalOpen} 
                onClose={hideCreateModal} 
                onConfirm={handleCreateProvider}
            / >
        )
    }
    else{return null}
}
    
   
export default CreateObjectButton