import React from 'react';
import ReactDOM from 'react-dom/client';
import moment from 'moment';
import 'moment/locale/uk';
// import './App.css';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';

moment.locale('uk');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);