import React, { ComponentProps, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Tag, Typography } from '@neoflex/fastdata-ui-kit';
import { CareerHistoryType, RootState } from 'configStore';
import { businessEntity } from 'helpers';
import actions from './actions';
import css from './profile.module.scss';


type ParamTypes = {
    id?: string
}

const CareerHistoryTab = ({ careerHistory, ...props }: ComponentProps<any>) => {
    const { id } = useParams<ParamTypes>();

    useEffect(() => {
        props.getCareerHistory(Number(id));
    }, [id]);


    return (
        <div className={css.careerTable}>
            <div className={css.career_title}> <Typography type="h3" weight="medium">Карьера</Typography></div>
            <table className={css.career_table_d}>
                <thead className={css.career_header}>
                    <tr className={css.career_headerRow}>
                        <td>Грейд</td>
                        <td>Роль в компании</td>
                        <td>Подразделение</td>
                        <td>Событие</td>
                        <td align={'center'}>Дата изменения</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        careerHistory.map((careerHistory: CareerHistoryType, key: number) => {
                            return (
                                <tr className={css.career_tableRow} key={key}>
                                    <td> {careerHistory.grade}</td>
                                    <td>{careerHistory.role}</td>
                                    <td width={300}>{businessEntity(careerHistory.businessEntity, careerHistory.department, careerHistory.group)}</td>
                                    <td><Tag>{careerHistory.status}</Tag></td>
                                    <td align={'center'}>{new Date(careerHistory.date).toLocaleDateString()}</td>
                                </tr>
                            );
                        })}

                </tbody>
            </table>
        </div>
    );


};

export default connect(
    (state: RootState) => ({
        ...state.app,
        careerHistory: state.careerHistory
    }),
    { ...actions }
)(CareerHistoryTab);
