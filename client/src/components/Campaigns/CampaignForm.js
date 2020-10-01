import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";

const CampaignForm = ({createCampaign}) => {
    const { register, handleSubmit } = useForm();
    return (
        <Form onSubmit={handleSubmit(createCampaign)} className="d-flex">
        <Form.Control
        type="text"
        name="campaignName"
        placeholder="Campaign Name"
        ref={register({ required: true })}
        />
        <Form.Control
        type="text"
        name="asin"
        placeholder="ASIN"
        ref={register({ required: true })}
        />
        <button className="btn btn-warning" type="submit">Create</button>
      </Form>
    )
}

export default CampaignForm;
