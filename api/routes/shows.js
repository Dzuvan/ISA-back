const express = require('express');
const multer = require('multer');

const router = express.Router();
const checkAuth = require('../middlware/check-auth');

const ShowController = require('../controllers/shows');

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
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

router.get('/', ShowController.shows_get_all);

router.get('/:showId', ShowController.shows_get_one);

router.post('/', checkAuth, upload.single('poster'), ShowController.shows_add_one);

router.delete('/:showId', checkAuth, ShowController.shows_delete_one);

router.patch('/:showId', checkAuth, ShowController.shows_update_one);

module.exports = router;
