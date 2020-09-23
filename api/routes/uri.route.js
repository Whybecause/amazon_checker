const express = require ('express');
const router = express.Router();
const controller = require('../controllers/uri.controller');

router.post('/uris', controller.createUri);
router.get('/uris', controller.getUris);
router.patch('/uris/:id', controller.updateUris);

module.exports = router;