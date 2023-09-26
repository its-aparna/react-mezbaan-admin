import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux-config/store"
import MyProvider from './context/MasterContex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MyProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </MyProvider>
);


reportWebVitals();
