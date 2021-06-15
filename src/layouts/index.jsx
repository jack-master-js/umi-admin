import React, { useState, useEffect } from 'react';
import { useLocation } from 'umi';
import { ConfigProvider, Layout } from 'antd';

import Sider from '@/components/sider/index';
import Header from '@/components/header/index';

import './bootstrap-grid.min.css';
import zhCN from 'antd/lib/locale/zh_CN';

const { Content } = Layout;

export default ({ children }) => {
    const location = useLocation();
    const path = location.pathname;
    switch (true) {
        case /login/.test(path):
            return <>{children}</>;
            break;
    }

    return (
        <ConfigProvider locale={zhCN}>
            <Layout>
                <Sider />
                <Layout>
                    <Header />
                    <Content>{children}</Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
