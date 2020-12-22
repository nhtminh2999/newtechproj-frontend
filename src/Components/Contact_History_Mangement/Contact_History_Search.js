import React, { Component } from 'react';
import { Collapse, Input, Card, DatePicker, Form } from 'antd';
import { Contact_Code_Select } from '../Contact_Management/Control/Contact_Code_Select';
import { User_Select } from '../User_Management/Control/User_Select'
import moment from 'moment';

class Contact_History_Search extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleContactCodeChange = value => {
        const { searchModel } = this.props;
        searchModel.Contact_History_Code = value;
        this.props.onChange(searchModel);
    }

    handleContactMeetingChange = (dates, dateStrings) => {
        const { searchModel } = this.props;
        searchModel.Contact_History_MettingDate[0] = dateStrings[0];
        searchModel.Contact_History_MettingDate[1] = dateStrings[1];
        this.props.onChange(searchModel);
    }

    handleCreatedByChange = value => {
        const { searchModel } = this.props;
        searchModel.CreatedBy = value;
        this.props.onChange(searchModel);
    }

    handleUpdatedByChange = value => {
        const { searchModel } = this.props;
        searchModel.UpdatedBy = value;
        this.props.onChange(searchModel);
    }

    handleCreatedDateChange = (dates, dateStrings) => {
        const { searchModel } = this.props;
        searchModel.CreatedDate[0] = dateStrings[0];
        searchModel.CreatedDate[1] = dateStrings[1];
        this.props.onChange(searchModel);
    }

    handleUpdatedDateChange = (dates, dateStrings) => {
        const { searchModel } = this.props;
        searchModel.UpdatedDate[0] = dateStrings[0];
        searchModel.UpdatedDate[1] = dateStrings[1];
        this.props.onChange(searchModel);
    }

    handleSubmitForm = e => {
        const { searchModel } = this.props;
        if (e.key === 'Enter') {
            this.props.handleSearch(searchModel);
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24, },
                sm: { span: 8, },
            },
            wrapperCol: {
                xs: { span: 24, },
                sm: { span: 16, },
            },
        };
        const gridStyle = {
            width: '50%',
            padding: '5px 15px',
            border: 'none',
            boxShadow: 'none'
        };
        return (
            <Collapse expandIconPosition='right' defaultActiveKey={['1']} >
                <Panel header="Search contact information" key="1">
                    <Form ref={this.formRef} {...formItemLayout} labelAlign='left' style={{ display: 'block' }} onKeyPress={this.handleSubmitForm}>
                        <Card bordered={false}>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    label='Contact code' colon={false}
                                >
                                    <Contact_Code_Select onChange={this.handleContactCodeChange} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    label='Meeting date' colon={false}
                                >
                                    <RangePicker
                                        style={{ width: '100%' }}
                                        ranges={{
                                            Today: [moment(), moment()],
                                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                                        }}
                                        onChange={this.handleContactMeetingChange}
                                    />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='CreatedBy'
                                    label='Created by' colon={false}
                                >
                                    <User_Select onChange={this.handleCreatedByChange} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    label='Created day' colon={false}
                                >
                                    <RangePicker
                                        style={{ width: '100%' }}
                                        ranges={{
                                            Today: [moment(), moment()],
                                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                                        }}
                                        onChange={this.handleCreatedDateChange}
                                    />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='UpdatedBy'
                                    label='Updated by' colon={false}
                                >
                                    <User_Select onChange={this.handleUpdatedByChange} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    label='Updated day' colon={false}
                                >
                                    <RangePicker
                                        style={{ width: '100%' }}
                                        ranges={{
                                            Today: [moment(), moment()],
                                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                                        }}
                                        onChange={this.handleUpdatedDateChange}
                                    />
                                </Form.Item>
                            </Card.Grid>
                        </Card>
                    </Form>
                </Panel>
            </Collapse>
        );
    }
}

export default Contact_History_Search;
