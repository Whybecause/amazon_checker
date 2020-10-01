import React from "react";
import CampaignBox from './CampaignBox';
import { useCampaigns } from "../../hooks/useCampaigns";

const ProblemCampaign = () => {
    const { campaigns, message, error, isPending, markAsActive, createCampaign, removeCampaign, isLoading } = useCampaigns("/api/campaigns/problem");
    
    return (
        <CampaignBox 
        campaigns={campaigns}
        message={message}
        error={error}
        isPending={isPending}
        markAsActive={markAsActive}
        createCampaign={createCampaign}
        removeCampaign={removeCampaign}
        isLoading={isLoading}
        />
    )
}

export default ProblemCampaign;