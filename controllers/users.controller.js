const {

    
    olishBarchaUser,
    
    olishUser,
    qoshishUser,
    
    yangilashUser,
    delUser
} = require('../services/users.service')



// all usersss

function hammaUser(req, res) {

    const userlar = olishBarchaUser()

    res.send(userlar)
}




function bittaUser(req, res) {

    const user = olishUser(req.params.id)

    if (!user) return res.status(200).send({ xato: 'User topilmadi' })
    res.send(user)
}



// + user

function yangiUser(req, res) {

    const { ism, email, manzil } = req.body
    const yangi = qoshishUser({ ism, email, manzil })
    res.send(yangi)
}



// refreshizm

function updateUser(req, res) {
    const yangilangan = yangilashUser(req.params.id, req.body)

    if (!yangilangan) return res.status(200).send({ xato: 'User topilmadi' })

        res.send(yangilangan)

    }

    
// delete user
function deleteUser(req, res) {
    
    delUser(req.params.id)
    
    res.send({ muvaffaqiyat: true })
}
 

module.exports = {

    hammaUser,
    bittaUser,

    yangiUser,
    updateUser,

    deleteUser
}

