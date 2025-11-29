const otkir1 = require('../services/products.service')

// all
function barchaMahsulot(req, res) {

    
    otkir1.hammasiOqish()
    
    .then(mahsulotlar => res.json(mahsulotlar))
    
    .catch(xato => res.json({ xabar: xato.message }))
}


function bittaMahsulot(req, res) {
    const id = req.params.id

    otkir1.bittaOqish(id)

    .then(mahsulot => res.json(mahsulot))

    .catch(xato => res.json({ xabar: xato.message }))
}

// new 

function yangiMahsulot(req, res) {
    const data = req.body

    otkir1.yaratish(data)

    .then(yangi => res.json(yangi))

    .catch(xato => res.json({ xabar: xato.message }))
}

// yangilas

function yangilashMahsulot(req, res) {
    const id = req.params.id
    const data = req.body

    otkir1.yangilash(id, data)
        .then(yangilangan => res.json(yangilangan))

        .catch(xato => res.json({ xabar: xato.message }))
}

// deelete
function delProduct(req, res) {

    const id = req.params.id

    otkir1.ochirish(id)

    .then(natija => res.json({ xabar: 'Product deleted', natija }))
        .catch(xato => res.json({ xabar: xato.message }))
}

module.exports = {

    barchaMahsulot,
    bittaMahsulot,

    yangiMahsulot,

    yangilashMahsulot,
    delProduct
}
