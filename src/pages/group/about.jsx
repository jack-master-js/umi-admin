import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import style from './style.less';

export default () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            setLoading(false);
            setImageUrl(
                `http://localhost:3000/${info.file.response.data.path}`,
            );
        }
    };
    return (
        <div className={style.container}>
            <div className="page-content">
                <img src={require('@/assets/logo.png')} />
                <div className="img"></div>
            </div>
            <div>
                <a href="mailto:xxx@qq.com">email</a> <br />
                <a href="skype:xxx?call">skype</a> <br />
                <a href="tg://resolve?domain=xxx">tg</a> <br />
                <a href="tencent://message?uin=xxx">qq</a> <br />
                <a href="tel:400-888-9999">tel</a> <br />
                <a href="weixin://">wechat</a>
            </div>
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://localhost:3000/api/upload"
                data={{ name: 'avatar' }}
                onChange={handleChange}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: '100%' }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        </div>
    );
};
