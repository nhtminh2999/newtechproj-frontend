import React from 'react';
import moment from 'moment';
import { MethodCommon } from '../../Common/MethodCommon'
import { Customer_View } from '../Customer_View';

export const columns = [
    {
        width: '150px',
        title: 'Customer code',
        dataIndex: 'Customer_Code',
        key: 'Customer_Code',
    },
    {
        width: '130px',
        title: 'Customer type',
        dataIndex: 'Customer_Type',
        key: 'Customer_Type',
    },
    {
        width: '250px',
        title: 'Fullname',
        dataIndex: 'Customer_Fullname',
        key: 'Customer_Fullname',
        render: (data, row) => {
            return (
                <Customer_View selectedModel={row} username={data} />
            )
        }
    },
    {
        width: '130px',
        title: 'Birthday',
        dataIndex: 'Customer_Birthday',
        key: 'Customer_Birthday',
        render: (date) => <div style={{ textAlign: 'center' }}>{MethodCommon.formatDate(date)}</div>
    },
    {
        width: '130px',
        title: 'Phone number',
        dataIndex: 'Customer_Phonenumber',
        key: 'Customer_Phonenumber',
    },
    {
        width: '250px',
        title: 'Email address',
        dataIndex: 'Customer_Email',
        key: 'Customer_Email',
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

export const initCustomerModel = {
    Customer_Code: '',
    Customer_Type: '',
    Customer_Birthday: moment(new Date()),
    Customer_Fullname: '',
    Customer_Phonenumber: '',
    Customer_Email: '',
    Customer_Address: '',
    Status: '',
    CreatedBy: '',
    CreatedDate: moment(new Date()),
    UpdatedBy: '',
    UpdatedDate: moment(new Date()),
};

export const initSearchModel = {
    Customer_Code: '',
    // Customer_Type: [],
    Customer_Birthday: [],
    Customer_Fullname: '',
    Customer_Phonenumber: '',
    Customer_Email: '',
    Customer_Address: '',
    // Status: [],
    CreatedBy: '',
    CreatedDate: [],
    UpdatedBy: '',
    UpdatedDate: [],
}