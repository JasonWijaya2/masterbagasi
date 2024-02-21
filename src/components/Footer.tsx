'use client'

import { MdKeyboardArrowRight } from "react-icons/md"
import { HiShoppingBag } from "react-icons/hi2"
import { useSelector } from 'react-redux'
import { selectKeranjang } from "@/redux/keranjangSlice"
import { selectWarehouse } from "@/redux/warehouseSlice"

const Footer = () => {
  const keranjang = useSelector(selectKeranjang)
  const warehouse = useSelector(selectWarehouse)

  const selectedItems = keranjang.products.filter((product) => product.selected)
  const selectedWarehouse = warehouse.warehouse.filter((warehouse) => warehouse.selected)

  const totalItem = selectedItems.length + selectedWarehouse.length
  const totalHargaItems = selectedItems.reduce((total, item) => {
    if (item.selectedVariant) {
      return total + item.quantity * item.selectedVariant.price
    } else {
      // Jika tidak memilih variant, maka menggunakan variant default untuk default price
      const defaultProductPrice = item.variants.length > 0 ? item.variants[0].price : 0
      return total + item.quantity * defaultProductPrice
    }
  }, 0);
  const totalHargaWarehouse = selectedWarehouse.reduce((total, item) => total + item.price, 0)
  const totalHarga = totalHargaItems + totalHargaWarehouse

  return (
    <div className="w-full bg-white flex flex-col justify-center items-center my-4 sticky bottom-0">
        <hr />
        <button className="w-full h-12 border rounded-lg flex items-center justify-center hover:bg-blue-700 hover:text-white">
            <HiShoppingBag className="mr-4 text-orange-500" />
            Makin hemat dengan keranjang bersama
            <MdKeyboardArrowRight className="ml-4" />
        </button>
        <div className="w-full flex items-center justify-between mt-4">
            <div className="ml-2">
                Keranjang yang dipilih
            </div>
            <div className="mr-2">
                {selectedItems.length} item
            </div>
        </div>
        <div className="w-full flex items-center justify-between mt-2">
        <div className="ml-2">
                Warehouse yang dipilih
            </div>
            <div className="mr-2">
                {selectedWarehouse.length} item
            </div>
        </div>
        <hr />
        <div className="w-full flex items-center justify-between mt-6">
            <div className="flex flex-col items-center justify-center">
                Total Belanja
                <div className="font-bold">
                    Rp {totalHarga.toLocaleString('id-ID')}
                </div>
            </div>
            <div>
                <button className="bg-orange-600 text-white font-semibold rounded px-4 py-2">
                    Checkout ({totalItem})
                </button>
            </div>
        </div>
    </div>
  )
}

export default Footer