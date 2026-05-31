import { useState, useEffect} from 'react'
import { getDashboard } from '../services/api'
import Navbar from '../components/Navbar.jsx'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './dashboard.css'

export default function Dashboard(){
  const [stats, setStats] = useState(null)

  useEffect(()=> {
    const fetchDashboard = async () => {
      try{
        const res = await getDashboard()
        setStats(res.data)
      }catch (err){
        console.error(err)
      }
    }
    fetchDashboard()
  }, [])

  return (
    <div className='layout'>
      <div className='nav'>
      <Navbar /></div>
      <div className='main'>
      <h1>Dashboard</h1>

      {stats && (
        <>
        <div className='cardstats'>
          <div className='trxtdy'>
          <h3>Transaksi Hari Ini</h3>
          <p>{stats.totalTrx}</p>
          </div>
          <div className='pndptntdy'>
            <h3>Pendapatan Hari Ini</h3>
            <p>RP.{stats.totalPndptn}</p>
          </div>
          <div className='stokmnps'>
            <h3>Stock Menipis</h3>
            <p>{stats.produkMenipis?.length} produk</p>
          </div>
        </div>
        <h2>Transaksi 7 Hari Terakhir</h2>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={stats.grafikData}>
            <CartesianGrid strokeDasharray='3 3'/>
            <XAxis dataKey='tanggal' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey='totalTrx' name='Jumlah Transaksi (Rp)' stroke='#8884d8'/>
          </BarChart>
        </ResponsiveContainer>

        <h2>Pendapatan 7 Hari Terakhir</h2>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={stats.grafikData}>
            <CartesianGrid strokeDasharray='3 3'/>
            <XAxis dataKey='tanggal' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey='totaPndptn' name='Pendapatan (Rp)' stroke='#82ca9d'/>
          </LineChart>
        </ResponsiveContainer>

        <h2>Produk Stock Menipis</h2>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {stats.produkMenipis?.map((p)=>{
            <tr>
              <td>{p.nama}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
            </tr>
            })}
          </tbody>
        </table>
        </>
      )}
      </div>
    </div>
  )
}

 