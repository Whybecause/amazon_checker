import React from 'react';
import CampaignBox from '../CampaignBox';

const AllCampaignsWrapper = () => {
    return (
        <CampaignBox
        url="/api/campaigns/all"
        />
    )
}

export default AllCampaignsWrapper;