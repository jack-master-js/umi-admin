import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import ComTable from '@/components/common/Table';

const List = ({ dispatch, global, columns, filter, rowKey }) => {
    const { list, pagination } = global;

    const tableProps = {
        table: {
            dataSource: list.data,
            columns: columns,
            rowKey: record => record[rowKey],
        },
        pagination: {
            current: pagination.pageIndex,
            pageSize: pagination.pageSize,
            total: list.total,
            onChange: async (pageIndex, pageSize) => {
                await dispatch({
                    type: 'global/setPagination',
                    payload: {
                        pageIndex,
                        pageSize,
                    },
                });
                await dispatch({
                    type: 'global/getList',
                    payload: filter,
                });
            },
        },
    };

    return <ComTable {...tableProps} />;
};

export default connect(({ global }) => ({ global }))(List);
