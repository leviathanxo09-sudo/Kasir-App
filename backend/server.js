import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import auth from './routes/auth.js'
import products from './routes/products.js'
import transactions from './routes/transactions.js'
import dashboard from './routes/transactions.js'


dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/auth', auth)
app.use('/api/products', products)
app.use('/api/transactions', transactions)
app.use('/api/transactions/dashboard', dashboard)




app.listen(process.env.PORT,()=>{
    console.log(`Server Jalan Di Port ${process.env.PORT}`)
})
