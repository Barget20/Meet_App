import React, { Component } from 'react';

class Event extends Component {
    state = { collapsed: true};

render() {
    const { event } = this.state;
    const { collapsed } = this.state;
    const handleClick = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    return (
        <div className='event'>
             {/* this was deleted in event.test.js */}
            {/* <h1 className='summary'>{event.summary}</h1> */}
            <h2 className='location'>{event.location}</h2>
            <p className='start-date'>
                {new Date(event.start.dateTime).toString()}
            </p>
            <button className='show-details' onClick={handleClick}>
                {!collapsed ? "Hide" : "Show Details"}
            </button>
            {!collapsed && (
                <p className='event-description'>
                    {event.description}
                </p>
            )}
        </div>
        ); 
    }
}

export default Event;