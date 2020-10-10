const express = require ('express');
const router = express.Router();
const controller = require('../controllers/buybox.controller');
const authJwt = require('../middleware/authJwt');

router.get('/buybox/:id', controller.getBuyBox);
router.get("/lastupdate", [authJwt.verifyToken], controller.getUpdateTime);
router.patch('/buybox/:id', controller.updateBuyBoxInDb);
router.patch("/newupdate", [authJwt.verifyToken], controller.patchUpdateTime);

module.exports = router;