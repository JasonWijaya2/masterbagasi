import { Warehouse } from '../pages/type'
import { IoTrashOutline } from "react-icons/io5"
import { removeWarehouseItem } from '@/redux/warehouseSlice'
import { useDispatch } from 'react-redux'

interface ItemProps {
    warehouse: Warehouse
    onToggleSelect: () => void
  }

const WarehouseItem: React.FC<ItemProps> = ({ warehouse, onToggleSelect }) => {
  const dispatch = useDispatch()

  const handleRemoveWarehouse = () => {
    dispatch(removeWarehouseItem(warehouse.id))
  };

  return (
    <div>
        <div className='h-40 flex flex-row items-center my-4 gap-4 md:gap-8'>
            <div className="flex justify-center items-center">
                <input type="checkbox" value="" className="w-4 h-4" checked={warehouse.selected} onChange={onToggleSelect}/>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center border rounded bg-gray-200 h-10 px-4'>
                    {warehouse.title}
                </div>
                <div className='flex flex-row justify-between items-center gap-4'>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='text-gray-500'>
                            Estimasi harga
                        </div>
                        <div>
                            Rp {warehouse.price.toLocaleString('id-ID')}
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='text-gray-500'>
                            Estimasi berat
                        </div>
                        <div>
                            {warehouse.weight} Kg
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='text-gray-500'>
                            Jumlah
                        </div>
                        <div>
                            {warehouse.quantity} barang
                        </div>
                    </div>
                    <button className='flex items-center justify-center bg-red-500 text-white w-9 h-9 rounded-lg mb-2 mr-4' onClick={handleRemoveWarehouse}><IoTrashOutline /></button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default WarehouseItem