//const { jitOnlyGuardedExpression } = require('@angular/compiler/src/render3/util')
const multer = require('multer')
const fs = require('fs')

//configuration de multer
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

fs.access("images", (error) => {
    if (error) {
        fs.mkdir("images", (error) => { })
    }
})

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + '.' + extension)
    }
})

module.exports = multer({ storage: storage }).single('image')