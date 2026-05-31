import { useState, useEffect } from 'react'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api'
import Sidebar from '../components/Navbar'
import './products.css'

export default function Products() {
    const [products, setProducts] = useState([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [form, setForm] = useState({ name: '', price: '', stock: '', category: '' })
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await getProducts()
            setProducts(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleOpenForm = (product = null) => {
        setSelectedProduct(product)
        setForm(product ? {
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category
        } : { name: '', price: '', stock: '', category: '' })
        setIsFormOpen(true)
    }

    const handleCloseForm = () => {
        setIsFormOpen(false)
        setSelectedProduct(null)
    }

    const handleSubmit = async () => {
        try {
            if (selectedProduct) {
                await updateProduct(selectedProduct.id, form)
            } else {
                await createProduct(form)
            }
            fetchProducts()
            handleCloseForm()
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus produk ini?')) return
        try {
            await deleteProduct(id)
            fetchProducts()
        } catch (err) {
            console.error(err)
        }
    }

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className='layout'>
            <Sidebar />
            <div className='products-main'>
                <div className='products-header'>
                    <h1>Produk</h1>
                    <button className='btn-tambah' onClick={() => handleOpenForm()}>
                        + Tambah Produk
                    </button>
                </div>

                <input
                    className='search'
                    type='text'
                    placeholder='Cari produk...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Kategori</th>
                            <th>Harga</th>
                            <th>Stok</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((p, i) => (
                            <tr key={p.id}>
                                <td>{i + 1}</td>
                                <td>{p.name}</td>
                                <td>{p.category}</td>
                                <td>Rp {p.price.toLocaleString('id-ID')}</td>
                                <td>{p.stock}</td>
                                <td>
                                    <button className='btn-edit' onClick={() => handleOpenForm(p)}>Edit</button>
                                    <button className='btn-hapus' onClick={() => handleDelete(p.id)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isFormOpen && (
                    <div className='modal-overlay'>
                        <div className='modal'>
                            <h2>{selectedProduct ? 'Edit Produk' : 'Tambah Produk'}</h2>
                            <input
                                type='text'
                                placeholder='Nama produk'
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                            <input
                                type='number'
                                placeholder='Harga'
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                            />
                            <input
                                type='number'
                                placeholder='Stok'
                                value={form.stock}
                                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                            />
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                            >
                                <option value=''>Pilih Kategori</option>
                                <option value='makanan'>Makanan</option>
                                <option value='minuman'>Minuman</option>
                                <option value='snack'>Snack</option>
                                <option value='lainnya'>Lainnya</option>
                            </select>
                            <div className='modal-actions'>
                                <button className='btn-batal' onClick={handleCloseForm}>Batal</button>
                                <button className='btn-proses' onClick={handleSubmit}>
                                    {selectedProduct ? 'Simpan' : 'Tambah'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}