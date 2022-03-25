import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import { AppBar, SubMenu, Loader } from '@neoflex/psa-ui-shared';
import { RootState } from './configStore';
import PrivateRoute from './privateRoute';
import settings from './settings';
import Dashboard from './Employee';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import Error from 'components/Error';


type Id = {
    id: string
}

const Routes = () => {
    const id = useRouteMatch<Id>(settings.DASHBOARD_PATH + '/:id')?.params?.id;
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const userAppBar = {
        id: userInfo.id,
        name: `${userInfo.lastName} ${userInfo.firstName}`,
    };

    const navLinks = [
        {
            link: settings.EMPLOYEE_PATH,
            label: 'Сотрудники',
            isActive: !!useRouteMatch(settings.EMPLOYEE_PATH),
        },
        {
            link: settings.PROJECT_PATH,
            label: 'Проекты',
            isActive: !!useRouteMatch(settings.PROJECT_PATH),
        },
        {
            link: settings.REPORT_PATH,
            label: 'Отчеты',
            isActive: !!useRouteMatch(settings.REPORT_PATH),
        },
    ];

    const navLinksSubmenu = [
        {
            link: settings.DASHBOARD_PATH,
            label: 'Поиск по сотрудникам',
            isActive: useRouteMatch(settings.DASHBOARD_PATH)?.isExact,
        },
    ];


    if(useRouteMatch(settings.DASHBOARD_PATH + '/:id'))
        navLinksSubmenu.push({
            link: settings.DASHBOARD_PATH + '/' + id,
            label: 'Данные сотрудника',
            isActive: true,
        });

    const { initialized } = useKeycloak();

    if(!initialized)
        return <Loader />;


    return (
        <>
            <div className="sticky">
                <AppBar user={userAppBar} navLinks={navLinks} />
                <SubMenu navLinks={navLinksSubmenu} />
            </div>
            <div className="page-container">
                <Switch>
                    <PrivateRoute path={settings.DASHBOARD_PATH} component={Dashboard} />
                    <Route path="/login" component={Login} exact />
                    <Route path="/logout" component={Logout} exact />
                    {/* render 404 */}
                    <Route render={() => <Error status={404} statusText="Page not found" />} />
                    {/* or redirect to dashboard */}
                    <Redirect to={settings.DASHBOARD_PATH} />
                </Switch>
            </div>
        </>
    );
};


export default Routes;
