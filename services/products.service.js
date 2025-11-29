const { readJSON, writeJSON, otkir1 } = require('../utils/fileDB')

const MAHSULOT_FILE = 'products.json'

// barca mahsulotlarni olish
async function otkir2() {
    return await readJSON(MAHSULOT_FILE)
}

// mahsulotni id boycha izlashh
async function otkir3(id) {
    const mahsulotlar = await readJSON(MAHSULOT_FILE)
    const mahsulot = mahsulotlar.find(m => m.id === id)
    if (!mahsulot) throw { status: 404, message: 'Mahsulot topilmadi' }
    return mahsulot
}

// mahsulot yaratish
async function otkir4({ nomi, narxi, soni }) {
    const mahsulotlar = await readJSON(MAHSULOT_FILE)
    const yangi = {
        id: otkir1(), 
        nomi,
        narxi: Number(narxi),
        soni: Number(soni)
    }
    mahsulotlar.push(yangi)
    await writeJSON(MAHSULOT_FILE, mahsulotlar)
    return yangi
}

// yangilash
async function otkir5(id, { nomi, narxi, soni }) {
    const mahsulotlar = await readJSON(MAHSULOT_FILE)
    const mahsulot = mahsulotlar.find(m => m.id === id)
    if (!mahsulot) throw { status: 404, message: 'Mahsulot topilmadi' }

    if (nomi !== undefined) mahsulot.nomi = nomi
    if (narxi !== undefined) mahsulot.narxi = Number(narxi)
    if (soni !== undefined) mahsulot.soni = Number(soni)

    await writeJSON(MAHSULOT_FILE, mahsulotlar)
    return mahsulot
}

// ochirish
async function otkir6(id) {
    const mahsulotlar = await readJSON(MAHSULOT_FILE)
    const yangiRoyxat = mahsulotlar.filter(m => m.id !== id)
    if (yangiRoyxat.length === mahsulotlar.length) throw { status: 404, message: 'Mahsulot topilmadi' }

    await writeJSON(MAHSULOT_FILE, yangiRoyxat)
    return true
}

// stokni kamaytirish
async function otkir7(id, miqdor) {
    const mahsulotlar = await readJSON(MAHSULOT_FILE)
    const mahsulot = mahsulotlar.find(m => m.id === id)
    if (!mahsulot) throw { status: 404, message: 'Mahsulot topilmadi' }
    if (mahsulot.soni < miqdor) throw { status: 400, message: 'Stok yetarli emas' }

    mahsulot.soni -= miqdor
    await writeJSON(MAHSULOT_FILE, mahsulotlar)
    return mahsulot
}

module.exports = {
    otkir2,
    otkir3,
    otkir4,
    otkir5,
    otkir6,
    otkir7
}
