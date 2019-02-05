import React from 'react';

const ScrollHeader = props => {
    const {
        link,
        name,
     } = props.info;
    return (
        <div className={"Info__scroll-sticky "+ props.displayClass} >
            {/* <div style={{height: props.scrollHeight}} className="Info__hero-img Info__hero-img--scroll"></div> */}
            <div ref={props.scrollRef} className="Info__scroll-wrap">
                    <h1>{name}</h1>
                    <a href={link} target="_blank">
                    <button className="Info__event-button Info__event-button--scroll">
                        Attend
                    </button></a>
            </div>
        </div>
    )
}

export default ScrollHeader;