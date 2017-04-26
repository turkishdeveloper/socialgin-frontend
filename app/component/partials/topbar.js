import React from "react";

export default class Topbar extends React.Component {
    constructor(){
        super();
        this.state = {
            open_user : false
        }
    }
    open_dropdown(){
        this.setState({
            open_user : !this.state.open_user
        })
    }
    render() {
        const that = this;
        return (
            <div className="topbar">
                <div className="container">
                    <div className="logo-area">
                        <img class="logo" src="/public/img/icon.svg" alt="" />
                    </div>
                    <div className="user-area">
                        <a onClick={that.open_dropdown.bind(that)}>
                            <img className="profile-image" src="/public/img/default_profile.png" alt=""/>
                            Muhammed Furkan AYDIN
                            <svg viewBox="0 0 24 24">
                                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                            </svg>
                        </a>
                        <div className={that.state.open_user ? "dropdown active" : "dropdown"}>
                            <ul>
                                <li>
                                    Settings
                                </li>
                                <li>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}