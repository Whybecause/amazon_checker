import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Container } from 'react-bootstrap';
import redirectTo from '../services/redirect';
import { login } from '../services/authService';

function Login() {
    const { register, handleSubmit } = useForm();
    const [ responseData, setResponseData ] = useState("");
    const [ redirect, setRedirect ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    if (redirect) return redirectTo;

    const onSubmit = (data) => {
        setLoading(true);
        login(data)
        .then( (response) => {
            setLoading(false);
            setRedirect(true);
            window.location.reload();
        })
        .catch( (error) => {
            setLoading(false);
            setResponseData(error.response.data.message)
        })
    }
    return (
        <Container className="h-page p-top-14vh">
            <div className=" dfjccaicfdrjcc form-bg form-border p-top-3 p-bot-3 m-top-1 m-bot-5">
                <form onSubmit={handleSubmit(onSubmit)} className="w-80">
                    <h2 className="text-center sm-padding">Login</h2>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="form-control"
                            ref={register({ required: true})}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="password"
                            className="form-control"
                            ref={register({ required: true})}  
                        />
                    </div>
                    <button
                    type="submit"
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                    disabled={loading}
                    >
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Envoyer</span>
                    </button>
                    <div>{responseData}</div>
                </form>
            </div>
        </Container>
    )
}

export default Login;