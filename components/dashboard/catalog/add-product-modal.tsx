"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Package, Image as ImageIcon, Grid3x3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  stock: boolean
}

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: any) => void
}

export default function AddProductModal({
  isOpen,
  onClose,
  onSave,
}: AddProductModalProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "images" | "variants">(
    "basic"
  )
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    description: "",
    basePrice: "",
    packaging: "",
    stockAvailable: true,
    isActive: true,
  })
  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [newVariant, setNewVariant] = useState({
    name: "",
    sku: "",
    price: "",
    stock: true,
  })

  const tabs = [
    { id: "basic" as const, label: "Basic Info", icon: Package },
    { id: "images" as const, label: "Images", icon: ImageIcon },
    { id: "variants" as const, label: "Variants", icon: Grid3x3 },
  ]

  const categories = [
    "Beverages > Soft Drinks",
    "Beverages > Juices",
    "Snacks > Chips",
    "Snacks > Biscuits",
    "Personal Care > Shampoos",
    "Personal Care > Soaps",
  ]

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleAddVariant = () => {
    if (newVariant.name && newVariant.sku && newVariant.price) {
      const variant: ProductVariant = {
        id: `v${Date.now()}`,
        name: newVariant.name,
        sku: newVariant.sku,
        price: parseFloat(newVariant.price),
        stock: newVariant.stock,
      }
      setVariants([...variants, variant])
      setNewVariant({ name: "", sku: "", price: "", stock: true })
    }
  }

  const handleRemoveVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id))
  }

  const handleSave = () => {
    const newProduct = {
      id: `p${Date.now()}`,
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      categoryId: "",
      description: formData.description,
      basePrice: parseFloat(formData.basePrice),
      packaging: formData.packaging,
      stockAvailable: formData.stockAvailable,
      isActive: formData.isActive,
      images: [],
      variants: variants,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    onSave(newProduct)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      name: "",
      sku: "",
      category: "",
      description: "",
      basePrice: "",
      packaging: "",
      stockAvailable: true,
      isActive: true,
    })
    setVariants([])
    setNewVariant({ name: "", sku: "", price: "", stock: true })
    setActiveTab("basic")
    onClose()
  }

  const isFormValid = () => {
    return (
      formData.name &&
      formData.sku &&
      formData.category &&
      formData.basePrice &&
      variants.length > 0
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Add New Product
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Create a new product with variants
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-200 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === "basic" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g., Coca Cola"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          SKU *
                        </label>
                        <input
                          type="text"
                          name="sku"
                          value={formData.sku}
                          onChange={handleInputChange}
                          placeholder="e.g., COKE-001"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Base Price (₹) *
                        </label>
                        <input
                          type="number"
                          name="basePrice"
                          value={formData.basePrice}
                          onChange={handleInputChange}
                          placeholder="e.g., 40"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Packaging
                      </label>
                      <input
                        type="text"
                        name="packaging"
                        value={formData.packaging}
                        onChange={handleInputChange}
                        placeholder="e.g., PET Bottle, Packet, Bar"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Product description..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="stockAvailable"
                          checked={formData.stockAvailable}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-700">
                          Stock Available
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-700">
                          Active Product
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === "images" && (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                      <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-sm text-slate-600 mb-2">
                        Image upload coming soon
                      </p>
                      <p className="text-xs text-slate-500">
                        Drag and drop images or click to browse
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "variants" && (
                  <div className="space-y-4">
                    {/* Add Variant Form */}
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-slate-900 mb-3">
                        Add Variant
                      </h4>
                      <div className="grid grid-cols-4 gap-3">
                        <input
                          type="text"
                          placeholder="Name (e.g., 500ml)"
                          value={newVariant.name}
                          onChange={(e) =>
                            setNewVariant({ ...newVariant, name: e.target.value })
                          }
                          className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="SKU"
                          value={newVariant.sku}
                          onChange={(e) =>
                            setNewVariant({ ...newVariant, sku: e.target.value })
                          }
                          className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Price (₹)"
                          value={newVariant.price}
                          onChange={(e) =>
                            setNewVariant({
                              ...newVariant,
                              price: e.target.value,
                            })
                          }
                          className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={handleAddVariant}
                          disabled={
                            !newVariant.name ||
                            !newVariant.sku ||
                            !newVariant.price
                          }
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Variants List */}
                    {variants.length > 0 ? (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-900">
                          Variants ({variants.length})
                        </h4>
                        {variants.map((variant) => (
                          <div
                            key={variant.id}
                            className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-900">
                                  {variant.name}
                                </p>
                                <p className="text-xs text-slate-600 font-mono">
                                  {variant.sku}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-700"
                              >
                                ₹{variant.price}
                              </Badge>
                              <button
                                onClick={() => handleRemoveVariant(variant.id)}
                                className="text-red-600 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-500 text-sm">
                        No variants added yet. Add at least one variant to
                        continue.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
                <p className="text-sm text-slate-600">
                  {!isFormValid() && (
                    <span className="text-amber-600">
                      * Fill all required fields and add at least one variant
                    </span>
                  )}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!isFormValid()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Save Product
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
