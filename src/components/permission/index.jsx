import { connect } from 'umi';
import React, { useState, useEffect } from 'react';
import { getPermissionMenu } from '@/utils/permission';
import FormItem from '@/components/common/FormItem';
import style from './style.less';
import { deepClone } from '@/utils/util';

const sliderProps = {
    max: 5,
    marks: {
        0: '无权限',
        1: '查看',
        2: '编辑',
        3: '新建',
        4: '删除',
        5: '全权限',
    },
};

const Permission = ({ dispatch, global }) => {
    const { menu } = getPermissionMenu();
    const { permission } = global;

    const setPermissionByKey = payload => {
        const { key, value } = payload;
        let state = deepClone(permission);
        state[key] = value;
        dispatch({
            type: 'global/setPermission',
            payload: state,
        });
    };

    const getPermissionItems = () => {
        let items = [];
        for (const sub of menu) {
            items.push({
                type: 'switch',
                label: sub.title,
                props: {
                    checked: permission[sub.permissionKey] ? true : false,
                    onChange: v => {
                        setPermissionByKey({
                            key: sub.permissionKey,
                            value: v ? 1 : 0,
                        });
                    },
                },
            });

            if (permission[sub.permissionKey] > 0) {
                for (const i of sub.children) {
                    items.push({
                        type: 'slider',
                        label: i.title,
                        props: {
                            ...sliderProps,
                            value: permission[i.permissionKey],
                            onChange: v => {
                                setPermissionByKey({
                                    key: i.permissionKey,
                                    value: v,
                                });
                            },
                        },
                    });
                }
            }
        }
        return items;
    };

    const [formItems, setFormItems] = useState(getPermissionItems());

    useEffect(() => {
        setFormItems(getPermissionItems());
    }, [permission]);

    return (
        <div className={style.container}>
            {formItems.map((item, index) => {
                return (
                    <div className="row" key={index}>
                        <div className="col left">{item.label}：</div>
                        <div className="col right">
                            <FormItem item={item} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default connect(({ global }) => ({ global }))(Permission);
