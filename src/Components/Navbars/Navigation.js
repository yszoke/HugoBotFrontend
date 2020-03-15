import React, {Component} from "react";

import Navbar from "react-bootstrap/Navbar";
import {Link, Router} from "react-router-dom";

import History from "../../History";

import UserContext from '../../contexts/userContext';

import '../../resources/style/colors.css';
import Login from "../Login/Login";
import {login} from "../../services/authService";

class Navigation extends Component{

    handleSubmit =  () => {
        this.context.setUser(null)
    };


    render(){
        return(
            <Router history={History}>
                <Navbar fixed={"top"} className={"bg-hugobot"} variant={"dark"}>
                    <div className={"navbar navbar-left"}>
                        <Link to={"/"}>
                            <i className="fas fa-home"/> Home &nbsp;
                        </Link>
                        <Link to={"/Tutorial"}>
                            <i className="fas fa-book-open"/> Tutorial
                        </Link>
                    </div>
                    <div className={"row justify-Content-center"}>
                        <Navbar.Brand>
                            <Link to={"/"}>
                                <h4>HugoBot</h4>
                            </Link>
                        </Navbar.Brand>
                    </div>
                    <div className={"navbar navbar-right"}>
                        <UserContext.Consumer>
                            {({user}) => {
                                if (user) {
                                    return (
                                        <>
                                            <Link to={"/Manage"} >
                                                <i className="fas fa-user-lock"/> Account &nbsp;
                                            </Link>
                                            <Link to={"/Login"} onClick={this.handleSubmit}>
                                                <i className="fas fa-sign-out-alt"/> Sign Out
                                            </Link>
                                        </>
                                    );
                                }

                                return (
                                    <>
                                        <Link to={"/Register"}>
                                            <i className="fas fa-user-plus"/> Sign Up &nbsp;
                                        </Link>
                                        <Link to={"/Login"}>
                                            <i className="fas fa-sign-in-alt"/> Sign In
                                        </Link>
                                    </>
                                )
                            }}
                        </UserContext.Consumer>
                    </div>
                </Navbar>
            </Router>
        );
    }
}

Navigation.contextType = UserContext;
export default Navigation;