import CartItem from './CartItem'

export default function Cart({ cart, total, onRemove, onOpenModal }) {
    return (
        <div className='cart'>
            <h2>Keranjang</h2>
            {cart.length === 0 ? (
                <p className='cart-empty'>Keranjang kosong</p>
            ) : (
                <>
                    <div className='cart-items'>
                        {cart.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onRemove={onRemove}
                            />
                        ))}
                    </div>
                    <div className='cart-total'>
                        <span>Total</span>
                        <span>Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                    <button className='btn-bayar' onClick={onOpenModal}>
                        Bayar
                    </button>
                </>
            )}
        </div>
    )
}