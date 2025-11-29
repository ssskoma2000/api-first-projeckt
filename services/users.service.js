const { readJSON, writeJSON, generateId } = require('../utils/fileDB')
const USERS_FILE = 'users.json'
const ORDERS_FILE = 'orders.json'

async function otkir1() {
  return await readJSON(USERS_FILE)
}

// 1 ta user olish
async function otkir2(id) {
  const users = await readJSON(USERS_FILE)
  for (let u of users) if (u.id === id) return u
  throw { status: 404, message: 'User topilmadi' }
}

// new user 
async function otkir3({ name, email, address }) {
  const users = await readJSON(USERS_FILE)
  for (let u of users) if (u.email === email) throw { status: 400, message: 'Email allaqachon mavjud' }

  const yangi = { id: generateId('u_'), name, email, address: address || '' }
  users.push(yangi)
  await writeJSON(USERS_FILE, users)
  return yangi
}

// user upgret
async function otkir4(id, { name, email, address }) {
  const users = await readJSON(USERS_FILE)
  let topildi = false
  for (let u of users) {
    if (u.id === id) {
      if (name) u.name = name
      if (email) u.email = email
      if (address) u.address = address
      topildi = true
    }
  }
  if (!topildi) throw { status: 404, message: 'user topilmadi' }
  await writeJSON(USERS_FILE, users)
  return otkir2(id)
}

//user dlete va undagi hammma narsa ochadi
async function otkir5(id) {
  let users = await readJSON(USERS_FILE)
  users = users.filter(u => u.id !== id)
  await writeJSON(USERS_FILE, users)

  let orders = await readJSON(ORDERS_FILE)
  orders = orders.filter(o => o.userId !== id)
  await writeJSON(ORDERS_FILE, orders)
  return true
}

module.exports = { otkir1, otkir2, otkir3, otkir4, otkir5 }
