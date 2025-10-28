"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gift, Check, ArrowRight, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { addDays } from "date-fns"

interface AddSchemeModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (scheme: any) => void
}

export default function AddSchemeModal({
  isOpen,
  onClose,
  onSave,
}: AddSchemeModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    type: "" as "quantity" | "cross_product" | "order_value" | "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: addDays(new Date(), 30).toISOString().split("T")[0],
    autoApply: true,
    categories: [] as string[],
    // Quantity scheme fields
    productId: "",
    productName: "",
    buyQuantity: "",
    freeQuantity: "",
    // Cross product scheme fields
    crossProductId: "",
    crossProductName: "",
    // Order value scheme fields
    minOrderValue: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: "",
  })

  const steps = [
    { number: 1, label: "Scheme Type", description: "Select promotion type" },
    { number: 2, label: "Details", description: "Configure scheme" },
    { number: 3, label: "Targeting", description: "Set validity & categories" },
    { number: 4, label: "Review", description: "Preview & confirm" },
  ]

  const schemeTypes = [
    {
      type: "quantity" as const,
      label: "Quantity Scheme",
      description: "Buy X get Y free",
      example: "Buy 10 get 2 free",
      icon: "📦",
    },
    {
      type: "cross_product" as const,
      label: "Cross Product",
      description: "Buy X get Y product free",
      example: "Buy 5 shampoos, get 1 conditioner free",
      icon: "🎁",
    },
    {
      type: "order_value" as const,
      label: "Order Value",
      description: "Discount on minimum order",
      example: "10% off on orders above ₹5000",
      icon: "💰",
    },
  ]

  const products = [
    { id: "p1", name: "Coca Cola 500ml" },
    { id: "p2", name: "Pepsi 1L" },
    { id: "p3", name: "Lays Classic 50g" },
    { id: "p4", name: "Sunsilk Shampoo 360ml" },
    { id: "p5", name: "Dettol Soap 75g" },
    { id: "p6", name: "Tropicana Orange 1L" },
  ]

  const categories = ["Beverages", "Snacks", "Personal Care"]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSave = () => {
    const details: any = {}

    if (formData.type === "quantity") {
      details.product = { id: formData.productId, name: formData.productName }
      details.buyQuantity = parseInt(formData.buyQuantity)
      details.freeQuantity = parseInt(formData.freeQuantity)
    } else if (formData.type === "cross_product") {
      details.product = { id: formData.productId, name: formData.productName }
      details.buyQuantity = parseInt(formData.buyQuantity)
      details.crossProduct = {
        id: formData.crossProductId,
        name: formData.crossProductName,
      }
      details.freeQuantity = parseInt(formData.freeQuantity)
    } else if (formData.type === "order_value") {
      details.minOrderValue = parseFloat(formData.minOrderValue)
      details.discountType = formData.discountType
      details.discountValue = parseFloat(formData.discountValue)
    }

    const newScheme = {
      id: `s${Date.now()}`,
      name: formData.name,
      type: formData.type,
      status: "active" as const,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      details,
      performance: {
        timesUsed: 0,
        totalSavings: 0,
        topReps: [],
      },
      autoApply: formData.autoApply,
      categories: formData.categories,
    }

    onSave(newScheme)
    handleClose()
  }

  const handleClose = () => {
    setStep(1)
    setFormData({
      name: "",
      type: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: addDays(new Date(), 30).toISOString().split("T")[0],
      autoApply: true,
      categories: [],
      productId: "",
      productName: "",
      buyQuantity: "",
      freeQuantity: "",
      crossProductId: "",
      crossProductName: "",
      minOrderValue: "",
      discountType: "percentage",
      discountValue: "",
    })
    onClose()
  }

  const isStep1Valid = () => formData.type !== ""
  const isStep2Valid = () => {
    if (formData.type === "quantity") {
      return (
        formData.name &&
        formData.productId &&
        formData.buyQuantity &&
        formData.freeQuantity
      )
    } else if (formData.type === "cross_product") {
      return (
        formData.name &&
        formData.productId &&
        formData.buyQuantity &&
        formData.crossProductId &&
        formData.freeQuantity
      )
    } else if (formData.type === "order_value") {
      return (
        formData.name && formData.minOrderValue && formData.discountValue
      )
    }
    return false
  }
  const isStep3Valid = () => formData.startDate && formData.endDate

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
                    Create New Scheme
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Step {step} of 4: {steps[step - 1].description}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
                {steps.map((s, index) => (
                  <div key={s.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                          step > s.number
                            ? "bg-green-500 text-white"
                            : step === s.number
                            ? "bg-blue-600 text-white"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {step > s.number ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          s.number
                        )}
                      </div>
                      <p
                        className={`text-xs mt-1 ${
                          step === s.number
                            ? "text-blue-600 font-medium"
                            : "text-slate-600"
                        }`}
                      >
                        {s.label}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 ${
                          step > s.number ? "bg-green-500" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Select Scheme Type
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {schemeTypes.map((type) => (
                        <button
                          key={type.type}
                          onClick={() =>
                            setFormData({ ...formData, type: type.type })
                          }
                          className={`text-left p-4 border-2 rounded-lg transition-all ${
                            formData.type === type.type
                              ? "border-blue-600 bg-blue-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-3xl">{type.icon}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-slate-900">
                                  {type.label}
                                </h4>
                                {formData.type === type.type && (
                                  <Badge className="bg-blue-600 text-white">
                                    Selected
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 mb-1">
                                {type.description}
                              </p>
                              <p className="text-xs text-slate-500 italic">
                                e.g., {type.example}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Configure Scheme Details
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Scheme Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Coca Cola Festive Offer"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {formData.type === "quantity" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Product *
                          </label>
                          <select
                            name="productId"
                            value={formData.productId}
                            onChange={(e) => {
                              const product = products.find(
                                (p) => p.id === e.target.value
                              )
                              setFormData({
                                ...formData,
                                productId: e.target.value,
                                productName: product?.name || "",
                              })
                            }}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select product</option>
                            {products.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Buy Quantity *
                            </label>
                            <input
                              type="number"
                              name="buyQuantity"
                              value={formData.buyQuantity}
                              onChange={handleInputChange}
                              placeholder="e.g., 10"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Free Quantity *
                            </label>
                            <input
                              type="number"
                              name="freeQuantity"
                              value={formData.freeQuantity}
                              onChange={handleInputChange}
                              placeholder="e.g., 2"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {formData.type === "cross_product" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Main Product *
                          </label>
                          <select
                            name="productId"
                            value={formData.productId}
                            onChange={(e) => {
                              const product = products.find(
                                (p) => p.id === e.target.value
                              )
                              setFormData({
                                ...formData,
                                productId: e.target.value,
                                productName: product?.name || "",
                              })
                            }}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select main product</option>
                            {products.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Buy Quantity *
                          </label>
                          <input
                            type="number"
                            name="buyQuantity"
                            value={formData.buyQuantity}
                            onChange={handleInputChange}
                            placeholder="e.g., 5"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Free Product *
                          </label>
                          <select
                            name="crossProductId"
                            value={formData.crossProductId}
                            onChange={(e) => {
                              const product = products.find(
                                (p) => p.id === e.target.value
                              )
                              setFormData({
                                ...formData,
                                crossProductId: e.target.value,
                                crossProductName: product?.name || "",
                              })
                            }}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select free product</option>
                            {products.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Free Quantity *
                          </label>
                          <input
                            type="number"
                            name="freeQuantity"
                            value={formData.freeQuantity}
                            onChange={handleInputChange}
                            placeholder="e.g., 1"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </>
                    )}

                    {formData.type === "order_value" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Minimum Order Value (₹) *
                          </label>
                          <input
                            type="number"
                            name="minOrderValue"
                            value={formData.minOrderValue}
                            onChange={handleInputChange}
                            placeholder="e.g., 5000"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Discount Type *
                            </label>
                            <select
                              name="discountType"
                              value={formData.discountType}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="percentage">Percentage (%)</option>
                              <option value="fixed">Fixed Amount (₹)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Discount Value *
                            </label>
                            <input
                              type="number"
                              name="discountValue"
                              value={formData.discountValue}
                              onChange={handleInputChange}
                              placeholder={
                                formData.discountType === "percentage"
                                  ? "e.g., 10"
                                  : "e.g., 500"
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Validity & Targeting
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          End Date *
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Target Categories (optional)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleCategoryToggle(cat)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              formData.categories.includes(cat)
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="autoApply"
                          checked={formData.autoApply}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-700">
                          Auto-apply this scheme when conditions are met
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Review Scheme
                    </h3>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                      <div>
                        <p className="text-xs text-slate-600 uppercase tracking-wide mb-1">
                          Scheme Name
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {formData.name}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-600 uppercase tracking-wide mb-1">
                          Type
                        </p>
                        <Badge className="bg-blue-100 text-blue-700">
                          {formData.type === "quantity" && "Quantity Scheme"}
                          {formData.type === "cross_product" &&
                            "Cross Product"}
                          {formData.type === "order_value" && "Order Value"}
                        </Badge>
                      </div>

                      <div>
                        <p className="text-xs text-slate-600 uppercase tracking-wide mb-1">
                          Details
                        </p>
                        <p className="text-sm text-slate-900">
                          {formData.type === "quantity" &&
                            `Buy ${formData.buyQuantity} ${formData.productName}, get ${formData.freeQuantity} free`}
                          {formData.type === "cross_product" &&
                            `Buy ${formData.buyQuantity} ${formData.productName}, get ${formData.freeQuantity} ${formData.crossProductName} free`}
                          {formData.type === "order_value" &&
                            `Orders above ₹${formData.minOrderValue} get ${formData.discountValue}${
                              formData.discountType === "percentage" ? "%" : "₹"
                            } off`}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-600 uppercase tracking-wide mb-1">
                          Validity
                        </p>
                        <p className="text-sm text-slate-900">
                          {new Date(formData.startDate).toLocaleDateString()} -{" "}
                          {new Date(formData.endDate).toLocaleDateString()}
                        </p>
                      </div>

                      {formData.categories.length > 0 && (
                        <div>
                          <p className="text-xs text-slate-600 uppercase tracking-wide mb-1">
                            Target Categories
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {formData.categories.map((cat) => (
                              <Badge
                                key={cat}
                                variant="secondary"
                                className="text-xs"
                              >
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-xs text-slate-600 uppercase tracking-wide mb-1">
                          Auto Apply
                        </p>
                        <p className="text-sm text-slate-900">
                          {formData.autoApply ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  {step < 4 ? (
                    <button
                      onClick={handleNext}
                      disabled={
                        (step === 1 && !isStep1Valid()) ||
                        (step === 2 && !isStep2Valid()) ||
                        (step === 3 && !isStep3Valid())
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                    >
                      <Check className="w-4 h-4" />
                      Create Scheme
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
