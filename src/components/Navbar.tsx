'use client'

import { selectKeranjang } from "@/redux/keranjangSlice"
import { selectWarehouse } from "@/redux/warehouseSlice"
import { FaArrowLeft } from "react-icons/fa6"
import { useSelector } from 'react-redux'

interface Handle {
  handleDaftarKeranjang: () => void
  handleWarehouse: () => void
  showDaftarKeranjang: boolean
  showWarehouse: boolean
}

const Navbar: React.FC<Handle> = ({ handleDaftarKeranjang, handleWarehouse, showDaftarKeranjang, showWarehouse }) =>{
  const keranjang = useSelector(selectKeranjang)
  const warehouse = useSelector(selectWarehouse)

  return (
    <div className="w-full bg-white h-24 flex content-between grid grid-rows-2 my-4 sticky top-0">
        <button className="flex items-center ml-8 mb-4 text-gray-900 hover:text-orange-500 hover:font-semibold">
            <FaArrowLeft />
            <div className="ml-6">Keranjang</div>
        </button>
        <div className="w-full grid grid-cols-2 items-center justify-items-center">
            <button 
              onClick={handleDaftarKeranjang}
              type="button" 
              className={`w-full h-full text-gray-900 ${
                showDaftarKeranjang
                  ? "bg-orange-200 text-orange-500 font-semibold"
                  : ""
              }`}
              >
                Daftar Keranjang ({keranjang.products.length})
            </button>
            <button 
              onClick={handleWarehouse}
              type="button" 
              className={`w-full h-full text-gray-900 ${
                showWarehouse
                  ? "bg-orange-200 text-orange-500 font-semibold"
                  : ""
              }`}
              >
                Warehouse ({warehouse.warehouse.length})
            </button>
        </div>
      <hr />
    </div>
  )
}

export default Navbar