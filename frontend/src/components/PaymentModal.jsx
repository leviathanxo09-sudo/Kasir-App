import { useState, useEffect } from 'react'

export default function PaymentModal({ isOpen, total, onClose, onConfirm }) {
    const [payment, setPayment] = useState('')

    useEffect(() => {
        if (!isOpen) setPayment('')
    }, [isOpen])

    if (!isOpen) return null

    const change = payment ? parseInt(payment) - total : 0

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <h2>Pembayaran</h2>
                <div className='modal-row'>
                    <span>Total</span>
                    <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <input
                    type='number'
                    placeholder='Nominal bayar...'
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                />
                <div className='modal-row'>
                    <span>Kembalian</span>
                    <span>Rp {change > 0 ? change.toLocaleString('id-ID') : 0}</span>
                </div>
                <div className='modal-actions'>
                    <button className='btn-batal' onClick={onClose}>Batal</button>
                    <button
                        className='btn-proses'
                        onClick={() => onConfirm(parseInt(payment))}
                        disabled={!payment || parseInt(payment) < total}
                    >
                        Proses
                    </button>
                </div>
            </div>
        </div>
    )
}