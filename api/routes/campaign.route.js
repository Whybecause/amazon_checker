const express = require ('express');
const router = express.Router();
const controller = require('../controllers/campaign.controller');

router.post('/campaigns', controller.createCampaign);
router.get('/campaigns/problem', controller.getProblematicCampaigns);
router.get('/campaigns/all', controller.getAllCampaigns);
router.get('/buybox/:id', controller.getBuyBox);
router.get("/lastupdate", controller.getUpdateTime);
router.patch('/state/:id', controller.toogleCampaignState);
router.patch('/buybox/:id', controller.updateBuyBoxInDb);
router.patch("/newupdate", controller.patchUpdateTime);
router.delete('/campaigns/:id', controller.deleteCampaign);

module.exports = router;