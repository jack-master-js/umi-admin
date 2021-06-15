import moment from 'moment';
import {
    Button,
    Input,
    InputNumber,
    Switch,
    Select,
    DatePicker,
    Slider,
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

export default ({ item }) => {
    const { type, props, options } = item;
    switch (type) {
        case 'button':
            return <Button {...props}>{props.text}</Button>;
            break;

        case 'input':
            return <Input {...props} />;
            break;

        case 'inputNumber':
            return <InputNumber {...props} />;
            break;

        case 'textArea':
            return <TextArea {...props} />;
            break;

        case 'switch':
            return <Switch {...props} />;
            break;

        case 'slider':
            return <Slider {...props} />;
            break;

        case 'select':
            return (
                <Select {...props}>
                    {options.map(item => (
                        <Option value={item.value} key={item.value}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
            );
            break;

        case 'date':
            return <DatePicker {...props} />;
            break;

        case 'rangeDate':
            return (
                <RangePicker
                    ranges={{
                        本周: [moment().startOf('week'), moment()],
                        上周: [
                            moment()
                                .week(moment().week() - 1)
                                .startOf('week'),
                            moment()
                                .week(moment().week() - 1)
                                .endOf('week'),
                        ],
                        本月: [moment().startOf('month'), moment()],
                        上月: [
                            moment()
                                .month(moment().month() - 1)
                                .startOf('month'),
                            moment()
                                .month(moment().month() - 1)
                                .endOf('month'),
                        ],
                        本季: [moment().startOf('quarter'), moment()],
                        上季: [
                            moment()
                                .quarter(moment().quarter() - 1)
                                .startOf('quarter'),
                            moment()
                                .quarter(moment().quarter() - 1)
                                .endOf('quarter'),
                        ],
                        本年: [moment().startOf('year'), moment()],
                        去年: [
                            moment()
                                .year(moment().year() - 1)
                                .startOf('year'),
                            moment()
                                .year(moment().year() - 1)
                                .endOf('year'),
                        ],
                    }}
                    {...props}
                />
            );
            break;
    }
};
