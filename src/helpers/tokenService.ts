// import Cookies from 'universal-cookie';
import { fetch as crossFetch } from 'cross-fetch';
import settings from 'settings';


type Storage = {
    // eslint-disable-next-line no-unused-vars
    setAccessToken: (token: string) => void
    getAccessToken: () => string | null
    removeAccessToken: () => void
    // eslint-disable-next-line no-unused-vars
    set: (name: string, value: string, options?: object) => void
    // eslint-disable-next-line no-unused-vars
    get: (name: string) => string | null
    // eslint-disable-next-line no-unused-vars
    remove: (name: string) => void
};


const storage = localStorage;

const tokenStorage: Storage = {
    setAccessToken: (accessToken) => {
        // set cookie until midnight
        const date = new Date();
        const night = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0);

        tokenStorage.set('accessToken', accessToken, { maxAge: (night.valueOf() - date.valueOf()) / 1000 });
    },
    getAccessToken: () => {
        return tokenStorage.get('accessToken');
    },
    removeAccessToken: () => {
        tokenStorage.remove('accessToken');
    },
    remove: (name: string) => {
        storage.removeItem(name);
    },
    set: (name, value) => {
        // options = Object.assign({ path: '/', maxAge: 86400 }, options);

        storage.setItem(name, value);
    },
    get: (name) => {
        return storage.getItem(name);
    }
};


type Refresh = {
    checkAccessToken: () => Promise<{ message: string }>;
};

const refreshToken: Refresh = {
    checkAccessToken: () => {
        const nowDate = new Date();
        const expiresAt = tokenStorage.get('expiresAt');
        const accessToken = tokenStorage.getAccessToken();

        if(!accessToken)
            return Promise.reject({ message: 'There is no accessToken' });

        if(accessToken.length < 1000)
            return Promise.resolve({ message: 'Neoflex accessToken' });

        let expiresAtDate = new Date();

        if(expiresAt)
            expiresAtDate = new Date(+expiresAt);

        if(expiresAtDate <= nowDate) {
            return crossFetch(settings.REFRESH_TOKEN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ encryptTokens: accessToken })
            })
                .then(response => response.json())
                .then(payload => {
                    let date = new Date();

                    if(payload.expirationDate)
                        date = new Date(payload.expirationDate);

                    date.setHours(date.getHours() + 2);
                    const expirationDate = date.valueOf().toString();

                    tokenStorage.setAccessToken(payload.encryptedTokens);
                    tokenStorage.set('expiresAt', expirationDate, { maxAge: 7200 });

                    return Promise.resolve({ message: 'Got new accessToken' });
                })
                .catch(error => {
                    console.error('LOGOUT', error.message);

                    return Promise.reject({ message: 'Can\'t get refreshed token' });
                });
        }

        return Promise.resolve({ message: 'No need new token' });
    }
};


export default { tokenStorage, refreshToken };
