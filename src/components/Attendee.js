import React from 'react';

const Attendee = props => {
    if((!props.showGoing && props.rsvps.response === "yes") || 
        !props.showWaitList && props.rsvps.response !== "yes") {
            return null;
        }
    return (
        <div className="Attendee__wrap">
            <img className="Attendee__photo" src={props.rsvps.member.photo ? props.rsvps.member.photo.photo_link : null}/>
            <div>
                <h4 className="Attendee__no-margin">{props.rsvps.member.name}</h4>
                <div>Status: {props.rsvps.response === "yes" ? "Going" : "Wait List"}</div>
            </div>
        </div>
    )
}

export default Attendee;