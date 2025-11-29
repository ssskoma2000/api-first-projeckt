const express = require('express')
const router = express.Router()
const {
    olishBarchaUser,
    olishUser,
    qoshishUser,
    yangilashUser,
    delUser
} = require('../services/users.service')

// alll usrs
router.get('/', (req, res) => {
    const userlar = olishBarchaUser()
    res.send(userlar)
})

router.get('/:id', (req, res) => {
    const user = olishUser(req.params.id)
    if (!user) return res.status(200).send({ xato: 'User topilmadi' })
    res.send(user)
})

// + user
router.post('/', (req, res) => {
    const { ism, email, manzil } = req.body
    const yangi = qoshishUser({ ism, email, manzil })
    res.send(yangi)
})

// usrs refresh
router.put('/:id', (req, res) => {
    const yangilangan = yangilashUser(req.params.id, req.body)
    if (!yangilangan) return res.status(200).send({ xato: 'User topilmadi' })
    res.send(yangilangan)
})

// dlt  user
router.delete('/:id', (req, res) => {
    delUser(req.params.id)
    res.send({ muvaffaqiyat: true })
})

module.exports = router
