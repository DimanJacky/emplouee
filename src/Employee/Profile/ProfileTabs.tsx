import React, { ComponentProps } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import classNames from 'classnames';
import css from './tabs.module.scss';


export default ({ id }: ComponentProps<any>) => {
    return (
        <nav className={css.tabs}>
            <Link to={'/employee/' + id} className={classNames(useRouteMatch('/employee/:id')?.isExact && css.active)}>Общая информация</Link>
            {/*<Link to={'/employee/' + id  + '/timesheet'} className={classNames(useRouteMatch('/employee/:id/timesheet')?.isExact && css.active)}>Время</Link>*/}
        </nav>
    );
};
