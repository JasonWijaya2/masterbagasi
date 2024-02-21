'use client'

import { useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWarehouseItem, selectWarehouse } from '@/redux/warehouseSlice'
import { Warehouse } from '../pages/type'

interface AddItemModalProps {
    onClose: () => void
  }

const AddWarehouse: React.FC<AddItemModalProps> = ({ onClose }) => {
  const dispatch = useDispatch()
  // Memanggil state warehouse. Tujuan untuk mengambil data sebelumnya
  const warehouseState = useSelector(selectWarehouse)
  const warehouse = warehouseState.warehouse

  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [itemWeight, setItemWeight] = useState('')
  const [itemQuantity, setItemQuantity] = useState('')

  // Mengubah string menjadi angka
  const parsedPrice = parseFloat(itemPrice) || 0
  const parsedWeight = parseFloat(itemWeight) || 0
  const parsedQuantity = parseInt(itemQuantity) || 0

  const totalPrice = parsedPrice * parsedQuantity
  const totalWeight = parsedWeight * parsedQuantity

  const handleSave = () => {
    // Jika item tidak diisi tidak bisa menyimpan
    if (!itemName || !parsedPrice || !parsedWeight || !parsedQuantity) {
        alert("Harap isi semua formulir sebelum menyimpan.")
        return
      }
    // Mengambil id sebelum dan id yang akan ditambahkan menjadi +1 dari yang terakhir
    const maxId = warehouse.reduce((max: number, item: Warehouse) => (item.id > max ? item.id : max), 0)
    const newItem = {
      id: maxId + 1,
      title: itemName,
      price: totalPrice,
      weight: totalWeight,
      quantity: parsedQuantity,
      selected: false,
    };

    dispatch(addWarehouseItem(newItem))
    console.log(newItem)
    onClose()
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemPrice(event.target.value.replace(/[^0-9]/g, '')) // Hanya mengizinkan angka
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemWeight(event.target.value.replace(/[^0-9.]/g, '')) // Hanya mengizinkan angka dan titik
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(event.target.value.replace(/[^0-9]/g, '')) // Hanya mengizinkan angka
  };
  
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-8">Tambah Barang ke Warehouse</h2>
        <div>
            <div className='flex flex-col gap-2'>
                <label className="block text-sm my-2">
                    Nama Barang
                </label>
                <input
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                   type="text"
                   value={itemName}
                   onChange={(e) => setItemName(e.target.value)} 
                   placeholder="Masukkan Nama Barang" />
                <label className="block text-sm my-2">
                    Harga Barang / pcs
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-700">Rp</div>
                    <input 
                        className="shadow appearance-none border rounded pl-8 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="number"
                        value={itemPrice}
                        onChange={handlePriceChange}
                        placeholder="0"
                    />
                </div>
                <div className='flex flex-row gap-2 mt-2'>
                    <div className='flex flex-col'>
                        <label className="block text-sm mb-2">
                            Berat Barang / pcs
                        </label>
                        <div className="relative">
                            <input 
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                               type="text"
                               value={itemWeight}
                               onChange={handleWeightChange} 
                               placeholder="0" />
                            <div className="absolute inset-y-0 right-0 flex items-center bg-gray-200 rounded-r px-3">
                            Kg
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className="block text-sm mb-2">
                            Jumlah Barang
                        </label>
                        <input 
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                           type="number"
                           value={itemQuantity}
                           onChange={handleQuantityChange}
                           placeholder="0"
                        />
                    </div>
                </div>
                <div className='flex flex-row gap-2 mt-2'>
                    <div className='flex flex-col'>
                        <div className="block text-sm mb-2">
                            Total Berat Barang
                        </div>
                        <div className="relative">
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='text'
                                value={totalWeight}
                                readOnly
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center bg-gray-200 rounded-r px-3">
                            Kg
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className="block text-sm mb-2">
                            Total Harga Barang
                        </div>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='text'
                            value={`Rp ${totalPrice.toLocaleString('id-ID')}`}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div className='flex justify-end items-center gap-2 mt-12'>
            <button className="bg-orange-600 text-white font-semibold rounded px-4 py-2" onClick={handleSave}>
                Simpan
            </button>
            <button className="border rounded px-4 py-2" onClick={onClose}>
                Tutup
            </button>
        </div>
      </div>
    </div>
  );
};

export default AddWarehouse
