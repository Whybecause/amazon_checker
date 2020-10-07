import React from "react";
import { useCampaigns } from "../hooks/useCampaigns";
import { useBuybox } from "../hooks/useBuybox";
import { Container } from "react-bootstrap";

let url = "/api/campaigns/all"

const Buybox = () => {
    const {campaigns} = useCampaigns(url);
    const {checkBuybox, buyboxMsg, buyboxMsgSuccess, buyboxLoading} = useBuybox(campaigns);

    React.useEffect(() => {
        checkBuybox()
    }, [campaigns]);

    return (
        <Container>
            {buyboxLoading && <div className="spinner-svg c-flex1"></div>}
            {buyboxMsg && (
                <div className="text-center">
                    <p>{buyboxMsg.length} campaign unchanged</p>
                    {buyboxMsg.map( (bbMsg, index) => (
                        <p key={index}>{bbMsg}</p>
                        ))}
                </div>
            )}   
            {buyboxMsgSuccess && (
                <div className="text-center">
                    <a href="/campaigns" className="btn btn-success">See {buyboxMsgSuccess.length} changes</a>
                    {buyboxMsgSuccess.map ( (successMsg, index) => (
                        <p key={index}>{successMsg}</p>
                    ))}
                </div>
            )}
        </Container>
    )
}

export default Buybox;