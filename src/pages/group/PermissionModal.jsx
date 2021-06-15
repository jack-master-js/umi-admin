import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import Permission from '@/components/permission/index';
import { Modal } from 'antd';
import { savePermissionStore } from '@/utils/permission';

const PermissionModal = ({ global, onRef }) => {
    const { permission } = global;

    const [visible, setVisible] = useState(false);
    const modalProps = {
        visible: visible,
        destroyOnClose: true,
        closable: false,
        onOk: () => {
            console.log(permission);
            savePermissionStore(permission);
        },
        onCancel: () => {
            setVisible(false);
        },
    };

    const show = v => {
        console.log(v);
        setVisible(true);
    };

    useEffect(() => {
        onRef.show = show;
    });

    return (
        <Modal {...modalProps}>
            <Permission />
        </Modal>
    );
};

export default connect(({ global }) => ({ global }))(PermissionModal);
