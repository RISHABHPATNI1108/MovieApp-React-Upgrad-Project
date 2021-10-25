import React from "react";
import "./Header.css"
import {Button} from "@material-ui/core";
import LOGO from "../../assets/logo.svg"

const Header=(props)=>{
    return(
        <div className="container">
            <img src={LOGO} className={"logo rotate"}/>

            <div className={"buttonContainer"}>

                <Button variant={"contained"} color={"primary"} className={"buttonBookShow"}>
                    Book Show
                </Button>

            <Button variant={"contained"} className={"buttonLogin"}>
                Login
            </Button>
            </div>
        </div>
    )
}

export default Header
