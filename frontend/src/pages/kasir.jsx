import { useState, useEffect } from "react"
import { getProducts, createTransaction } from "../services/api"
import Sidebar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import Cart from "../components/Cart"
import PaymentModal from "../components/PaymentModal"
import './kasir.css'



export default function Kasir() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProducts()
                setProducts(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchProducts()
    }, [])

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            }
            return [...prev, { ...product, qty: 1 }]
        })
    }

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    const handleBayar = async (payment) => {
        try {
            const items = cart.map((item) => ({
                product_id: item.id,
                qty: item.qty
            }))
            await createTransaction({ items, payment })
            setCart([])
            setIsModalOpen(false)
        } catch (err) {
            console.error(err)
        }
    }

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

    return (
        <div className='layout'>
            <Sidebar />
            <div className='kasir-main'>
                <div className='kasir-left'>
                    <input
                        className='search'
                        type='text'
                        placeholder='Cari produk...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className='product-grid'>
                        {filteredProducts.map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>
                </div>
                <div className='kasir-right'>
                    <Cart
                        cart={cart}
                        total={total}
                        onRemove={removeFromCart}
                        onOpenModal={() => setIsModalOpen(true)}
                    />
                </div>
            </div>
            <PaymentModal
                isOpen={isModalOpen}
                total={total}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleBayar}
            />
        </div>
    )
}