export default function reducer(state={
    date : new Date(),
    events : {},
    type : "month",
    weekDate : new Date(),
    dayDate : new Date()
}, action){
    switch(action.type){
        case "NEXT_MONTH":{
            const nextMonth = new Date(state.date.getFullYear(), state.date.getMonth()+1);
            state = {...state, date : nextMonth}
            break;
        }
        case "PREVIOUS_MONTH":{
            const previousMonth = new Date(state.date.getFullYear(), state.date.getMonth() - 1);
            state = {...state, date : previousMonth}
            break;
        }
        case "SET_CALENDAR_TYPE":{
            state = {...state, type : action.payload}
            break;
        }
        case "NEXT_WEEK":{
            var firstDay = new Date(state.weekDate);
            var nextWeek = new Date(firstDay.getTime() + 6 * 24 * 60 * 60 * 1000);
            state = {...state, weekDate : nextWeek}
            break;
        }
        case "PREVIOUS_WEEK":{
            var firstDay = new Date(state.weekDate);
            var previousWeek = new Date(firstDay.getTime() - 6 * 24 * 60 * 60 * 1000);
            state = {...state, weekDate : previousWeek}
            break;
        }
        case "NEXT_DAY":{
            var firstDay = new Date(state.dayDate);
            var nextDay = new Date(firstDay.getTime() + 1 * 24 * 60 * 60 * 1000);
            state = {...state, dayDate : nextDay}
            break;
        }
        case "PREVIOUS_DAY":{
            var firstDay = new Date(state.dayDate);
            var previousDay = new Date(firstDay.getTime() - 1 * 24 * 60 * 60 * 1000);
            state = {...state, dayDate : previousDay}
            break;
        }
        case "SET_EVENTS":{
            state = {...state, events : action.payload}
            break;
        }
    }
    return state;
}