// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './app.jsx';
// import {AuthProvider} from './app/Context/auth';

// ReactDOM.render(<AuthProvider><App/></AuthProvider>, 
//     document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import { AuthProvider } from './app/Context/auth';

const root = document.getElementById('root');
const rootContainer = ReactDOM.createRoot(root);
rootContainer.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);