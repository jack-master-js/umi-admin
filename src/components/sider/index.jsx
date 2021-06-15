import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Layout } from 'antd';
import SideMenu from '@/components/common/Menu';

const { Sider } = Layout;

export default () => {
    const [collapsed, setCollapsed] = useState(false);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    return (
        <Sider
            width={256}
            style={{ height }}
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
        >
            <div
                className="side-menu-logo"
                onClick={() => {
                    history.push('/');
                }}
            >
                ADMIN
            </div>
            <SideMenu />
        </Sider>
    );
};
