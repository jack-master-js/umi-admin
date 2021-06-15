import React from 'react';
import { Form } from 'antd';
import formItem from './FormItem';

export default props => {
    const validateMessages = {
        required: '必填',
        pattern: {
            mismatch: '格式不对',
        },
        string: {
            len: '必需是 ${len} 位',
            min: '至少 ${min} 位',
            max: '最多 ${max} 位',
            range: '必需在 ${min} 到 ${max} 位之间',
        },
        number: {
            len: '必需是 ${len}',
            min: '需大于等于 ${min}',
            max: '需小于等于 ${max}',
            range: '必需在 ${min} 到 ${max} 之间',
        },
    };

    const valuePropName = item => {
        if (item.type === 'switch') return 'checked';
        return 'value';
    };
    return (
        <Form validateMessages={validateMessages} {...props.props}>
            {props.items.map((item, index) => {
                return (
                    <React.Fragment key={`item${index}`}>
                        {!item.hide && (
                            <Form.Item
                                {...item.formItemProps}
                                valuePropName={valuePropName(item)}
                            >
                                {item.type ? formItem({ item }) : item.render()}
                            </Form.Item>
                        )}
                    </React.Fragment>
                );
            })}
        </Form>
    );
};
