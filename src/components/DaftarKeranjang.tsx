'use client'

import { useDispatch, useSelector } from 'react-redux'
import Items from './Items'
import { IoTrashOutline } from "react-icons/io5"
import { removeAllItems, selectKeranjang, toggleSelect, toggleSelectAll } from '@/redux/keranjangSlice'

const DaftarKeranjang = () => {
  const dispatch = useDispatch()
  const keranjang = useSelector(selectKeranjang)

  const handleRemoveAllItems = () => {
    dispatch(removeAllItems())
  };

  const handleToggleSelectAll = () => {
    dispatch(toggleSelectAll())
  };

  return (
    <div className='w-full'>
      <div className='flex justify-center items-center justify-between mb-16'>
        <div className="flex justify-center items-center">
          <input id='pilih-semua' type="checkbox" value="" className="w-4 h-4" checked={keranjang.selected.selectAll} onChange={handleToggleSelectAll}/>
          <label className="ms-2 text-sm font-medium">Pilih Semua</label>
        </div>
        <button className='flex justify-center items-center text-red-500 font-semibold hover:font-bold' onClick={handleRemoveAllItems}><IoTrashOutline className='mr-2' />Hapus Semua</button>
      </div>
      {keranjang.products.map((product) => (
        <Items key={product.id} product={product} onToggleSelect={() => dispatch(toggleSelect(product.id))} />
      ))}
    </div>
  );
};

export default DaftarKeranjang