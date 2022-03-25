import React, { ComponentProps } from 'react';
import { RootState } from 'configStore';
import { useSelector } from 'react-redux';
import Error from 'components/Error';
import { Loader } from '@neoflex/psa-ui-shared';


const Container = (props: ComponentProps<any>) => {
    // ловим только фатальные ошибки
    // 404 проект не найден
    const { loading, error } = useSelector((state: RootState) => state.app);

    return (
        <>
            {
                loading ?
                    <Loader /> :
                    error ?
                        <Error { ...error } /> :
                        <div className="page-body">
                            {props.children}
                        </div>
            }
        </>
    );
};

export default Container;
