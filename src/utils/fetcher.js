import queryString from 'query-string';
import md5 from 'md5';
import {getMs} from '@/utils/util';
import store from 'store';
import expirePlugin from 'store/plugins/expire';
store.addPlugin(expirePlugin);

const isStore = false;

//缓存整站数据，缓存限制一周
const saveCache = (key, data) => {
    const oneMonthMs = getMs(7, 'day');
    store.set(key, data, Date.now() + oneMonthMs);
};

export default (url, data = '', method = 'GET', headers = {}) => {
    // 请求参数设置
    let options = {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
            // Authorization: store.get('access_token') || '',
            ...headers,
        },
    };
    let body = '';

    if (data) {
        if (options.method === 'GET') {
            if (typeof data === 'string') {
                url = `${url}?${data}`;
            } else {
                url = `${url}?${queryString.stringify(data)}`;
            }
        } else {
            if (typeof data === 'string') {
                body = data;
            } else {
                body = JSON.stringify(data);
            }
            options.body = body;
        }
    }

    // 缓存请求过的地址与参数，如果一样则直接返回缓存
    if (isStore) {
        const fingerprint = md5(
            `${url}${body ? JSON.stringify(body) : ''}`,
        );

        if (store.get(fingerprint)) {
            return new Promise((resolve, reject) => {
                const res = store.get(fingerprint);
                resolve(res);
            });
        }
    }

    // 发起请求
    return new Promise((resolve, reject) => {
        console.log(`fetch ${url}${body ? JSON.stringify(body) : ''}`);
        fetch(url, options)
            .then(async res => {
                let json = await res.json();
                if (isStore) saveCache(fingerprint, json);
                resolve(json);
            })
            .catch(e => {
                reject(e.message);
            });
    });
};
