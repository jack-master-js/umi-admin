import store from 'store';
import ROUTES from '@/routes';
import { deepClone } from './util';

export const savePermissionStore = permission => {
    //0: 无权限；1：查看权限；2：编辑权限；3：新建权限；4：删除权限；5：全权限
    // store.set('permission', window.btoa(JSON.stringify(permission)));
    store.set('permission', permission);
};

export const getPermissionStore = () => {
    const permission = store.get('permission');
    // const decrypted = window.atob(permission);
    // return JSON.parse(decrypted);
    return permission;
};

export const getPermissionMenu = () => {
    let permission = getPermissionStore();
    let menu = [];
    let subKeys = [];
    let initPermission = {};

    const routeData = deepClone(ROUTES);
    const routes = routeData[0]['routes'];
    const isAdmin = store.get('isAdmin');

    for (const sub of routes) {
        if (sub.hide) continue;

        let key = sub.path.substr(1, sub.path.length);
        subKeys.push(key);
        initPermission[key] = 0;
        sub.permissionKey = key;
        sub.permissionLevel = permission ? permission[key] : 0;

        if (sub.permissionLevel > 0) {
            sub.visible = true;
        } else {
            sub.visible = false;
        }

        if (isAdmin) sub.visible = true;

        let subCopy = sub;
        subCopy.children = [];

        if (sub.routes) {
            sub.routes.forEach(item => {
                if (item.component) {
                    key = item.path
                        .substr(1, item.path.length)
                        .split('/')
                        .join('_');

                    initPermission[key] = 0;
                    item.permissionKey = key;
                    item.permissionLevel = permission ? permission[key] : 0;

                    if (item.permissionLevel > 0) {
                        item.visible = true;
                    } else {
                        item.visible = false;
                    }

                    if (isAdmin) item.visible = true;

                    delete item.component;
                    subCopy.children.push(item);
                }
            });
        }

        delete subCopy.routes;
        delete subCopy.component;

        menu.push(subCopy);
    }

    return { menu, subKeys, initPermission };
};

export const getActionLevel = action => {
    switch (action) {
        case 'check':
            return 1;
            break;

        case 'edit':
            return 2;
            break;

        case 'create':
            return 3;
            break;

        case 'delete':
            return 4;
            break;

        case 'all':
            return 5;
            break;

        default:
            return 0;
    }
};

//for hiding page element
export const isHidden = (authority, action) => {
    const isAdmin = store.get('isAdmin');
    if (isAdmin) return false;

    const permission = getPermissionStore();
    const permissionLevel = permission[authority];
    const actionLevel = getActionLevel(action);

    if (permissionLevel < actionLevel) {
        return true;
    } else {
        return false;
    }
};
