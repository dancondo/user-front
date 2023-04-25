# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Folder structure

In this project you can find the following folders

- [src/components](src/components/)
    - The application components.
    - Each component has its own folder, containing the component itself and the unit tests.
- [src/containers](src/containers/)
    - The application containers
    - they are different from components because they are connected to the redux global state.
    - Each container has its own folder, containing the container itself and the unit tests.
- [src/hooks](src/hooks)
    - The application custom hooks
- [src/services](src/services)
    - The application services.
    - API calls implementation.
- [src/store](src/store)
    - The application global state logic.
    - Redux related files.
- [src/types](src/types)
    - The application types.
- [src/utils](src/utils)
    - The application helper functions.

## How to Run

You'll need to have [node](https://nodejs.org/en/download) installed.

* **Install dependencies**

```bash
$ npm install
```

* **Setup envroinment files**

Copy the content of .env.exemple to a new file named .env.
If you happen to use the backend in another port, host or different protocol, please alter the REACT_APP_USERS_API_BASE_URL value.

* **Start the application**

```bash
$ npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
