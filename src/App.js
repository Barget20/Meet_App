import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import './nprogress.css';
import WelcomeScreen from './WelcomeScreen';
import { ErrorAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: "all",
    showWelcomeScreen: undefined,
    offlineText: "",
  };

  componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (checkToken(accessToken)).error ? false: true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
    if (!navigator.onLine) {
      this.setState({
        offlineText: "You are not connected to the Internet",
      });
    } else {
      this.setState({
        offlineText: "",
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
      const { currentLocation, numberOfEvents } = this.state;
      if (location) {
        getEvents().then((events) => {
          const locationEvents = (location === 'all') ? events: 
          events.filter((event) => 
          event.location === location);
          const filteredEvents = locationEvents.slice(0, numberOfEvents);
          this.setState({
          events: filteredEvents,
          currentLocation: location,
        });
      });
    } else {
      getEvents.apply().then((events) => {
        const locationEvents =
          currentLocation === "all"
            ? events
            : events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount,
        });
      });
    }
  }; 

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />
    return (
      <div className='App'>
        {/* other components such as CitySearch, EventList, ...etc.\ */}
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
        getAccessToken={() => {getAccessToken() }} />
        <ErrorAlert text={this.state.offlineText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
