import React, { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getUsers } from '@/api';
import { connectWS } from '@/utils/socket';

const Dashboard = () => {
    const { data, error, loading, run: getUserInfo } = useRequest(getUsers);

    if (error) {
        return <div>failed to load</div>;
    }

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div
            className="page-content"
            onClick={() => {
                getUserInfo({ name: '' });
            }}
        >
            Users: {JSON.stringify(data)}
        </div>
    );
};

// Dashboard.getInitialProps = async ctx => {
//     const { store, isServer } = ctx;
//     const { global } = store.getState();
//     console.log('isServer', isServer);
//     console.log('global', global);
//     const data = await getUsers();
//     return Promise.resolve({ data });
// };

export default Dashboard;
