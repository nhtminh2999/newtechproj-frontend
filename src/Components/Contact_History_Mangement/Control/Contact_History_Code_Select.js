import React, { Component } from 'react';
import { Contact_History_Service } from '../Services/Contact_History.Service'
import jsonQuery from 'json-query';
import { Select } from 'antd';

const { Option } = Select;

class Contact_History_Code_Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

    componentDidMount() {
        const searchModel = { Value: '' };
        Promise.all([Contact_History_Service.getDataFilter(searchModel)]).then(result => {
            const data = jsonQuery('result', { data: result }).value;
            this.setState({ dataSource: data });
        })
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    onChange = value => {
        this.props.onChange(value);
    }

    onSearch = value => {
        const searchModel = { Value: value };
        Promise.all([Contact_History_Service.getDataFilter(searchModel)]).then(result => {
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
                optionLabelProp='value'
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    || option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {(!!dataSource && dataSource.length > 0) &&
                    dataSource.map(data =>
                        <Option key={data._id} value={data.Contact_History_Code}>{data.Contact_History_Code}</Option>
                    )
                }
            </Select>
        );
    }
}

export { Contact_History_Code_Select };
