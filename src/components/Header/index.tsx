import React, { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import classNames from 'classnames';
import { RootState } from 'configStore';
import settings from 'settings';
import { IconSignOut, IconSearch } from '@neoflex/fastdata-ui-kit';
import NativeLink from 'components/NativeLink';
import logo from 'assets/images/logo-white.png';
import css from './header.module.scss';


const Image = React.memo(() => {
    return <img src={logo} />;
});

const Header = (props: ComponentProps<any>) => {
    // TODO вынести шапку вне Switch
    return (
        <div className={css.sticky}>
            <header className={css.header}>
                <div className={classNames(css.wrapper, 'page-size')}>
                    <a href="/" className={css.logo}><Image /></a>
                    <nav className={css.navigation}>
                        <NativeLink className={classNames(useRouteMatch(settings.DASHBOARD_PATH) && css.active)} to={settings.DASHBOARD_PATH}>Сотрудники</NativeLink>
                        <NativeLink to="/project">Проекты</NativeLink>
                        <NativeLink to="/report">Отчеты</NativeLink>
                    </nav>
                    <div className={css.toolbar}>
                        <Link to="/search" className={css.search}><IconSearch /></Link>
                        <Link to={'/employee/' + props.id} className={css.login}>{props.firstName} {props.lastName}</Link>
                        <NativeLink to="/logout" className={css.signout}><IconSignOut /></NativeLink>
                    </div>
                </div>
            </header>

            <div className={css.submenu}>
                <nav className={classNames(css.navigation, 'page-size')}>
                    <Link className={classNames(useRouteMatch(settings.DASHBOARD_PATH)?.isExact && css.active)} to={settings.DASHBOARD_PATH}>Поиск по сотрудникам</Link>
                    { useRouteMatch(settings.DASHBOARD_PATH + '/:id') ?
                        <Link className={classNames(css.active)}  to={settings.DASHBOARD_PATH}>Данные сотрудника</Link>
                        : null
                    }
                </nav>
            </div>
        </div>
    );
};

export default connect(
    (state: RootState) => state.auth,
)(Header);
