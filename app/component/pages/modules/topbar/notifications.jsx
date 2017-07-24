import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import cookier from "../../../../../public/js/cookier";

import Config from "./../../../../config";
import {Route} from "./../../../../actions/routerActioıns";
@connect(store=>{
    return {
        accounts : store.User.list
    }
})
export default class Notifications extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded : false,
      notifications : []
    }
  }
  routeNotifications(){
    const that = this;
    that.props.dropdownNotification()
    that.props.dispatch(Route("Notifications"))
  }
  componentWillMount(){
    const that = this;
    const user_data = cookier.parse("token");
    if(!user_data) return window.location.href = "/";
    // skip, start, end kosullari da var !
    axios.get(Config.getNotifications, {
      params: {
        n : 10,
        skip : 0,
        unreadonly : false,
        token : user_data
      }
    }).then(data=>{
      console.log("Beta : ", data.data)
      const res = data.data;
      if(res.error){
                if(res.err_id != "-1"){
                    swal({
                        title: "Beta error occured \n Code : " + res.err_id,
                        text: "Please copy this code and contact us.",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "rgba(52, 152, 219,1.0)",
                        confirmButtonText: "Copy",
                        closeOnConfirm: false
                    },function(){
                        var textField = document.createElement('textarea')
                        textField.innerText = res.err_id;
                        document.body.appendChild(textField)
                        textField.select()
                        document.execCommand('copy')
                        textField.remove()
                        swal("Copied!", "Please contact us using this email : beta@socialgin.com", "success");
                    });
                }else{
                    swal("Somethings wrong with your accounts.", res.error || "Please contact us.", "error");
                }
            }
      that.setState({
        loaded : true,
        notifications : res
      })
    }).catch(err=>{
      console.log("Beta : ", err)
    })
  }
  render() {
    const that = this;
    return (
      <div className={"nutification-area animated fadeIn"}>
        <div className="top-notifications">
          <span>Notifications</span>
          <svg viewBox="0 0 24 24" onClick={that.props.dropdownNotification}>
            <path
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </div>
        <div className="notifications-content">
          {(_=>{
            if(that.state.loaded){
              if(that.state.notifications.length == 0){
                return (
                  <div className="notify">
                    <p className="not">There is no notification.</p>
                  </div>
                )
              }else {
                return that.state.notifications.map(notification=>{
                  let date = new Date(notification.date * 1000);
                  return (
                    <div className="notify" key={window.keyGenerator()}>
                      <p className="not">
                        {notification.message}
                        {(_=>{
                          if(notification.additional && notification.additional.accounts && notification.additional.accounts.length > 0){
                            const accounts = [];
                            for(var i=0; i<notification.additional.accounts.length; i++){
                              if(i === notification.additional.accounts.length - 1){
                                accounts.push(
                                  <strong key={window.keyGenerator()}>
                                    {" by "}
                                    {(_=>{
                                      if(that.props.accounts[notification.additional.accounts[i].id]){
                                        return that.props.accounts[notification.additional.accounts[i].id].name + " " + that.props.accounts[notification.additional.accounts[i].id].surname + "."
                                      }else{
                                        return "Deleted Account" + "."
                                      }
                                    })()}
                                  </strong>
                                )
                              }else{
                                accounts.push(
                                  <strong key={window.keyGenerator()}>
                                     {" by "}
                                    {(_=>{
                                      if(that.props.accounts[notification.additional.accounts[i].id]){
                                        return that.props.accounts[notification.additional.accounts[i].id].name + " " + that.props.accounts[notification.additional.accounts[i].id].surname + ", "
                                      }else{
                                        return "Deleted Account" + ", "
                                      }
                                    })()}
                                  </strong>
                                )
                              }
                            }
                            return accounts
                          }else if(notification.additional && notification.additional.account_id){
                            return (
                                  <strong key={window.keyGenerator()}>
                                     {". "}
                                    {(_=>{
                                      if(that.props.accounts[notification.additional.account_id]){
                                        return that.props.accounts[notification.additional.account_id].name + " " + that.props.accounts[notification.additional.account_id].surname
                                      }else{
                                        return "Deleted Account" + "."
                                      }
                                    })()}
                                  </strong>
                            )
                          }
                        })()}
                      </p>
                      <span className="date">{date.getDate()}.{date.getMonth()}.{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</span>
                    </div>
                  )
                })
              }
            }else{
              return(
                <div className="content-loader">
                  <div className="loader"></div>
                </div>
              )
            }
          })()}

        </div>
        <div className="notifications-footer">
          <button className="btn red" onClick={that.routeNotifications.bind(that)}>
            Wiew all notifications
          </button>
        </div>
      </div>
    );
  }
}
