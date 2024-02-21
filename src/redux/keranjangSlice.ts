import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { Product, Variant, Selected } from '../pages/type'
import productsData from '../pages/api/keranjang.json'

interface KeranjangState {
  products: Product[]
  selected: Selected
}

const initialState: KeranjangState = {
  products: productsData,
  selected: {
    selectAll: false,
    selectedItems: [],
  },
}

export const keranjangSlice = createSlice({
  name: 'keranjang',
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((product) => product.id !== action.payload)
    },
    removeAllItems: (state) => {
      state.products = []
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const product = state.products.find((p) => p.id === action.payload.productId)
      if (product) {
        product.quantity = action.payload.quantity
      }
    },
    updateSelectedVariant: (state, action: PayloadAction<{ productId: number; variant: Variant }>) => {
        const product = state.products.find((p) => p.id === action.payload.productId)
        if (product) {
          product.selectedVariant = action.payload.variant
        }
    },
    toggleSelect: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload)
      if (product) {
        product.selected = !product.selected
      }
    },
    toggleSelectAll: (state) => {
      state.selected.selectAll = !state.selected.selectAll
      state.products.forEach((product) => {
        product.selected = state.selected.selectAll
      });
    },
  },
})

export const {
  removeItem,
  removeAllItems,
  updateQuantity,
  updateSelectedVariant,
  toggleSelect,
  toggleSelectAll,
} = keranjangSlice.actions

export const selectKeranjang = (state: RootState) => state.keranjang

export default keranjangSlice.reducer
