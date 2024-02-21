import { Product, Variant } from '../pages/type'
import { IoTrashOutline } from "react-icons/io5"
import { removeItem, updateQuantity, updateSelectedVariant } from '@/redux/keranjangSlice'
import { useDispatch } from 'react-redux'

interface ItemProps {
  product: Product
  onToggleSelect: () => void
}

const Item: React.FC<ItemProps> = ({ product, onToggleSelect }) => {
  const dispatch = useDispatch()

  const selectedVariant = product.selectedVariant || product.variants[0]

  const handleVariantChange = (variant: Variant) => {
    dispatch(updateSelectedVariant({ productId: product.id, variant }))
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(product.id))
  };

  const handleIncrement = () => {
    dispatch(updateQuantity({ productId: product.id, quantity: product.quantity + 1 }))
  };

  const handleDecrement = () => {
    dispatch(updateQuantity({ productId: product.id, quantity: Math.max(1, product.quantity - 1) }))
  };

  return (
    <div>
      <div className='h-40 flex flex-row items-center justify-center my-10 gap-4 md:gap-8'>
        <div className="flex justify-center items-center">
          <input type="checkbox" value="" className="w-4 h-4" checked={product.selected} onChange={onToggleSelect}/>
        </div>
        <img src={selectedVariant?.image} alt={selectedVariant?.variant} className='w-20 h-20 md:w-40 md:h-40 border rounded-xl'/>
        <div className='w-full flex flex-col justify-center items-end ml-4'>
          <div>
            <h3 className='mb-2 text-left sm:truncate'>
              {product.title}
            </h3>
            <select className='border mb-4 pr-4' onChange={(e) => handleVariantChange(product.variants[parseInt(e.target.value)])}>
              {product.variants.map((variant, index) => (
                <option key={index} value={index}>
                  Variant: {variant.variant}
                </option>
              ))}
            </select>
            <div className='flex flex-row justify-between mb-4'>
              <div className='text-left text-orange-400 font-semibold mb-2'>Rp {selectedVariant?.price.toLocaleString('id-ID')}</div>
              <div className='text-left'>{selectedVariant?.weight} Kg</div>
            </div>
            <div className='flex flex-row mb-4'>
              <svg className='w-9 h-9 mr-4' viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" cursor="pointer">
                <rect x="0.558105" width="17.8605" height="17.8605" rx="8.93023" fill="#F4F4F4"></rect>
                <path d="M10.0639 15.084L9.85398 15.3225C9.49823 15.7297 8.9092 15.7297 8.55345 15.3225L3.71293 9.83095C2.5757 8.53369 2.47656 6.56161 3.49132 5.148C3.50298 5.13055 3.51465 5.11892 3.52631 5.10146C4.87932 3.26901 7.90611 3.61805 8.87421 5.64829L9.20663 6.35219L9.54487 5.64829C10.513 3.61805 13.5398 3.27482 14.8928 5.10146C14.9044 5.11892 14.9161 5.13055 14.9278 5.148C15.9425 6.56161 15.8434 8.53369 14.7003 9.83095M14.6945 9.83095L11.9127 12.9898C11.4928 13.4668 10.6938 13.461 10.2856 12.9723L8.03444 10.308" stroke="#B3B3B3" stroke-width="1.11628" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <button className='flex items-center justify-center bg-red-500 text-white w-9 h-9 rounded-lg mb-2 mr-4' onClick={handleRemoveItem}><IoTrashOutline /></button>
              <div className='flex flex-row'>
                <button className='flex items-center justify-center bg-gray-100 w-9 h-9 text-bold rounded-lg' onClick={handleDecrement}>-</button>
                <input
                  className='text-center mx-4 border w-full md:w-auto'
                  type="text"
                  value={product.quantity}
                />
                <button className='flex items-center justify-center bg-gray-100 w-9 h-9 text-bold rounded-lg' onClick={handleIncrement}>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Item
