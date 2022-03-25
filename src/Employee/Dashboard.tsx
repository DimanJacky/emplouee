import React, { useState } from 'react';
import Container from 'components/Container';
import SearchForm from './SearchForm';
import Results from './Results';


export default () => {
    const [isSearchData, setSearchData] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Container>
            <SearchForm setSearchData={setSearchData} setIsValid={setIsValid} setLoading={setLoading}/>
            <Results isSearchData={isSearchData} isValid={isValid} loading={loading}/>
        </Container>
    );
};
