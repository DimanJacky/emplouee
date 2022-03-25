import React, { ComponentProps, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Typography, Button, Input, Autocomplete } from '@neoflex/fastdata-ui-kit';
import { Paper } from 'components/Paper';
import css from './search-form.module.scss';
import actionTypes from 'actionTypes';
import actions from './actions';
import { RootState } from 'configStore';

const SearchForm = (props: ComponentProps<any>) => {
    let history = useHistory();
    let initialFormData: { [key: string]: string | number | string[] | number[] } = {};
    const dispatch = useDispatch();
    const { positions, companyRoles, specializations, businessEntities, branches, employeeDepartments } = useSelector((state: RootState) => state.app);
    const [open, setOpen] = useState(true);
    const allowedFields: { [key: string]: string | number | string[] | number[] } = {
        'fio': '',
        'position': [],
        'role': [],
        'specialization': [],
        'branch': [],
        'businessEntity': [],
        'employeeDepartment': []
    };

    const search = window.location.search;
    const params = new URLSearchParams(search);

    params.forEach((value, name) => {
        const originalName = name.replace(/\[\d+\]/, '');

        // clean request
        if(allowedFields[originalName] !== undefined) {
            if(typeof allowedFields[name] === 'number')
                initialFormData = { ...initialFormData, [name]: value.toString() };
            else if(Array.isArray(allowedFields[originalName])) {
                initialFormData = { ...initialFormData, [originalName]: value.split(',') };
            } else
                initialFormData = { ...initialFormData, [name]: value };
        }
    });

    const [formData, setFormData] = useState(initialFormData);


    const getData = (name: string) => {
        return formData.hasOwnProperty(name) ? formData[name] : '';
    };


    const setData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({ ...formData, [name]: value });
    };


    const addData = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };


    const makeSearch = async (e?: React.FormEvent<HTMLFormElement>) => {
        e && e.preventDefault();
        // удаляем все из параметров
        Object.keys(formData).map((name) => params.delete(name));

        if(formData && Object.keys(formData).length > 0) {
            Object.keys(formData).map((name: string) => {
                if(allowedFields[name] !== undefined && formData[name] !== '' && formData[name] !== 0
                    && !formData[name].toString().startsWith(' ') && JSON.stringify(formData[name]) !== '[]') {
                    if(typeof allowedFields[name] === 'number')
                        formData[name] = +formData[name];
                    else if(Array.isArray(allowedFields[name])) {
                        // make array from string 1,2
                        const asArray = formData[name].toString().split(',').filter(v => !!v);

                        formData[name] = asArray;
                    }
                } else {
                    delete formData[name];
                    props.setSearchData(false);
                    props.setIsValid(false);
                }
            });

            if(formData && Object.keys(formData).length > 0) {
                props.setLoading(true);
                await dispatch(actions.searchUsers(formData));
                props.setLoading(false);
                props.setSearchData(true);
                props.setIsValid(true);

                // добавляем все из formData в параметры
                Object.keys(formData).map((name) => {
                    params.set(name, formData[name].toString());
                });
            }
        } else {
            props.setSearchData(false);
            props.setIsValid(false);
        }

        history.push({ search: params.toString() });
        // @ts-ignore
        for(const value of params.values()) {
            if(value)
                setOpen(false);
        }
    };


    const formReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFormData({});
        dispatch({
            type: actionTypes.EMPLOYEE_SET_LIST,
            payload: [],
        });

        Object.keys(formData).map((name) => params.delete(name));
        history.push({ search: params.toString() });
    };

    return (
        <Paper className={css.paper}>
            <div className={css.header} onClick={() => setOpen(!open)}>
                <Typography type="h3" className={css.title}>Поиск</Typography>
                <a role="button">{ open ? 'Свернуть' : 'Развернуть'}</a>
            </div>
            <div className={classNames(css.body, (open && css.open))}>
                <form onSubmit={makeSearch}>
                    <Input
                        label="ФИО"
                        name="fio"
                        fullWidth
                        withError={false}
                        placeholder="Иванов Иван Иванович"
                        value={getData('fio')}
                        onChange={setData} />
                    <div className={css.row}>
                        <Autocomplete
                            label="Грейд"
                            name="position"
                            multiple
                            fullWidth
                            withError={false}
                            value={getData('position')}
                            onChange={(name: string, value: string) => addData(name, value)}
                            options={positions}
                            placeholder="Все" />
                        <Autocomplete
                            label="Роль в компании"
                            name="role"
                            multiple
                            fullWidth
                            withError={false}
                            value={getData('role')}
                            onChange={(name: string, value: string) => addData(name, value)}
                            options={companyRoles}
                            placeholder="Все" />
                        <Autocomplete
                            label="Специализация"
                            name="specialization"
                            multiple
                            fullWidth
                            withError={false}
                            value={getData('specialization')}
                            onChange={(name: string, value: string) => addData(name, value)}
                            options={specializations}
                            placeholder="Все" />
                    </div>
                    <div className={css.row}>
                        <Autocomplete
                            label="Подразделение"
                            name="businessEntity"
                            multiple
                            fullWidth
                            withError={false}
                            value={getData('businessEntity')}
                            onChange={(name: string, value: string) => addData(name, value)}
                            options={businessEntities}
                            placeholder="Все" />
                        <Autocomplete
                            label="Филиал"
                            name="branch"
                            multiple
                            fullWidth
                            withError={false}
                            value={getData('branch')}
                            onChange={(name: string, value: string) => addData(name, value)}
                            options={branches}
                            placeholder="Все" />
                        <Autocomplete
                            label="Отдел"
                            name="employeeDepartment"
                            multiple
                            fullWidth
                            withError={false}
                            value={getData('employeeDepartment')}
                            onChange={(name: string, value: string) => addData(name, value)}
                            options={employeeDepartments}
                            placeholder="Все" />
                    </div>
                    <div className={css.buttons}>
                        <Button type="submit">Найти</Button>
                        <Button type="reset" view="secondary" onClick={formReset}>Очистить</Button>
                    </div>
                </form>
            </div>
        </Paper>
    );
};

export default SearchForm;
