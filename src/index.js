import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './hoc/Layout/Layout';
import reportWebVitals from './reportWebVitals';
import { UserState } from './store/user/UserState';
import './styles/app.scss';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn: "https://b0c70e47a9b7454db0046b1d008b8d89@o570840.ingest.sentry.io/5718240",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <UserState>
      <Layout />
    </UserState>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
