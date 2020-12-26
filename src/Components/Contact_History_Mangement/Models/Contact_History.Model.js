import React from 'react';
import moment from 'moment';
import { MethodCommon } from '../../Common/MethodCommon'

export const columns = [
    {
        width: '150px',
        title: 'Contact Code',
        dataIndex: 'Contact_History_Code',
        key: 'Contact_History_Code',
    },
    {
        width: '250px',
        title: 'Customer Name',
        dataIndex: 'CustomerObject',
        key: 'Contact_History_Customer',
        render: (data) => <div>{data.Customer_Fullname}</div>
    },
    {
        width: '130px',
        title: 'Metting Date',
        dataIndex: 'Contact_History_MettingDate',
        key: 'Contact_History_MettingDate',
        render: (date) => <div style={{ textAlign: 'center' }}>{MethodCommon.formatDate(date)}</div>
    },
    {
        width: '130px',
        title: 'Status',
        dataIndex: 'Status',
        key: 'Status',
    },
    {
        width: '250px',
        title: 'Created by',
        dataIndex: 'CreatedByObject',
        key: 'CreatedByObject',
        render: (data) => <div>{data.User_Fullname}</div>
    },
    {
        width: '130px',
        title: 'Created date',
        dataIndex: 'CreatedDate',
        key: 'CreatedDate',
        render: (date) => <div style={{ textAlign: 'center' }}>{MethodCommon.formatDate(date)}</div>
    },
    {
        width: '250px',
        title: 'Updated by',
        dataIndex: 'UpdatedByObject',
        key: 'UpdatedBy',
        render: (data) => <div>{data.User_Fullname}</div>
    },
    {
        width: '130px',
        title: 'Updated date',
        dataIndex: 'UpdatedDate',
        key: 'UpdatedDate',
        render: (date) => <div style={{ textAlign: 'center' }}>{MethodCommon.formatDate(date)}</div>
    },
]

export const initContactHistoryModel = {
    Contact_History_Code: '',
    Contact_History_Customer: '',
    Contact_History_MettingDate: moment(new Date()),
    Contact_History_Content: '',
    Status: '',
    CreatedBy: '',
    CreatedDate: moment(new Date()),
    UpdatedBy: '',
    UpdatedDate: moment(new Date()),
};

export const initSearchModel = {
    Contact_History_Code: '',
    Contact_History_MettingDate: [],
    Contact_History_Customer: '',
    CreatedBy: '',
    CreatedDate: [],
    UpdatedBy: '',
    UpdatedDate: [],
}

