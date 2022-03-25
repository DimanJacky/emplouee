import React, { Fragment, useEffect } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import { RootState } from 'configStore';
import settings from 'settings';
import actionTypes from 'actionTypes';
import { Loader } from '@neoflex/psa-ui-shared';
import Refresh from 'components/Refresh';
import actions from 'actions';


interface PrivateRouteParams extends RouteProps {
    component:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>,
    path?: string,
};


export default (props: PrivateRouteParams) => {
    const {
        component: Component,
        ...rest
    } = props;

    const { loading } = useSelector((state: RootState) => state.auth);
    const { keycloak, initialized } = useKeycloak();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({
            type: actionTypes.LOGIN,
            payload: { token: keycloak.token }
        });
    }, [keycloak.token]);


    useEffect(() => {
        if(!initialized)
            return;

        if(!keycloak.authenticated) {
            dispatch({
                type: actionTypes.AUTH_SET_LOADING,
                payload: false
            });

            return;
        }

        keycloak.onTokenExpired = () => {
            keycloak.updateToken(50);
        };

        (async () => {
            const userInfo = await keycloak.loadUserInfo()
                .then((data) => data);

            await actions.getUserInfo(userInfo)
                .then((response: any) => response.json())
                .then((userInfo: any) => {
                    dispatch({
                        type: actionTypes.AUTH_SET_LOADING,
                        payload: false
                    });

                    dispatch({
                        type: actionTypes.LOGIN,
                        payload: { token: keycloak.token, userInfo }
                    });
                }).catch(() => {
                    dispatch({
                        type: actionTypes.AUTH_SET_LOADING,
                        payload: false
                    });

                    dispatch({
                        type: actionTypes.APP_SET_ERROR,
                        payload: {
                            status: 403,
                            statusText: 'Forbidden',
                            description: 'Не могу получить данные о пользователе'
                        }
                    });
                });

        })();
    }, [keycloak.authenticated]);


    return (
        loading || !initialized ?
            <Loader /> :
            <Fragment>
                <Route {...rest} render={props => (
                    keycloak.authenticated ?
                        <Component {...props} /> :
                        <Refresh to={settings.LOGIN_URL} />
                )} />
            </Fragment>
    );
};


