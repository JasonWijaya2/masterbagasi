'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoTrashOutline } from "react-icons/io5"
import { removeAllWarehouseItems, selectWarehouse, toggleSelect, toggleSelectAll } from '@/redux/warehouseSlice'
import WarehouseItem from './WarehouseItem'
import AddWarehouse from './AddWarehouse'


const Warehouse = () => {
  const dispatch = useDispatch()
  const warehouse = useSelector(selectWarehouse)

  const handleRemoveAllItems = () => {
    dispatch(removeAllWarehouseItems())
  };

  const handleToggleSelectAll = () => {
    dispatch(toggleSelectAll())
  };

  const [isModalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center justify-center my-4'>
          <div className="flex justify-center items-center">
            <input id='pilih-semua' type="checkbox" value="" className="w-4 h-4" checked={warehouse.selected.selectAll} onChange={handleToggleSelectAll}/>
            <label className="ms-2 text-sm font-medium">Pilih Semua</label>
          </div>
          <button className='flex justify-center items-center text-red-500 font-semibold hover:font-bold' onClick={handleRemoveAllItems}><IoTrashOutline className='mr-2' />Hapus Semua</button>
      </div>
      <button className='w-full h-12 border rounded-lg flex items-center justify-center bg-blue-900 text-white' onClick={handleOpenModal}>
        Tambah barang ke warehouse
      </button>
      {isModalOpen && <AddWarehouse onClose={handleCloseModal} />}
      {warehouse.warehouse.map((warehouse) => (
        <WarehouseItem key={warehouse.id} warehouse={warehouse} onToggleSelect={() => dispatch(toggleSelect(warehouse.id))} />
      ))}
    </div>
  )
}

export default Warehouse