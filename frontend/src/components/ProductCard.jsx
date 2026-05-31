const categoryEmoji = {
    makanan: '🍕',
    minuman: '🥤',
    snack: '🍟',
    lainnya: '📦'
}

export default function ProductCard({ product, onAddToCart }) {
    return (
        <div className='product-card'>
            <div className='product-emoji'>
                {categoryEmoji[product.category] || '📦'}
            </div>
            <h3>{product.name}</h3>
            <p className='product-price'>
                Rp {product.price.toLocaleString('id-ID')}
            </p>
            <p className='product-stock'>Stok: {product.stock}</p>
            <button
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
            >
                {product.stock === 0 ? 'Habis' : '+ Tambah'}
            </button>
        </div>
    )
}