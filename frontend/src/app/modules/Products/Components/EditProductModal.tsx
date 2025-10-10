'use client'
import React, { useEffect, useMemo, useState } from 'react'
import FormModal from '@/app/GlobalComponents/Renders/FormModal'
import ProductService from '@/app/api/ProductService'
import useLoader from '@/app/GlobalComponents/CustomHooks/useLoader'
import { Product } from '../Models/ProductModels'

interface EditModalProps {
  isEditModalOpen: boolean
  onClose: () => void
  onConfirmFunction: (updated: Product) => void | Promise<void>
  elementId: number
}

type FormValues = {
  id: string
  price: string
  name: string
  description: string
  category: string
}

type Errors = Partial<Record<keyof FormValues, string>>


const EditProductModal: React.FC<EditModalProps> = ({
  isEditModalOpen,
  onClose,
  onConfirmFunction,
  elementId,
}) => {
  const { ToggleLoaderOn, ToggleLoaderOff } = useLoader();
  const [values, setValues] = useState<FormValues>({
    id: '',
    price: '',
    name: '',
    description: '',
    category: '',
  })
  const [errors, setErrors] = useState<Errors>({})

  // IDs para labels
  const ids = useMemo(
    () => ({
      id: 'field-id',
      price: 'field-price',
      name: 'field-name',
      description: 'field-description',
      category: 'field-category',
    }),
    []
  )

  // Carga el producto al abrir o cambiar de id
  useEffect(() => {
    const load = async () => {
      try {
        const product: Product = await ProductService.getProductById(elementId);
        setValues({
          id: String(product.id),
          price: String(product.price),
          name: product.name ?? '',
          description: product.description ?? '',
          category: product.category ?? '',
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

  const setField = (name: keyof FormValues, val: string) =>
    setValues((v) => ({ ...v, [name]: val }))

  const validate = (): Errors => {
    const e: Errors = {}
    const priceNum = Number(values.price)

    if (!values.name.trim()) e.name = 'Nombre obligatorio'
    else if (values.name.trim().length < 2) e.name = 'Mínimo 2 caracteres'

    if (!values.price.trim()) e.price = 'Precio obligatorio'
    else if (Number.isNaN(priceNum)) e.price = 'Precio inválido'
    else if (priceNum < 0) e.price = 'No puede ser negativo'

    if (!values.category.trim()) e.category = 'Categoría obligatoria'
    if (!values.description.trim() || values.description.trim().length < 3)
      e.description = 'Descripción muy corta'

    return e
  }

  const buildPayload = (): Product => ({
    id: Number(values.id),
    price: Number(values.price),
    name: values.name.trim(),
    description: values.description.trim(),
    category: values.category.trim(),
  })

  const handleSubmit = async () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    const payload = buildPayload()
    await onConfirmFunction(payload)
  }

  return (
    <FormModal
      isOpen={isEditModalOpen}
      //Envia el comportamiento de onClose hacia su padre
      onClose={onClose}
      onConfirm={handleSubmit}
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
              htmlFor={ids.id}
              className="col-span-4 text-right text-sm font-medium text-gray-700 dark:text-gray-200 md:text-base"
            >
              ID
            </label>
            <div className="col-span-8">
              <input
                id={ids.id}
                type="text"
                value={values.id}
                readOnly
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-neutral-800 dark:bg-neutral-800 dark:text-gray-300"
              />
            </div>
          </div>

          {/* Precio */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label
              htmlFor={ids.price}
              className="col-span-4 text-right text-sm font-medium text-gray-700 dark:text-gray-200 md:text-base"
            >
              Precio
            </label>
            <div className="col-span-8">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  id={ids.price}
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min={0}
                  value={values.price}
                  onChange={(e) => setField('price', e.target.value)}
                  className="w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100"
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Nombre */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label
              htmlFor={ids.name}
              className="col-span-4 text-right text-sm font-medium text-gray-700 dark:text-gray-200 md:text-base"
            >
              Nombre
            </label>
            <div className="col-span-8">
              <input
                id={ids.name}
                type="text"
                value={values.name}
                onChange={(e) => setField('name', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100"
                placeholder="Ej. Auriculares Pro"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Categoría */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label
              htmlFor={ids.category}
              className="col-span-4 text-right text-sm font-medium text-gray-700 dark:text-gray-200 md:text-base"
            >
              Categoría
            </label>
            <div className="col-span-8">
              <input
                id={ids.category}
                type="text"
                value={values.category}
                onChange={(e) => setField('category', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100"
                placeholder="Ej. Audio"
              />
              {errors.category && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Descripción (ocupa 2 columnas) */}
          <div className="md:col-span-2 grid grid-cols-12 items-start gap-3">
            <label
              htmlFor={ids.description}
              className="col-span-3 md:col-span-2 pt-2 text-right text-sm font-medium text-gray-700 dark:text-gray-200 md:text-base"
            >
              Descripción
            </label>
            <div className="col-span-9 md:col-span-10">
              <textarea
                id={ids.description}
                rows={3}
                value={values.description}
                onChange={(e) => setField('description', e.target.value)}
                className="w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100"
                placeholder="Breve descripción"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.description}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormModal>
  )
}

export default EditProductModal