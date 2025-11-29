const fs = require('fs')

// o oqish
function otkir(fayl) {
    if (!fs.existsSync(fayl)) {
        fs.writeFileSync(fayl, '[]', 'utf-8')
        return []
    }
    const mal = fs.readFileSync(fayl, 'utf-8')
    return JSON.parse(mal)
}

// o yozish
function otkir1(fayl, mal) {
    fs.writeFileSync(fayl, JSON.stringify(mal))
}

// o id yasash
function otkir2() {
    return Date.now().toString()
}

module.exports = {
    otkir,
    otkir1,
    otkir2
}


