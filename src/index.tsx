import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { store } from 'configStore';
import { history, tokenService } from 'helpers';
import { Loader } from '@neoflex/psa-ui-shared';
import Routes from './routes';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { I18nextProvider } from 'react-i18next';
import i18n from 'helpers/i18n';
import keycloak from './keycloak';

import 'assets/scss/root.module.scss';


ReactDOM.render(
    <React.StrictMode>
        <ReactKeycloakProvider
            authClient={keycloak}
            onTokens={({ token }) => {
                tokenService.tokenStorage.setAccessToken(token ?? '');
            }}>
            <Provider store={store}>
                <Router history={history}>
                    <I18nextProvider i18n={i18n}>
                        <Suspense fallback={<Loader />}>
                            <Routes />
                        </Suspense>
                    </I18nextProvider>
                </Router>
            </Provider>
        </ReactKeycloakProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
