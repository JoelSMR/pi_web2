'use client'

import React, { useCallback, useState } from 'react'
import ProductService from '@/app/api/ProductService'
import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader'
import { Product } from '../Models/ProductModels'
import CardInfo from './ProductCardInfo'
import ConfirmationModal from '@/app/GlobalComponents/Renders/ConfirmationModal'
import EditProductModal from './EditProductModal'
import RefreshButton from '@/app/GlobalComponents/Renders/RefreshButton'

const FetchProductView = () => {
  const { ToggleLoaderOn, ToggleLoaderOff } = useLoader()
  const [products, setProducts] = useState<Product[]>([])
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number>(0)

  // Abre modal de confirmación
  const handleDeleteProduct = useCallback((id: number) => {
    setSelectedId(id)
    setIsDeleteConfirmationModalOpen(true)
  }, [])

  const hideDeleteConfirmationModal = useCallback(() => {
    setIsDeleteConfirmationModalOpen(false)
  }, [])

  const handleConfirmDeleteProduct = useCallback(async () => {
    try {
      ToggleLoaderOn('Eliminando Producto...')
      hideDeleteConfirmationModal()
      // await ProductService.deleteProductById(selectedId)
      // setProducts((prev) => prev.filter(p => p.id !== selectedId))
    } catch (e) {
      console.error(e)
    } finally {
      ToggleLoaderOff()
    }
  }, [ToggleLoaderOn, ToggleLoaderOff, hideDeleteConfirmationModal /*, selectedId*/])

  // Abre/cierra modal de edición
  const handleEditProduct = useCallback((id: number) => {
    setSelectedId(id)
    setIsEditModalOpen(true)
  }, [])

  const hideEditModal = useCallback(() => setIsEditModalOpen(false), [])

  // Confirmar edición (recibe los cambios desde el modal)
  const handleConfirmEditProduct = useCallback(async () => {
    try {
      ToggleLoaderOn('Editando Producto...')
      // const updated = await ProductService.updateProduct(selectedId, updatedData)
      // setProducts(prev => prev.map(p => p.id === updated.id ? updated : p))
      setIsEditModalOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      ToggleLoaderOff()
    }
  }, [ToggleLoaderOn, ToggleLoaderOff /*, selectedId*/])

  const handleFetchAllUsersHook = useCallback(async () => {
    try {
      ToggleLoaderOn('Buscando Productos ...')
      const data = await ProductService.getAllProducts()
      setProducts(
        Array.isArray(data)
          ? data
          : [{ id: 1, category: 'categoria', description: 'descripcion', name: 'nombre', price: 12.0 }]
      )
    } catch (error) {
      console.log(error)
    } finally {
      ToggleLoaderOff()
    }
  }, [ToggleLoaderOn, ToggleLoaderOff])

  return (
    <React.Fragment>
      <RefreshButton onRefresh={handleFetchAllUsersHook} label='Refrescar Productos' />
      <ConfirmationModal
        isOpen={isDeleteConfirmationModalOpen}
        onAccept={handleConfirmDeleteProduct}
        onClose={hideDeleteConfirmationModal}
      />

      <EditProductModal
        isEditModalOpen={isEditModalOpen}
        onClose={hideEditModal}
        onConfirmFunction={handleConfirmEditProduct}
        elementId={selectedId}
      />

      
      {products.map((item) => (
        <CardInfo
          key={item.id}
          id={item.id}
          category={item.category}
          description={item.description}
          name={item.name}
          price={item.price}
          onDelete={() => handleDeleteProduct(item.id)}
          onEdit={() => handleEditProduct(item.id)}
        />
      ))}
    </React.Fragment>
  )
}

export default FetchProductView