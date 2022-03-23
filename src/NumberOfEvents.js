import React, { Component } from 'react';

class NumberOfEvents extends Component {
	state = {
			numberOfEvents: '32',
			eventCount: 32,
	};
		
	handleInputChange = (event) => {
		const value = event.target.value;
		this.setState({
			numberOfEvents: value,
		});
	};

    render() {
			const { eventCount } = this.state;
      return (  
        <div className='NumberOfEvents'>
            <input type="number"
				onChange={this.handleInputChange} 
				value={eventCount}
				className="numberOfEvents"/>
        </div>
		);
    }
}    

export default NumberOfEvents;