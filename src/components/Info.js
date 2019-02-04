import React from 'react';
import moment from 'moment';
import renderHTML from 'react-render-html';
import Fab from '@material-ui/core/Fab';
import { formatTime } from '../accessories/helpers';

const Info = props => {

    let {
           description,
           link,
           local_date,
           local_time,
           name,
           venue
        } = props.meetup;

        local_time = formatTime(local_time);
        
    return (
        <div>
            <div style={{height: props.heroHeight}} className="Info__hero-img"></div>
            <div ref={props.heroRef} className="Info__head-wrap Info__flex-center">
                    <h1>{name}</h1>
                    <h3 className="Info__meet-time">{moment(local_date).format('MMMM Do YYYY')} at {local_time}</h3>
                    <p className="Info__address">{venue ? venue.name : ''}</p>
                    <p className="Info__address">{venue ? venue.address_1 : ''}</p>
                    <p className="Info__address">{venue ? venue.address_2 : ''}</p>
                    <a href={link} target="_blank"><button className="Info__event-button">Attend</button></a>
            </div>
            <div className="Info__gray-wrap">
                <h2 className="Info__subtitle">Description</h2>
                <div className="Info__description">{renderHTML(props.meetup.description)}</div>
            </div>
        </div>
    )
}

export default Info;