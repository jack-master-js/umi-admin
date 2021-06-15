import { connect, history } from 'umi';
import { Layout, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import style from './style.less';

const { Header } = Layout;

const LoginUser = ({ userInfo }) => {
    const menu = (
        <Menu
            onClick={({ key }) => {
                switch (key) {
                    case '1':
                        history.push('/login');
                        break;
                }
            }}
        >
            <Menu.Item key="1">log out</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {userInfo.name} <DownOutlined />
            </a>
        </Dropdown>
    );
};

const myHeader = ({ global }) => {
    const { userInfo } = global;
    return (
        <Header>
            <div className={style.container}>
                <div className="row">
                    <div className="col">
                        <div className="login-user">
                            <LoginUser userInfo={userInfo} />
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
};

export default connect(({ global }) => ({ global }))(myHeader);
