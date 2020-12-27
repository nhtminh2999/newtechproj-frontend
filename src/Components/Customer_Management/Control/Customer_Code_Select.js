import React, { Component } from 'react';
import { Customer_Service } from '../Services/Customer.Service'
import jsonQuery from 'json-query';
import { Select } from 'antd';

const { Option } = Select;

class Customer_Code_Select extends Component {
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

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    onChange = value => {
        console.log(value);
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
                optionLabelProp='name'
                filterOption={(input, option) =>
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.children.props.children[0].props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.children.props.children[1].props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {(!!dataSource && dataSource.length > 0) &&
                    dataSource.map(data =>
                        <Option key={data._id} value={data.Customer_Code} name={data.Customer_Fullname}>
                            <div>
                                <span >{data.Customer_Code}</span>
                                <span style={{ float: 'right' }}>{data.Customer_Fullname}</span>
                            </div>
                        </Option>
                    )
                }
            </Select>
        );
    }
}

export { Customer_Code_Select };
