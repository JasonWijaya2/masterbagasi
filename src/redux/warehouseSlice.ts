import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Warehouse, Selected } from '../pages/type';
import warehouseData from '../pages/api/warehouse.json'

interface WarehouseState {
  warehouse: Warehouse[]
  selected: Selected
}

const initialState: WarehouseState = {
  warehouse: warehouseData,
  selected: {
    selectAll: false,
    selectedItems: [],
  },
};

export const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    addWarehouseItem: (state, action: PayloadAction<Warehouse>) => {
      state.warehouse.push(action.payload)
    },
    removeWarehouseItem: (state, action: PayloadAction<number>) => {
      state.warehouse = state.warehouse.filter((warehouse) => warehouse.id !== action.payload)
    },
    removeAllWarehouseItems: (state) => {
      state.warehouse = []
    },
    toggleSelect: (state, action: PayloadAction<number>) => {
      const warehouse = state.warehouse.find((p) => p.id === action.payload)
      if (warehouse) {
        warehouse.selected = !warehouse.selected
      }
    },
    toggleSelectAll: (state) => {
      state.selected.selectAll = !state.selected.selectAll
      state.warehouse.forEach((warehouse) => {
        warehouse.selected = state.selected.selectAll
      });
    },
  },
});

export const { addWarehouseItem, removeWarehouseItem, removeAllWarehouseItems, toggleSelect, toggleSelectAll } = warehouseSlice.actions

export const selectWarehouse = (state: RootState) => state.warehouse

export default warehouseSlice.reducer