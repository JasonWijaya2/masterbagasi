import { configureStore } from '@reduxjs/toolkit'
import keranjangReducer from './keranjangSlice'
import warehouseReducer from './warehouseSlice'

export const store = configureStore({
  reducer: {
    keranjang: keranjangReducer,
    warehouse: warehouseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch