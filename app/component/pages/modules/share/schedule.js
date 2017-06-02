import React from "react";
import Moment from "moment";

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { connect } from "react-redux";

import {setDate} from "./../../../../actions/shareActions";

@connect(store=>{
    return {
        date : store.Share.date
    }
})


export default class Schedule extends React.Component {
    constructor(){
        super();
        this.state = {
            time_zone : "AM"
        }
    }
    select_day(day){
        this.props.dispatch(setDate(day))
    }
    render() {
        const that = this;
        return (
            <div className="schedule animated fadeIn">
                <div className="timer">
                    <div className="time-selecter">
                        <div className="time-select-area">
                            <select className="material-input">
                                {(_=>{
                                    let options = []
                                    for(let i=1; i<=12; i++){
                                        if(i<10) i = "0" + i;
                                        options.push(<option key={i} value={i}>{i}</option>)
                                    }
                                    return options
                                })()}
                            </select>
                            <span className="sapirate">:</span>
                            <select className="material-input">
                                {(_=>{
                                    let options = []
                                    for(let i=0; i<=59; i++){
                                        if(i<10) i = "0" + i;
                                        options.push(<option key={i} value={i}>{i}</option>)
                                    }
                                    return options
                                })()}
                            </select>
                        </div>
                        <div className="am-pm">
                            <div onClick={(_=>{that.setState({time_zone : "AM"})}).bind(that)} className={this.state.time_zone == "AM" ? "time-zone animated fadeIn active" : "time-zone"}>
                                AM
                            </div>
                            <div onClick={(_=>{that.setState({time_zone : "PM"})}).bind(that)} className={this.state.time_zone == "PM" ? "time-zone animated fadeIn active" : "time-zone"}>
                                PM
                            </div>
                        </div>
                    </div>
                    <label><input type="checkbox" name="checkbox" value="value" />Email me when message is sent</label>
                </div>
                <div className="calendar-area">
                    <DayPicker selectedDays={that.props.date} onDayClick={day => that.select_day(day)} />
                </div>
            </div>
        );
    }
}
