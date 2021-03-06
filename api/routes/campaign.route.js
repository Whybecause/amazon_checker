const express = require ('express');
const router = express.Router();
const controller = require('../controllers/campaign.controller');
const authJwt = require('../middleware/authJwt');

router.post('/campaigns', [authJwt.verifyToken], controller.createCampaign);
router.get('/campaigns/problem', [authJwt.verifyToken], controller.getProblematicCampaigns);
router.get('/campaigns/all', [authJwt.verifyToken], controller.getAllCampaigns);
router.patch('/state/:id', [authJwt.verifyToken], controller.toogleCampaignState);
router.delete('/campaigns/:id', [authJwt.verifyToken], controller.deleteCampaign);

module.exports = router;