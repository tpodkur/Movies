import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import App from './components/app/app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Online>
      <App />
    </Online>
    <Offline>
      <div className="offline-error">
        <Alert type="error" message={'There is no internet connection.'} />
      </div>
    </Offline>
  </React.StrictMode>
);
