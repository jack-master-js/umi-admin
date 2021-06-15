import { connect } from 'umi';
import React, { useState, useEffect } from 'react';
import ComForm from '@/components/common/Form';
import List from '@/components/list';
import { Form, Button } from 'antd';
import moment from 'moment';
import PermissionModal from './PermissionModal';

const Home = ({ dispatch }) => {
    const [filter, setFilter] = useState({
        key: 'getUsers',
        params: {},
    });
    const getList = (params = {}) => {
        dispatch({
            type: 'global/getList',
            payload: {
                key: 'getUsers',
                params: params,
            },
        });
    };

    const modalRef = {};
    const [formRef] = Form.useForm();
    const formProps = {
        props: {
            layout: 'inline',
            form: formRef,
            initialValues: {
                name: '',
                age: null,
                date: '',
            },
            onFinish: values => {
                if (values.date) {
                    values.date = moment(values.date).format(
                        'YYYY-MM-DD hh:mm:ss',
                    );
                }

                console.log('Success:', values);
                setFilter({
                    key: 'getUsers',
                    params: values,
                });
                getList(values);
            },
            onFinishFailed: errorInfo => {
                console.log('errorInfo:', errorInfo);
            },
        },
        items: [
            {
                type: 'input',
                formItemProps: {
                    label: '用户',
                    name: 'name',
                },
            },
            {
                type: 'inputNumber',
                formItemProps: {
                    label: '年龄',
                    name: 'age',
                },
            },
            {
                type: 'date',
                formItemProps: {
                    label: '日期',
                    name: 'date',
                },
            },
            {
                type: 'button',
                props: {
                    text: '查询',
                    type: 'primary',
                    htmlType: 'submit',
                },
            },
            {
                type: 'button',
                props: {
                    text: '重置',
                    type: 'primary',
                    onClick: () => {
                        formRef.resetFields();
                        setFilter({
                            key: 'getUsers',
                            params: {},
                        });
                        getList();
                    },
                },
            },
            {
                type: 'button',
                props: {
                    text: '打开',
                    type: 'primary',
                    onClick: () => {
                        modalRef.show('hi');
                    },
                },
            },
        ],
    };

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            render: () => {
                return (
                    <Button
                        type="text"
                        danger
                        onClick={() => {
                            console.log('delete');
                        }}
                    >
                        delete
                    </Button>
                );
            },
        },
    ];

    useEffect(() => {
        getList();
    }, []);

    return (
        <div className="page-content">
            <div className="page-filter">
                <ComForm {...formProps} />
            </div>
            <div className="page-list">
                <List columns={columns} filter={filter} rowKey="key" />
            </div>
            <PermissionModal onRef={modalRef} />
        </div>
    );
};

export default connect(({ global }) => ({ global }))(Home);
