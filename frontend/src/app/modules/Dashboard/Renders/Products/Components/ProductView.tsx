'use client'
import React, { useEffect, useState } from 'react'
import CardInfo from './ProductCardInfo'
import { Product } from '../Models/ProductModels'
import ProductService from '@/app/util/api/Service/ProductService'
import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader'
import RefreshButton from '@/app/modules/Dashboard/Components/RefreshButton'
import ConfirmationModal from '@/app/GlobalComponents/Renders/ConfirmationModal'
import EditProductModal from './EditProductModal'

type ProductsListViewProps = {
  title?: string
  emptyMessage?: string
  className?: string
}

const ProductsListView: React.FC<ProductsListViewProps> = ({
  title = 'Productos',
  emptyMessage = 'No hay elementos para mostrar.'
}) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [selectedItem,setSelectedItem]= useState<Product>({id:0,price:0,category:"",description:"",name:""});
    const {ToggleLoaderOn, ToggleLoaderOff} = useLoader();
    const [items,setItems]=useState<Product[]>(
      [
        {id:1,price:2,category:"Categoria",description:"Hola",name:"Pedro"}
      ]
    );

    const fetchItems=async()=>{
        ToggleLoaderOn("Consultando Productos ...");
        setItems( await ProductService.getAllProducts());
        ToggleLoaderOff();
    };
    useEffect(()=>{
        fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const showDeleteModal=async(id:number)=>{
      setSelectedId(id);
      setIsDeleteModalOpen(true)
    }

    const handleDeleteProduct=async(id:number)=>{
      setIsDeleteModalOpen(false);
      ToggleLoaderOn("Eliminando Producto");
      await ProductService.deleteProductById(id);
      setSelectedId(0);
      ToggleLoaderOff();
    }

    const showEditModal=async(id:number,nProducto:Product)=>{
      setSelectedId(id);
      setSelectedItem(nProducto);
      setIsEditModalOpen(true);

    }
    const handleEditProduct =async(id:number,nProduct:Product)=>{
      setIsEditModalOpen(false);
      ToggleLoaderOn("Editando Producto ...");
      await ProductService.updateProductByid(id,nProduct);
      ToggleLoaderOff();
    }
  return (
    <section className={'space-y-4'}>
      {/* Header con botón a la derecha */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-700">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <RefreshButton label='' onRefresh={fetchItems}/>
        </div>
      </div>

      {/* Lista de tarjetas */}
      {(items.length === 0 || !Array.isArray(items)) ? (
        <div className="rounded-lg border border-slate-200 p-8 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {emptyMessage}
        </div>
      ) : (
        <React.Fragment >
          {/* <ConfirmDeleteModal isOpen={false} onDelete={handleDeleteProduct}/> */}

          {/* Confirmar Eliminacion */}
          <ConfirmationModal isOpen={isDeleteModalOpen} onAccept={handleDeleteProduct} onClose={()=>{setIsDeleteModalOpen(false)}} />
          {/* Muestra vista de edicion */}
          <EditProductModal isEditModalOpen={isEditModalOpen} onClose={()=>setIsEditModalOpen(false)} onConfirmFunction={handleEditProduct} elementId={selectedId}/>


          {items.map((p) => (
            <CardInfo
              key={p.id}
              id={p.id}
              name={p.name}
              description={p.description}
              category={p.category}
              price={p.price}
              onEdit={showEditModal}
              onDelete={showDeleteModal}
              selectedItem={selectedItem}
            />
          ))}
        </React.Fragment>
      )}
    </section>
  )
}

export default ProductsListView