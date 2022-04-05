Feature: Show or hide an events details

Scenario: An event element is collpsed by default
Given the user has opened the app to the main page
When an event has been selected
Then the event details will be collapsed 

Scenario: User can expand an event to see its details
Given the user is shown a list of events
When the user clicks on a certain event
Then the event details will be displayed

Scenario: User can collapse an event to hide its details
Given the user has clicked on a certain event and the details are showing
When the user clicks the close button
Then the event details are hidden