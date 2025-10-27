'use client'
import React, { useEffect, useState } from 'react'
import CardInfo from './ProviderCardInfo'
import { NewProviderToCreate, Provider } from '../Models/ProviderModels'
import {ProviderService} from '@/app/utils/api/Provider/Service/ProviderService'
import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader'
import RefreshButton from '@/app/modules/Dashboard/Components/RefreshButton'
import ConfirmationModal from '@/app/GlobalComponents/Renders/ConfirmationModal'
import EditProviderModal from './EditProviderModal'
import CreateObjectButton from '../../../Components/CreateObjectButton'

type ProductsListViewProps = {
  title?: string
  emptyMessage?: string
}

const ProviderListView: React.FC<ProductsListViewProps> = ({
  title = 'Proveedores',
  emptyMessage = 'No hay elementos para mostrar.'
}) => {
    //Controls the render of the delete modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    //Controls the render of the edit modal
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    //Controls the selected id. This refers to an Object ID
    const [selectedId, setSelectedId] = useState<number>(0);
    //Controls the selected id. This refers to an Object ID
    const [selectedItem,setSelectedItem]= useState<Provider>({idProveedor:0, email:"",nombre:"",telefono:""});
    //Renders the Loader Provided By Context
    const {ToggleLoaderOn, ToggleLoaderOff} = useLoader();
    //Items Fetched by FetchItems
    const [items,setItems]=useState<Provider[]>([{idProveedor:0, email:"",nombre:"",telefono:""}]);

    const fetchItems=async ()=>{
        ToggleLoaderOn("Consultando Productos ...");
        try{
        const iArray:Provider[]=await ProviderService.getAllProviders();
        setItems(iArray);
        }
        catch(error){
          console.log(error);
        }
        finally{
          ToggleLoaderOff();
        }
    };
    
    useEffect(()=>{
        fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleCreate=async(np:NewProviderToCreate)=>{
      try{
      await ProviderService.createProvider(np);
      }
      finally{
      fetchItems();
      }
    }

    /**
     * 
     * @param id 
     * @Info  Enables the state that controls the next stage of the delet process. Also set the selectedIdState the selectedIdItem
     */
    const showDeleteModal=async(id:number)=>{
      setSelectedId(id);
      setIsDeleteModalOpen(true)
    }

    /**
     * 
     * @param id 
     * @Info  
     */
    const handleDeleteProduct=async(id:number)=>{
      try{
      setIsDeleteModalOpen(false);
      ToggleLoaderOn("Eliminando Producto");
      await ProviderService.deleteProviderById(id);
      }
      finally{
      setSelectedId(0);
      ToggleLoaderOff();
      fetchItems();
      }
    }
    
    const showEditModal=async(id:number,nProducto:Provider)=>{
      setSelectedId(id);
      setSelectedItem(nProducto);
      setIsEditModalOpen(true);

    }

    const handleEditProduct =async(id:number,nProduct:Provider)=>{
      try{
        setIsEditModalOpen(false);
        ToggleLoaderOn("Editando Producto ...");
        await ProviderService.updateProviderById(id,nProduct);
      }
      finally{
        ToggleLoaderOff();
        fetchItems();
      }

    }

  return (
    <section className={'space-y-4'}>
      {/* Header con botón a la derecha */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-700">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <CreateObjectButton instanceOf='PROVIDER' onCreateProvider={handleCreate} /> 
          <RefreshButton label='' onRefresh={fetchItems}/>
        </div>
      </div>

      {/* Lista de tarjetas */}
      { (items.length === 0 || !Array.isArray(items)) ? (
        <div className="rounded-lg border border-slate-200 p-8 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {emptyMessage}
        </div>
      ) : (
        <React.Fragment >
          {/* Confirmar Eliminacion */}
          <ConfirmationModal isOpen={isDeleteModalOpen} onAccept={()=>{handleDeleteProduct(selectedId)}} onClose={()=>{setIsDeleteModalOpen(false)}} />
          {/* Muestra vista de edicion */}
          <EditProviderModal isEditModalOpen={isEditModalOpen} onClose={()=>setIsEditModalOpen(false)} onConfirmFunction={handleEditProduct} elementId={selectedId}/>

          {items.map((p) => (
            <CardInfo
              key={p.idProveedor}
              idProveedor={p.idProveedor}
              nombre={p.nombre}
              telefono={p.telefono}
              email={p.email}
              onEdit={showEditModal}
              onDelete={()=>showDeleteModal(p.idProveedor)}
              selectedItem={selectedItem}
            />
          ))}
        </React.Fragment>
      )}
    </section>
  )
}

export default ProviderListView