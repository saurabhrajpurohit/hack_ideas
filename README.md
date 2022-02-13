# hack_ideas

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites
- `node` : `14.17.1`
- `npm`: `6.14.13`

- Firebase is used inplace of api's to store user data and challenges and there votes.
- I am adding the .env file as well along with the zip file for testing the code locally
- Redux is used just for user state management
  - Redux state is not persist at this point of time. So, on refresh the user will be loggedout
- `Material-UI` UI component libraey is used for themeing and ui components
- `react-router` is used for route management

## To Test The App
- Install the dependencies
- Run code using `nom start` 

## Details
### Pages
- Login
    - Login page for user to login using employee ID
    - We can use the below id's to login which are preexisting in the system
      - `1001`
      - `1002`
      - `1003`
      - `1004`
- Sign Up
    - User can register themseleved in this page
    - If added already existing employee id, user will see an error
- Challenge List
    - On Successful login/sign up user is redirected to the challenges listing page
    - Challenges are sortable usign the `Vote` and `Latest` button 
      - `Vote` button will sort the list based on votes
      -  `Latest` button will sort the list based on creation date
          **note:** The date displayed in the challenge card is event date which is different from creation date
    - User can only upvote the challenge using the thumb chip located at the top right corner of each card
      - They can either upvote/remove the already added vote
    - There is a third button available beside the sort button on click of which user is redirected to `Add New Challende` page 
- Add Challenge 
    - User can fill up the details and add the challenge

- After login the user can logout from the application by using the logout button which can be accessed on click of profile icon available in the navbar

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
