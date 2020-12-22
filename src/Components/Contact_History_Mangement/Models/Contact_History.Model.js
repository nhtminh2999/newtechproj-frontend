import React from 'react';
import moment from 'moment';
import { MethodCommon } from '../../Common/MethodCommon'

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

