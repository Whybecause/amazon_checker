const express = require ('express');
const router = express.Router();
const controller = require('../controllers/campaign.controller');

router.post('/campaigns', controller.createCampaign);
router.get('/campaigns', controller.getCampaigns);
router.patch('/campaigns/:id', controller.toogleCampaignState);
router.delete('/campaigns/:id', controller.deleteCampaign);

module.exports = router;