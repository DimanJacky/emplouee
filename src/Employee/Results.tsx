import React, { ComponentProps, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'configStore';
import { Link } from 'react-router-dom';
import {
    IconEmail, IconTeams,
    Table, TableCell, TableHeader, TableRow,
    Tooltip,
    Typography
} from '@neoflex/fastdata-ui-kit';
import { Loader, IconSort } from '@neoflex/psa-ui-shared';
import { businessEntity } from 'helpers';
import css from './results.module.scss';
import classNames from 'classnames';
import actions from './actions';


type OrderBy = {
    [key: string]: string
}


const Results = ({ ...props }: ComponentProps<any>) => {
    const dispatch = useDispatch();
    const initialOrderBy: OrderBy = { 'lastName': 'asc' };
    const [orderedBy, setOrderedBy] = useState(initialOrderBy);
    const employee = useSelector((state: RootState) => state.employee);

    const sortBy = (field: string, desc: boolean = false) => {
        setOrderedBy({ [field]: desc ? 'desc' : 'asc' });
        dispatch(actions.sortUsers(employee, field, desc));
    };

    return (
        <>
            {props.loading ? <Loader inline /> :
                <div className={css.results}>

                    {
                        (props.isSearchData || !props.isValid) &&
                        <Typography type="h4">Результаты поиска</Typography>
                    }
                    {
                        props.isSearchData ?
                            employee.length ?
                                (
                                    <Fragment>
                                        <Typography type="h3">Найдено сотрудников: {employee.length}</Typography>
                                        <Table cells={8} className={css.table}>
                                            <TableRow>
                                                <TableCell colspan={7} className={css.headerTop}>
                                                    <Typography type="h3">Список сотрудников</Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableHeader className={classNames(css.header, css.background)}>
                                                <TableCell colspan={3}>
                                                    ФИО
                                                    <IconSort fieldName="lastName" sortBy={sortBy} orderedBy={orderedBy} />
                                                </TableCell>
                                                <TableCell colspan={2}>
                                                    Грейд
                                                    <IconSort fieldName="position" sortBy={sortBy} orderedBy={orderedBy} />
                                                </TableCell>
                                                <TableCell colspan={2}>
                                                    Роль в компании
                                                    <IconSort fieldName="companyRole" sortBy={sortBy} orderedBy={orderedBy} />
                                                </TableCell>
                                                <TableCell colspan={2}>
                                                    Специализация
                                                    <IconSort fieldName="specialization" sortBy={sortBy} orderedBy={orderedBy} />
                                                </TableCell>
                                                <TableCell colspan={2}>
                                                    Подразделение
                                                    <IconSort fieldName="businessEntity" sortBy={sortBy} orderedBy={orderedBy} />
                                                </TableCell>
                                                <TableCell colspan={2}>
                                                    Филиал
                                                    <IconSort fieldName="location" sortBy={sortBy} orderedBy={orderedBy} />
                                                </TableCell>
                                                <TableCell />

                                            </TableHeader>
                                            {

                                                employee.map((user: any, key: number) => {
                                                    return (
                                                        <TableRow key={key}>
                                                            <TableCell colspan={3}>
                                                                <Link to={'/employee/' + user.id}>{user.lastName} {user.firstName} {user.patronymic}</Link>
                                                            </TableCell>
                                                            <TableCell colspan={2}>{user.position}</TableCell>
                                                            <TableCell colspan={2}>{user.companyRole}</TableCell>
                                                            <TableCell colspan={2}>{user.specialization}</TableCell>
                                                            <TableCell colspan={2}>{businessEntity(user.businessEntity, user.employeeDepartment, user.group)}</TableCell>
                                                            <TableCell colspan={2}>{user.location}</TableCell>
                                                            <TableCell className={css.actions}>
                                                                <Tooltip title="Написать на email"><a href={'mailto:' + user.email} target="_blank"><IconEmail /></a></Tooltip>
                                                                <Tooltip title="Написать в MS Teams"><a href={'https://teams.microsoft.com/l/chat/0/0?users=' + user.email} target="_blank"><IconTeams /></a></Tooltip>
                                                            </TableCell>
                                                        </TableRow>

                                                    );
                                                })
                                            }
                                        </Table>
                                    </Fragment>
                                ) :
                                <Typography type="h3">Ничего не найдено. Повторите попытку</Typography> :
                            !props.isValid ?
                                <Typography type="h3">Ничего не найдено. Задайте значение в одном из фильтров</Typography> :
                                null
                    }
                </div>}
        </>
    );
};

export default Results;
