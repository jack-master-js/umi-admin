import { Table, Pagination } from 'antd';

export default props => {
    return (
        <div>
            <Table
                bordered
                size={'small'}
                pagination={false}
                {...props.table}
            ></Table>

            {/* Pagination */}
            {props.pagination && (
                <Pagination
                    style={{
                        textAlign: 'center',
                        marginTop: 20,
                    }}
                    showTotal={total => `共${total}项`}
                    {...props.pagination}
                />
            )}
        </div>
    );
};
