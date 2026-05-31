import { useState, useEffect } from 'react'
import { getHistory } from '../services/api'
import Sidebar from '../components/Navbar'
import './history.css'

export default function History() {
    const [transactions, setTransactions] = useState([])
    const [selectedTrx, setSelectedTrx] = useState(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await getHistory()
                setTransactions(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchHistory()
    }, [])

    const filteredTrx = transactions.filter((t) =>
        t.id.toString().includes(search)
    )

    return (
        <div className='layout'>
            <Sidebar />
            <div className='history-main'>
                <h1>Riwayat Transaksi</h1>

                <input
                    className='search'
                    type='text'
                    placeholder='Cari ID transaksi...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Total</th>
                            <th>Bayar</th>
                            <th>Kembalian</th>
                            <th>Waktu</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTrx.map((t) => (
                            <tr key={t.id}>
                                <td>#{t.id}</td>
                                <td>Rp {t.total_price.toLocaleString('id-ID')}</td>
                                <td>Rp {t.payment.toLocaleString('id-ID')}</td>
                                <td>Rp {t.change.toLocaleString('id-ID')}</td>
                                <td>{new Date(t.created_at).toLocaleString('id-ID')}</td>
                                <td>
                                    <button className='btn-detail' onClick={() => setSelectedTrx(t)}>
                                        Detail
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedTrx && (
                    <div className='modal-overlay'>
                        <div className='modal'>
                            <h2>Detail Transaksi #{selectedTrx.id}</h2>
                            <div className='modal-row'>
                                <span>Total</span>
                                <span>Rp {selectedTrx.total.toLocaleString('id-ID')}</span>
                            </div>
                            <div className='modal-row'>
                                <span>Bayar</span>
                                <span>Rp {selectedTrx.payment.toLocaleString('id-ID')}</span>
                            </div>
                            <div className='modal-row'>
                                <span>Kembalian</span>
                                <span>Rp {selectedTrx.change.toLocaleString('id-ID')}</span>
                            </div>
                            <div className='modal-row'>
                                <span>Waktu</span>
                                <span>{new Date(selectedTrx.created_at).toLocaleString('id-ID')}</span>
                            </div>
                            <div className='modal-actions'>
                                <button className='btn-batal' onClick={() => setSelectedTrx(null)}>Tutup</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}