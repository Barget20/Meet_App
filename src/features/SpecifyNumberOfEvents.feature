Feature: Specify the number of events

Scenario: When a user has not specified a number, the default number is 32.
Given The user is on the main page of the app
When the user has not specified a number of events
Then the default number of displayed events is 32

Scenario: User can change the number of events they want to see
Given the user is on the main page of the app
When the user set a number of events they want to see in the "number of events" box
Then the number of events will be adjusted and displayed to the chosen number

