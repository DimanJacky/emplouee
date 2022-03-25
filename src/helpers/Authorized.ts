import { ComponentProps } from 'react';
import { useKeycloak } from '@react-keycloak/web';


export default ({ roles, ...props }: ComponentProps<any>) => {
    const { keycloak } = useKeycloak();

    const getRoles = () => {
        if(keycloak && roles) {
            return roles.some((r: string) => {
                const realm = keycloak.hasRealmRole(r);
                const resource = keycloak.hasResourceRole(r);

                return realm || resource;
            });
        }

        return false;
    };

    return getRoles() && props.children;
};
