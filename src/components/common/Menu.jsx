import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'umi';
import { Menu } from 'antd';
import { getPermissionMenu } from '@/utils/permission';
import { renderIcon } from '@/utils/menuIcon';

const { SubMenu } = Menu;

export default () => {
    const { menu, subKeys } = getPermissionMenu();
    const [openKeys, setOpenKeys] = useState([subKeys[0]]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const location = useLocation();

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (subKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const onSelect = ({ selectedKeys }) => {
        setSelectedKeys(selectedKeys);
    };

    useEffect(() => {
        const pathname = location.pathname;
        const keys = pathname.split('/');
        keys.shift();
        setOpenKeys([keys[0]]);
        setSelectedKeys([keys[1]]);
    }, []);

    return (
        <Menu
            theme="dark"
            mode="inline"
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={onOpenChange}
            onSelect={onSelect}
        >
            {menu.map(sub => {
                return (
                    sub.visible && (
                        <SubMenu
                            key={sub.name}
                            title={
                                <span>
                                    <span>{sub.title}</span>
                                </span>
                            }
                            icon={renderIcon(sub.icon)}
                        >
                            {sub.children &&
                                sub.children.map(item => {
                                    return (
                                        item.visible && (
                                            <Menu.Item key={item.name}>
                                                <Link to={item.path}>
                                                    {item.title}
                                                </Link>
                                            </Menu.Item>
                                        )
                                    );
                                })}
                        </SubMenu>
                    )
                );
            })}
        </Menu>
    );
};
