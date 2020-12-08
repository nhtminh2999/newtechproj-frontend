import React, { Component } from 'react';
import { Customer_Service } from '../Services/Customer_Service'
import jsonQuery from 'json-query';
import { Select } from 'antd';

const { Option } = Select;

class Customer_Fullname_Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

    componentDidMount() {
        const searchModel = { Value: '' };
        Promise.all([Customer_Service.getDataFilter(searchModel)]).then(result => {
            const data = jsonQuery('result', { data: result }).value;
            this.setState({ dataSource: data });
        })
    }

    onChange = value => {
        this.props.onChange(value);
    }

    onSearch = value => {
        const searchModel = { Value: value };
        Promise.all([Customer_Service.getDataFilter(searchModel)]).then(result => {
            const data = jsonQuery('result', { data: result }).value;
            this.setState({ dataSource: data });
        })
    }

    render() {
        const { dataSource } = this.state;
        return (
            <Select
                showSearch
                allowClear
                style={{ width: '100%' }}
                optionFilterProp="children"
                onChange={this.onChange}
                onSearch={this.onSearch}
                value={this.props.value}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    || option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {(!!dataSource && dataSource.length > 0) &&
                    dataSource.map(data =>
                        <Option key={data._id} value={data.Customer_Fullname}>{data.Customer_Fullname}</Option>
                    )
                }
            </Select>
        );
    }
}

export { Customer_Fullname_Select };
