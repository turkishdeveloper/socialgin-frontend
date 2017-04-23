import React from "react";

import { Route } from "./../../actions/routerActioıns";
import { connect } from "react-redux";

@connect(store=>{
    return {
        page : store.Router.page
    }
})
export default class Sidebar extends React.Component {
    constructor(){
        super();
        this.state = {
            toggle : false
        }
    }
    changePage(e){
        if(e.target.nodeName == "LI"){
            var page = "/" + e.target.dataset.page;
            this.props.dispatch(Route(page))
            history.pushState(null, null, page);
        }else if(e.target.parentElement.nodeName == "LI"){
            var page = "/" + e.target.parentElement.dataset.page;
            history.pushState(null, null, page);
            this.props.dispatch(Route(page))
        }else if(e.target.parentElement.parentElement.nodeName == "LI"){
            var page = "/" + e.target.parentElement.parentElement.dataset.page;
            history.pushState(null, null, page);
            this.props.dispatch(Route(page))
        }else if(e.target.parentElement.parentElement.parentElement.nodeName == "LI"){
            var page = "/" + e.target.parentElement.parentElement.parentElement.dataset.page;
            this.props.dispatch(Route(page))
            history.pushState(null, null, page);
        }
    }
    logout(){
        window.location.href = "/logout";
    }
    componentWillMount(){
        this.props.dispatch(Route(window.location.pathname))
    }
    render() {
        return (
            <div className={this.state.toggle ? "left-menu animate" : "left-menu"}>
                <div class="menu-toggle">
                    <div class="open" onClick={(_=>{this.setState({toggle : !this.state.toggle})}).bind(this)}>
                        <i class="fa fa-bars"></i>
                    </div>
                    <div class="close" onClick={(_=>{this.setState({toggle : !this.state.toggle})}).bind(this)}>
                        <i class="fa fa-ellipsis-v"></i>
                    </div>
                </div>
                <div class="menu-content">
                    <ul>
                        <li onClick={this.changePage.bind(this)} data-page="dashboard" className={this.props.page === "/dashboard" ? "active" : false}>
                            <div class="menu-item">
                                <div class="icon">
                                    <i class="fa fa-paper-plane-o"></i>
                                </div>
                                <div class="title">
                                    Dashboard
                                </div>
                            </div>
                        </li>
                        <li class="bottom" onClick={this.logout.bind(this)}>
                            <div class="menu-item">
                                <div class="icon">
                                    <i class="fa fa-sign-out"></i>
                                </div>
                                <div class="title">
                                    Logout
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
