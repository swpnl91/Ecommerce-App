import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";

import { positions, transitions, Provider as AlertProvider } from "react-alert";    // Provider imported as AlertProvider because we already have a Provider below
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,   // 5000ms - it shows the alert message for 5000ms
  position: positions.BOTTOM_CENTER,   // where to position the message
  transition: transitions.SCALE,
};


ReactDOM.render(
  <Provider store={store}>
    {/* Basically allows us to us 'Alert' anywhere in the app or in its child components */}
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);