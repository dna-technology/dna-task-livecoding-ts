# How should I start
1. Clone the repository
1. `npm install`
1. Check if application is starting (`npm run dev`).
    1. Latest Node 18
1. Run tests (`npm run test`) to check if they are running.

## Scenario

Let's imagine that during the team discussion you agreed on the final solution for the infection tracker:
- Apps will internally store a list of userIds the user encountered, together with a timestamp
- the server will store a list of all infected people
- Apps can ask the server to return ids of all infected people and then do the matching on the client side.
- Apps can inform the server about a new infection.

## Task 1
Please make a code review of the currently implemented solution.

## Task 2
Add new endpoint to fetch the list of infected people. The period should be provided by the App.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Open [http://localhost:3000/documentation](http://localhost:3000/documentation) to view Swagger UI.

### `npm run test`

Run the test cases.
