export default function CartItem({ item, onRemove }) {
    return (
        <div className='cart-item'>
            <div className='cart-item-info'>
                <p className='cart-item-name'>{item.name}</p>
                <p className='cart-item-qty'>x{item.qty}</p>
            </div>
            <div className='cart-item-right'>
                <p className='cart-item-subtotal'>
                    Rp {(item.price * item.qty).toLocaleString('id-ID')}
                </p>
                <button onClick={() => onRemove(item.id)}>✕</button>
            </div>
        </div>
    )
}