import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import mgLogoSm from ".././images/mgLogoSm.png"
import '.././layout/Layout.css'

export default function Login() {
    const navigate = useNavigate();
    const { login } = useContext(UserProfileContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login({ email, password })
            .then(r => {
                if (r) {
                    navigate("/")
                }
                else {
                    alert("Invalid email or password")
                }
            })
    };

    return (
        <div className="loginContent">
            {/* <p className="hdr">Mosaic <span className="hdrSpan">Gallery</span></p> */}
            <img src={mgLogoSm} alt="Mosaic Gallery" className="loginLogo" />
            <br />
            <Form onSubmit={loginSubmit}>
                <fieldset>
                    <FormGroup className="loginInputFields">
                        <Label for="email" hidden>Email</Label>
                        <Input id="email" type="text" placeholder="Email"
                            onChange={e => setEmail(e.target.value)}/>
                    </FormGroup>
                    <FormGroup className="loginInputFields">
                        <Label for="password" hidden>Password</Label>
                        <Input id="password" type="password" placeholder="Password"
                            onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <button type="button" className="loginBtn" onClick={loginSubmit}>Login</button>
                    </FormGroup>
                    <p className="registerLink">
                        <em>
                            Not registered? <Link to="/register">Register</Link>
                        </em>
                    </p>
                </fieldset>
            </Form>
        </div>
    );
}