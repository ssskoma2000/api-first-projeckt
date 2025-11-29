const express = require('express')


const { getAllOrders, getOrderById, getOrdersByUserId, createOrder, deleteOrder } = require('../services/orders.service')

const route = express.Router()


// barcha buyurtmalarni ko'rsatish
route.get('/orders', (req, res) => {
  const natija = getAllOrders()
  res.json(natija)
})


route.get('/orders/:id', (req, res) => {
  const natija = getOrderById(req.params.id)

  res.json(natija)

})
// all buyurtma

route.get('/users/:id/orders', (req, res) => {

    const natija = getOrdersByUserId(req.params.id)

    res.json(natija)
})
// new buyurtma qoshish

route.post('/orders', (req, res) => {


    const natija = createOrder(req.body)
  res.json(natija)
 })
 
//  dlete buyurtma

route.delete('/orders/:id', (req, res) => {

    const natija = deleteOrder(req.params.id)

    res.json({ ok: natija })

})


module.exports = route
