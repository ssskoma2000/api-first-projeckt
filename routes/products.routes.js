
const express = require('express')
const router = express.Router()
const {

    olishBarchaMahsulot,
    olishMahsulot,

    qoshishMahsulot,
    yangilashMahsulot,
    delProduct
} = require('../services/products.service')




// all
router.get('/', (req, res) => {
    const mahsulotlar = olishBarchaMahsulot()

    res.send(mahsulotlar)


})


router.get('/:id', (req, res) => {

    const mahsulot = olishMahsulot(req.params.id)

    if (!mahsulot) return res.status(200).send({ xato: 'Mahsulot topilmadi' })
    res.send(mahsulot)
})



// qoshish

router.post('/', (req, res) => {


    const { nomi, narxi, stok } = req.body


    const yangi = qoshishMahsulot({ nomi, narxi, stok })
    res.send(yangi)

})





// yanglass

router.put('/:id', (req, res) => {
    const yangilangan = yangilashMahsulot(req.params.id, req.body)

    if (!yangilangan) return res.status(200).send({ xato: 'Mahsulot topilmadi' })

    res.send(yangilangan)

})



// delete

router.delete('/:id', (req, res) => {

    delProduct(req.params.id)


    res.send({ muvaffaqiyat: true })

})


module.exports = router
