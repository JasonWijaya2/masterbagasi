'use client'

import { useState } from 'react'
import DaftarKeranjang from '@/components/DaftarKeranjang'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Warehouse from '@/components/Warehouse'

const Home = () => {
  const [showDaftarKeranjang, setShowDaftarKeranjang] = useState(true)
  const [showWarehouse, setShowWarehouse] = useState(false)

  const handleDaftarKeranjang = () => {
    setShowDaftarKeranjang(true)
    setShowWarehouse(false)
  }

  const handleWarehouse = () => {
    setShowDaftarKeranjang(false)
    setShowWarehouse(true)
  }

  return (
    <main className="flex flex-col items-center p-4">
      <Navbar handleDaftarKeranjang={handleDaftarKeranjang} handleWarehouse={handleWarehouse} showDaftarKeranjang={showDaftarKeranjang} showWarehouse={showWarehouse}/>
          {showDaftarKeranjang && <DaftarKeranjang />}
          {showWarehouse && <Warehouse />}
      <Footer />
    </main>
  );
};

export default Home
