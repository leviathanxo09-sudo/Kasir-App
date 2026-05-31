import db from '../config/db.js'

export const getallproducts = (req, res) => {
    const products = db.prepare('SELECT * FROM products').all()
    res.json(products)
}

export const getidproduct = (req, res) => {
    const product = db.prepare('SELECT * FROM products WHERE id=?').get(req.params.id)
    res.json(product)
}
export const createproduct = (req, res) => {
    const { name, price, stock, category} = req.body
    const stmt = db.prepare('INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)')
    stmt.run(name, price, stock, category)
    res.json({ message: 'Product Berhasil Ditambahkan'})
}

export const updateproduct = (req, res) => {
    const { name, price, stock, category } = req.body
    const stmt = db.prepare('UPDATE products SET name=?, price=?, stock=?, category=?')
    stmt.run(name, price, stock, category, req.params.id)
    res.json({message: 'Update Berhasil'})
} 

export const deleteproduct = (req, res)=> {
    db.prepare('DELETE FROM transaction_items WHERE product_id = ?').run(req.params.id)
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id)
    res.json({message : 'Produk berhasil dihapus'})
}
