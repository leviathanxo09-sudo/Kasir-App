import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../config/db.js'


export const login = (req, res) => {
    const { username, password } = req.body
    const user = db.prepare('SELECT * FROM users WHERE username=?').get(username)

    if(!user) return res.status(401).json({ message: 'User Not Found'})


    const valid = bcrypt.compareSync(password, user.password)
    if(!valid) return res.status(401).json({message:'Password Salah'})

    const token = jwt.sign(
        { id: user.id, uesername: user.username, role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: '8h'}
    )
    res.json({ token, role: user.role})
}