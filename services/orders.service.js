const { readJSON, writeJSON, otkir1 } = require('../utils/fileDB')



const USERS_FILE = 'users.json'

const MAHSULOT_FILE = 'products.json'

const ORDER_FILE = 'orders.json'


async function otkir2() {
    return await readJSON(ORDER_FILE)
 
}
 

 
// id bilan olish
 
async function otkir3(id) {
 
    const buyurtmalar = await readJSON(ORDER_FILE)
  
     const buyurtma = buyurtmalar.find(b => b.id === id)
   
     if (!buyurtma) throw { status: 404, message: 'Buyurtma topilmadi' }
    
     return buyurtma
}


 
// user buyurtmalari

async function otkir4(userId) {

    const buyurtmalar = await readJSON(ORDER_FILE)

    return buyurtmalar.filter(b => b.userId === userId)
}


//create buyrtma

async function otkir5({ userId, productId, miqdor }) {

    miqdor = Number(miqdor)
 
    if (isNaN(miqdor) || miqdor <= 0) throw { status: 400, message: 'Miqdor 0 dan katta bo‘lishi kerak' }
 
 
  
    const users = await readJSON(USERS_FILE)
     const user = users.find(u => u.id === userId)
   
      if (!user) throw { status: 400, message: 'User mavjud emas' }

       
    const mahsulotlar = await readJSON(MAHSULOT_FILE)
    
    const mahsulot = mahsulotlar.find(m => m.id === productId)
     
     
    if (!mahsulot) throw { status: 400, message: 'Mahsulot mavjud emas' }


    
     if (mahsulot.soni < miqdor) throw { status: 400, message: 'Stok yetarli emas' }


     const totalPrice = mahsulot.narxi * miqdor
 
     const buyurtma = {
   
        id: otkir1(),
    
        userId,
     
        productId,
      
        miqdor,
       
        totalPrice,
           createdAt: new Date().toISOString()
    }

    mahsulot.soni -= miqdor

      const buyurtmalar = await readJSON(ORDER_FILE)
    
      buyurtmalar.push(buyurtma)
 
 
      await writeJSON(MAHSULOT_FILE, mahsulotlar)
 
      await writeJSON(ORDER_FILE, buyurtmalar)


    return buyurtma
}

// dlete buyrtma
async function otkir6(id) {
     
    const buyurtmalar = await readJSON(ORDER_FILE)
    
    const yangiRoyxat = buyurtmalar.filter(b => b.id !== id)
     if (yangiRoyxat.length === buyurtmalar.length) throw { status: 404, message: 'Buyurtma topilmadi' }

      await writeJSON(ORDER_FILE, yangiRoyxat)
     
      return true
}

module.exports = {
       
      
     otkir2,
    
    otkir3,
    
    
     otkir4,
      
     otkir5,
     
       otkir6
}
