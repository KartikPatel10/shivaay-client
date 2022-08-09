import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, CardBody, Col, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import { Form, Input, Radio, Select} from "antd";
import MaskedInput from 'antd-mask-input'
import DSelect from "../../shared/components/form/DSelect";
import axios from "../../shared/axiosConfig";
import useFocus from "../../shared/hooks/use-focus-hook";

const { Option } = Select;

const AppointmentAndRegistration = ({ modelClose, onSubmit, reset, t, chiefComplaints, doctors}) => {
    const [searchPatientQuery, setSearchPatientQuery] = useState();
    const [patients, setPatients] = useState([]);
    const [initialValue, setInitialValue] = useState({"sex": "M"});
    const [appointmentForm] = Form.useForm();
    const [fnameRef, setFnameFocus] = useFocus();

    /*const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Please select time!',us
            },
        ],
    };*/

    const fetchPatients = async (query) => {
        if (query) {
            const res = await axios.get(`/getPatients/${query}`);
            if(res){ setPatients(res.data); }
        } else {
            setPatients([]);
        }
    }

    const handleChange = query => {
        setSearchPatientQuery(query);
    };

    const populatePatientDetail = (patient) => {
        console.log("patient: " + patient.value); // id
        let patientIndex = patients.findIndex(p => p.id === patient.value);
        let selectedPatient = patientIndex > -1 ? patients[patientIndex] : null;
        if (selectedPatient != null) {
            appointmentForm.setFieldsValue(selectedPatient);
        }
    }

    useEffect(() => {
        // setFnameFocus();
    }, [])

    return (
        <>
            <ModalHeader>Create Appointment</ModalHeader>
            <ModalBody>
                <Col md={12} lg={12} className="nopadding">
                <Card>
                    <CardBody>
                        <Form form={appointmentForm} name="appointment-registration" onFinish={onSubmit} initialValues={initialValue}
                              className="form">
                            <div className="form__half">
                                <Form.Item name="id">
                                    <DSelect
                                        showArrow={false}
                                        value={searchPatientQuery}
                                        placeholder="Search Existing Patient"
                                        fetchOptions={fetchPatients}
                                        onChange={handleChange}
                                        onSelect={populatePatientDetail}
                                        allowClear
                                        onClear={ () => appointmentForm.resetFields() }
                                    >
                                        {
                                            patients.map((patient, index) => {
                                                return (
                                                    <Option key={index} value={patient.id}
                                                            label={patient.fname}>
                                                        {patient.fname}
                                                    </Option>
                                                );
                                            })
                                        }
                                    </DSelect>
                                </Form.Item>
                            </div>
                            <div className="form__half"></div>
                            <div className="form__half mr-4">
                                <div className="form__form-group">
                                    <span className="form__form-group-label">First Name</span>
                                    <div className="form__form-group-field">
                                        <Form.Item
                                            name="fname"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input first name!',
                                                    whitespace: true,
                                                },
                                            ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="form__form-group">
                                    <span className="form__form-group-label">Last Name</span>
                                    <div className="form__form-group-field">
                                        <Form.Item
                                            name="lname"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input last name!',
                                                    whitespace: true,
                                                },
                                            ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </div>
                                </div>
                                {/*<div className="form__form-group">
                                    <span className="form__form-group-label">Date of Birth</span>
                                    <div className="form__form-group-field">
                                        <Form.Item name="dob" {...config}>
                                            <DatePicker format="DD/MM/YYYY"/>
                                        </Form.Item>
                                    </div>
                                </div>*/}
                                <div className="form__form-group">
                                    <span className="form__form-group-label">Age</span>
                                    <div className="form__form-group-field">
                                        <Form.Item name="age">
                                            <Input type="Number" maxLength="3" minLength="1"/>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="form__form-group">
                                    <span className="form__form-group-label">Phone Number</span>
                                    <div className="form__form-group-field">
                                        <Form.Item name="phone">
                                            <MaskedInput mask="1111111111" name="phone"/>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="form__form-group">
                                    <span className="form__form-group-label">Gender</span>
                                    <div className="form__form-group-field">
                                        <Form.Item name="sex">
                                            <Radio.Group>
                                                <Radio value="M">Male</Radio>
                                                <Radio value="F">Female</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>

                            <div className="form__half">
                                <div className="form__form-group">
                                    <span className="form__form-group-label">Chief Complaints</span>
                                    <div className="form__form-group-field">
                                        <Form.Item name="chiefcomplaint">
                                            <Select
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="select one country"
                                                optionLabelProp="label"
                                            >
                                                {chiefComplaints.map((chiefComplaint, index) => {
                                                    return (
                                                        <Option key={index} value={chiefComplaint.name} label={chiefComplaint.name}>
                                                            <div className="demo-option-label-item">
                                                                { chiefComplaint.name }
                                                            </div>
                                                        </Option>
                                                    )
                                                } )}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
    
                                <div className="form__form-group">
                                    <span className="form__form-group-label">Doctor</span>
                                    <div className="form__form-group-field">
                                        <Form.Item name="concerneddoctor">
                                            <Select
                                                showSearch
                                                placeholder="Select a Doctor"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                { doctors.map((doctor, index) => <Option key={index} value={doctor.id}>{`Dr. ${doctor.fname}, ${doctor.lname}`}</Option>)}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
    
                                <div className="form__form-group">
                                    <span className="form__form-group-label">Ref. By</span>
                                    <div className="form__form-group-field">
                                        <Form.Item name="refby" >
                                            <Input/>
                                        </Form.Item>
                                    </div>
                                </div>
    
                                <div className="form__form-group">
                                    <span className="form__form-group-label">Address</span>
                                    <div className="form__form-group-field">
                                        <Form.Item name="address1" >
                                            <Input/>
                                        </Form.Item>
                                    </div>
                                </div>

                                <Form.Item name="patientId" >
                                    <Input type="hidden"/>
                                </Form.Item>
    
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
            </ModalBody>
            <ModalFooter>
                <Button form="appointment-registration" type="submit"  color="primary">
                    OK
                </Button>
                <Button color="secondary"  onClick = {modelClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </>
        
    )
}
export default AppointmentAndRegistration;