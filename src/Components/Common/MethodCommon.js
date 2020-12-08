import moment from 'moment';
import { notification } from 'antd';

export const MethodCommon = {
    formatDate
};

export const openNotification = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};

function formatDate(value) {
    return moment(value).format('DD-MM-YYYY');
}


