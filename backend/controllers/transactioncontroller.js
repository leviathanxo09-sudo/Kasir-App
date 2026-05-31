import db from '../config/db.js'

export const createtransactions = (req, res) => {
    const { items, payment} = req.body
    const user_id = req.user.user_id

    let total = 0
    for (const item of items){
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(item.product_id)
        total += product.price * item.qty
    }

    const change = payment - total

    const trx = db.prepare('INSERT INTO transactions (id, total_price,payment, change) VALUES (?,?,?,?)')
    const { lastInsertRowid } = trx.run(user_id, total, payment, change)

    for (const item of items){
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(item.product_id)
        const subtotal = product.price * item.qty

        db.prepare('INSERT INTO transaction_items (transaction_id, product_id, qty, sutotal) VALUES (?, ?,? ,?)').run(lastInsertRowid, item.product_id, item.qty,sutotal)
        db.prepare('UPDATE products SET stock = stock - ? WHERE Id = ?').run(item.qty, item.product_id)
    }
    res.json({ transaction_id: lastInsertRowid, total, change })
}

export const gethistory = (req, res) => {
    let transactions

    if (req.user.role === 'admin'){
        transactions = db.prepare('SELECT * FROM transactions').all()

    }else {
        transactions = db.prepare('SELECT * FROM transactions WHERE user_id = ?').all(req.user.id)
    }
    res.json(transactions)
}

export const getdashboard = (req,res) => {
    const totalTrx = db.prepare(`
        SELECT COUNT(*) as total FROM transactions WHERE DATE(created_at) = DATE('now')
        `).get()

    const totaPndptn = db.prepare(`
        SELECT SUM(total_price) as total FROM transactions WHERE DATE(created_at) = DATE('now')
        `).get()

    const produkMenipis = db.prepare(`
        SELECT * FROM products WHERE stock < 5`).all()

    const grafikData = db.prepare(`
        SELECT 
            DATE(created_at) as tanggal,
            COUNT(*) as totalTrx,
            SUM(total_price) as totalPndptn
        FROM transactions
        WHERE created_at >= DATE('now','-6 days')
        GROUP BY DATE(created_at)
        ORDER BY tanggal ASC
        `).all()

    res.json({
        totalTrx:totalTrx.total,
        totaPndptn:totaPndptn.total ?? 0,
        produkMenipis,
        grafikData
    })
}