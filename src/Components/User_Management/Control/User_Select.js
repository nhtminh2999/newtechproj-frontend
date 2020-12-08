import React, { Component } from 'react';
import { User_Service } from '../Services/User.Service'
import jsonQuery from 'json-query';
import { Select } from 'antd';

const { Option } = Select;

class User_Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

    componentDidMount() {
        const searchModel = { Value: '' };
        Promise.all([User_Service.getDataFilter(searchModel)]).then(result => {
            const data = jsonQuery('result', { data: result }).value;
            this.setState({ dataSource: data });
        })
    }

    onChange = value => {
        this.props.onChange(value);
    }

    onSearch = value => {
        const searchModel = { Value: value };
        Promise.all([User_Service.getDataFilter(searchModel)]).then(result => {
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
                disabled={this.props.disabled}
                style={{ width: '100%' }}
                placeholder="Select a person"
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
                        <Option key={data._id} value={data.User_Name}>{data.User_Fullname}</Option>
                    )
                }
            </Select>
        );
    }
}

export { User_Select };
