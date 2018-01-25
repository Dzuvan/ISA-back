const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middlware/check-auth');

const ProductController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});


router.get('/', ProductController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductController.products_add_one);

router.get('/:productId', ProductController.products_get_one);

router.patch('/:productId', checkAuth, ProductController.products_update_one);

router.delete('/:productId', checkAuth, ProductController.products_delete_one);

module.exports = router;