const express = require('express')
const app = express()


const PORT = 3000

app.use(express.json())

// import rotes

const userRoutes = require('./routes/users.routes')

const productRoutes = require('./routes/products.routes')


const orderRoutes = require('./routes/orders.routes')


// routes start



app.use('/users', userRoutes)
app.use('/products', productRoutes)

app.use('/orders', orderRoutes)



// test 

app.get('/', (req, res) => {

    res.send({ xabar: 'Simple Shop API ishga tushdi' })


})


app.listen(PORT, () => {

    console.log(`Server ${PORT} portda ishlamoqda`)

})
