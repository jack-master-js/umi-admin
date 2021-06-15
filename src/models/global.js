import { getPermissionMenu } from '@/utils/permission';
import { deepClone } from '@/utils/util';
import * as api from '@/api';

const { initPermission } = getPermissionMenu();

export default {
    namespace: 'global',
    state: {
        userInfo: {
            name: '',
        },
        permission: deepClone(initPermission),
        list: {
            data: [],
            total: 0,
        },
        pagination: {
            pageIndex: 1,
            pageSize: 20,
        },
    },
    reducers: {
        setUserInfo(state, { payload }) {
            state.userInfo = payload; //immer: true
        },
        setPermission(state, { payload }) {
            state.permission = payload;
        },
        setList(state, { payload }) {
            state.list = payload;
        },
        setPagination(state, { payload }) {
            state.pagination = payload;
        },
    },
    effects: {
        *getList({ payload }, { call, put, select }) {
            const { key, params } = payload;
            const pagination = yield select(state => state.global.pagination);
            const res = yield call(api[key], {
                ...params,
                ...pagination,
            });
            yield put({ type: 'setList', payload: { data: res, total: 100 } });
        },
    },
    subscriptions: {
        setup({ history, dispatch }) {
            console.log('setup something');
        },
    },
};
