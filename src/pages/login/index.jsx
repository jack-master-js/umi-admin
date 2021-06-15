import { history } from 'umi';
import { message, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ComForm from '@/components/common/Form';
import { savePermissionStore } from '@/utils/permission';
import store from 'store';

import style from './style.less';

export default () => {
    const formProps = {
        props: {
            onFinish: values => {
                console.log('Received values of form: ', values);
                history.push('/');
                message.success('login success');

                savePermissionStore('');
                store.set('isAdmin', true);
            },
            onFinishFailed: errorInfo => {
                console.log('errorInfo:', errorInfo);
            },
        },
        items: [
            {
                type: 'input',
                props: {
                    placeholder: '用户名',
                    size: 'large',
                    prefix: <UserOutlined />,
                },
                formItemProps: {
                    name: 'name',
                    rules: [
                        {
                            required: true,
                        },
                    ],
                },
            },
            {
                type: 'input',
                props: {
                    placeholder: '密码',
                    size: 'large',
                    prefix: <LockOutlined />,
                },
                formItemProps: {
                    name: 'password',
                    rules: [
                        {
                            required: true,
                            min: 6,
                        },
                    ],
                },
            },
            {
                type: 'button',
                props: {
                    text: '登录',
                    type: 'primary',
                    htmlType: 'submit',
                    block: true,
                },
            },
        ],
    };

    return (
        <div className={style.container}>
            <div className="panel">
                <div className="logo"></div>
                <ComForm {...formProps} />
            </div>
        </div>
    );
};
