import { AppstoreOutlined, BugOutlined } from '@ant-design/icons';

export const renderIcon = name => {
    switch (name) {
        case 'BugOutlined':
            return <BugOutlined />;
            break;

        default:
            return <AppstoreOutlined />;
    }
};
