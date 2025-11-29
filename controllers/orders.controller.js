const {

    
    getAllOrders,
    
    getOrderById,
    
    getOrdersByUserId,
    
    createOrder,
    deleteOrder
} = 
require('../services/orders.service')



function  hammaBuyurtma(req, res) {

     const orders = getAllOrders()
      res.send(orders)
  
}


function  bittaBuyurtma (req, res) {

      const order = getOrderById(req.params.id)
     if (!order) return res.status(200).send({ xato: 'Buyurtma topilmadi' })
    res.send(order)

}

 


function userBuyurtmalari(req, res) {


     const orders = getOrdersByUserId(req.params.id)
    res.send(orders)
   

}


// new buyurtma

function yangiBuyurtma(req, res) {

     const { userId, productId, quantity } = req.body

     const order = createOrder({ userId, productId, quantity })
    res.send(order)
  
}


 // delete buyrtmaaaaaaaaaaaaa
function deleteBuyurtma(req, res) {
 
     deleteOrder(req.params.id)
  
      res.send({ muvaffaqiyat: true })
}
 

 


 module.exports = {
     hammaBuyurtma,
  
      bittaBuyurtma,
   
       userBuyurtmalari,
    
       yangiBuyurtma,
    deleteBuyurtma
}

