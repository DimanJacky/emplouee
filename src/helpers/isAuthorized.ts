import { useKeycloak } from '@react-keycloak/web';


export default (roles: string[]) => {
    const { keycloak } = useKeycloak();

    const getRoles = () => {
        if(keycloak && roles) {
            return roles.some(r => {
                const realm = keycloak.hasRealmRole(r);
                const resource = keycloak.hasResourceRole(r);

                return realm || resource;
            });
        }

        return false;
    };

    return getRoles();
};
