import React, { useState } from "react";
import "./Header.css"
import { Button } from "@material-ui/core";
import LOGO from "../../assets/logo.svg"
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

const Header = (props) => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    const [currentState, setCurrentState] = useState({
        modalIsOpen: false,
        value: 0,
        usernameRequired: "dispNone",
        username: "",
        loginPasswordRequired: "dispNone",
        loginPassword: "",
        firstnameRequired: "dispNone",
        firstname: "",
        lastnameRequired: "dispNone",
        lastname: "",
        emailRequired: "dispNone",
        email: "",
        registerPasswordRequired: "dispNone",
        registerPassword: "",
        contactRequired: "dispNone",
        contact: "",
        registrationSuccess: false,
        loggedIn: sessionStorage.getItem("access-token") == null ? false : true
    })

    const openModalHandler = () => {
        setCurrentState({
            modalIsOpen: true,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: ""
        });
    }


    const closeModalHandler = () => {
        setCurrentState({
            ...currentState,
            modalIsOpen: false
        });
    }

    const tabChangeHandler = (event, value) => {
        setCurrentState({
            ...currentState,
            value
        });
    }

    const loginClickHandler = () => {
        currentState.username === "" ? setCurrentState({ usernameRequired: "dispBlock" }) : setCurrentState({ usernameRequired: "dispNone" });
        currentState.loginPassword === "" ? setCurrentState({ loginPasswordRequired: "dispBlock" }) : setCurrentState({ loginPasswordRequired: "dispNone" });

        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.closeModalHandler();
            }
        });

        xhrLogin.open("POST", this.props.baseUrl + "auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(currentState.username + ":" + currentState.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);
    }

    const inputUsernameChangeHandler = (e) => {
        setCurrentState({ ...currentState, username: e.target.value });
    }

    const inputLoginPasswordChangeHandler = (e) => {
        setCurrentState({ ...currentState, loginPassword: e.target.value });
    }

    const registerClickHandler = () => {
        currentState.firstname === "" ? setCurrentState({ firstnameRequired: "dispBlock" }) : setCurrentState({ firstnameRequired: "dispNone" });
        currentState.lastname === "" ? setCurrentState({ lastnameRequired: "dispBlock" }) : setCurrentState({ lastnameRequired: "dispNone" });
        currentState.email === "" ? setCurrentState({ emailRequired: "dispBlock" }) : setCurrentState({ emailRequired: "dispNone" });
        currentState.registerPassword === "" ? setCurrentState({ registerPasswordRequired: "dispBlock" }) : setCurrentState({ registerPasswordRequired: "dispNone" });
        currentState.contact === "" ? setCurrentState({ contactRequired: "dispBlock" }) : setCurrentState({ contactRequired: "dispNone" });

        let dataSignup = JSON.stringify({
            "email_address": currentState.email,
            "first_name": currentState.firstname,
            "last_name": currentState.lastname,
            "mobile_number": currentState.contact,
            "password": currentState.registerPassword
        });

        console.log("dataSignup" + dataSignup + "\n baseurl " + props.baseUrl)

        fetch(props.baseUrl + "signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: dataSignup,
        }).then((response) => response.json())
            .then((response) => {
                console.log("success" + response)
            }).catch((e) => {
                console.log("error" + e)
            });


        // let xhrSignup = new XMLHttpRequest();
        // xhrSignup.addEventListener("readystatechange", function () {
        //     if (this.readyState === 4) {
        //         setCurrentState({
        //             ...currentState,
        //             registrationSuccess: true
        //         });
        //     }
        // });


        // xhrSignup.open("POST", "http://localhost:8085" + props.baseUrl + "signup");
        // xhrSignup.setRequestHeader("Content-Type", "application/json");
        // xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        // xhrSignup.send(dataSignup);
    }

    const inputFirstNameChangeHandler = (e) => {
        setCurrentState({
            ...currentState,
            firstname: e.target.value
        });
    }

    const inputLastNameChangeHandler = (e) => {
        setCurrentState({
            ...currentState,
            lastname: e.target.value
        });
    }

    const inputEmailChangeHandler = (e) => {
        setCurrentState({
            ...currentState,
            email: e.target.value
        });
    }

    const inputRegisterPasswordChangeHandler = (e) => {
        setCurrentState({
            ...currentState,
            registerPassword: e.target.value
        });
    }

    const inputContactChangeHandler = (e) => {
        setCurrentState({
            ...currentState,
            contact: e.target.value
        });
    }

    const logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");

        setCurrentState({
            ...currentState,
            loggedIn: false
        });
    }

    return (
        <div>

            <div className="container">
                <img src={LOGO} className={"logo rotate"} />

                <div className={"buttonContainer"}>

                    <Button variant={"contained"} color={"primary"} className={"buttonBookShow"}>
                        Book Show
                    </Button>

                    <Button variant={"contained"} className={"buttonLogin"} onClick={() => openModalHandler()}>
                        Login
                    </Button>
                </div>
            </div>
            <Modal
                ariaHideApp={false}
                isOpen={currentState.modalIsOpen}
                contentLabel="Login"
                onRequestClose={() => closeModalHandler()}
                style={customStyles}
            >
                <Tabs className="tabs" value={currentState.value} onChange={(e, value) => tabChangeHandler(e, value)}>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>

                {currentState.value === 0 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" username={currentState.username} onChange={(e) => inputUsernameChangeHandler(e)} />
                            <FormHelperText className={currentState.usernameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" loginpassword={currentState.loginPassword} onChange={(e) => inputLoginPasswordChangeHandler(e)} />
                            <FormHelperText className={currentState.loginPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        {currentState.loggedIn === true &&
                            <FormControl>
                                <span className="successText">
                                    Login Successful!
                                </span>
                            </FormControl>
                        }
                        <br /><br />
                        <Button variant="contained" color="primary" onClick={() => loginClickHandler()}>LOGIN</Button>
                    </TabContainer>
                }

                {currentState.value === 1 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" type="text" firstname={currentState.firstname} onChange={(e) => inputFirstNameChangeHandler(e)} />
                            <FormHelperText className={currentState.firstnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" type="text" lastname={currentState.lastname} onChange={(e) => inputLastNameChangeHandler(e)} />
                            <FormHelperText className={currentState.lastnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="text" email={currentState.email} onChange={(e) => inputEmailChangeHandler(e)} />
                            <FormHelperText className={currentState.emailRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="registerPassword">Password</InputLabel>
                            <Input id="registerPassword" type="password" registerpassword={currentState.registerPassword} onChange={(e) => inputRegisterPasswordChangeHandler(e)} />
                            <FormHelperText className={currentState.registerPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required>
                            <InputLabel htmlFor="contact">Contact No.</InputLabel>
                            <Input id="contact" type="text" contact={currentState.contact} onChange={(e) => inputContactChangeHandler(e)} />
                            <FormHelperText className={currentState.contactRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        {currentState.registrationSuccess === true &&
                            <FormControl>
                                <span className="successText">
                                    Registration Successful. Please Login!
                                </span>
                            </FormControl>
                        }
                        <br /><br />
                        <Button variant="contained" color="primary" onClick={() => registerClickHandler()}>REGISTER</Button>
                    </TabContainer>
                }
            </Modal>l̥
        </div>
    )

}

export default Header
