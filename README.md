This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# TODO

1. Create a User Profile Completition page; this is where users will enter their franchise and locations the first time they login. This data
   will be pushed to a DynamoDB table called "UserLocations"; which stores their emails, franchise name, and all associated locations (with geolocation data for the Google Maps).
   By storing the geolocation, we won't have to make API calls to Google to get the Latitude and Longitude everytime we render the Map, so we will save money.
2. Make our own Login page (using the AWS Cognito HOC - the "withAuthenticator" wrapper or similar).
3. Make our own Navbar (or Sidebar, whatever we think looks best) that allows the User to modify their locations, manage their account, and logout.
4. When our clients have many locations, it may be more convenient to have a feature that enables them to view their locations as a list instead of cards (so they don't have to scroll so much).
5. We may want to look into website cookies that would help with bringing up data quicker; there may be better ways to view data for each location than just querying it everytime we render the table component; maybe we can render the data for all storage types when they click the location, and then it stores it for that session - maybe the cookies are stored up to a certain time or until the user logouts/closes the application.
6. Optimize the code and comment stuff that is not clear
