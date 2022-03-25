import React, { ComponentProps, useCallback } from 'react';
// import { Redirect } from 'react-router-dom';
import { tokenService } from 'helpers';
import { Button } from '@neoflex/fastdata-ui-kit';
import { useKeycloak } from '@react-keycloak/web';


export default (props: ComponentProps<any>) => {
    const { keycloak } = useKeycloak();

    const login = useCallback(() => {
        keycloak?.login();
    }, [keycloak]);


    if(process.env.NODE_ENV === 'development') {
        // чтобы можно было авторизоваться на localhost
        console.log('Refresh');

        return (
            <div style={{ margin: '3rem' }}>
                <h1>DEV mode</h1>
                <Button onClick={login}>Login with keycloak</Button>
                OR go to: <a href={props.to}>{props.to}</a>
            </div>
        );
    }
    // используем нативный редирект чтобы браузер запросил новые js файлики
    tokenService.tokenStorage.set('lastRoute', window.location.href);

    window.location.href = props.to;

    return null;
    // return (
    //     <Redirect to={settings.DASHBOARD_PATH} />
    // );
};
