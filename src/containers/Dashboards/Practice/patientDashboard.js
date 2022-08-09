import React, {useEffect, useState, useRef} from 'react';
import axios from '../../../shared/axiosConfig'
import withErrorHandler from "../../../shared/components/withErrorHandler";
import {Col, Container, Row, Card, CardBody} from "reactstrap";
import DashboardTabs from '../Practice/dashboardTabs'
import { useReactToPrint } from "react-to-print";
import moment from "moment";
const patientDashboard = props => {
    const [patient, setPatient] = useState({});
    const { encId, patientId } = props.match.params;
    const getPatient = async (patientId, encId) => {
        const res = await axios.get(`patientDashboard/${patientId}/${encId}` );
        if (res) {
            setPatient(res.data);   
        }
    }

    useEffect(() => {
        getPatient(patientId, encId);
    }, [])


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return(
        <div className="patient-dashboard"  ref={componentRef}>
            <Container className="dashboard">
                <Row>
                    <Col md={12}>
                        <h3 className="mb-3 patient-dashboard-header">Patient Dashboard</h3>
                        <Col md={12} lg={12} xl={12} className="nopadding mb-2">
                            <Card>
                                <CardBody className="profile__card">
                                    <div className="profile__information">
                                        <div className="profile__data">
                                            <p className="patient__name">{ `${patient.fname} ${patient.lname}`}</p>
                                            <p className="profile__work">{ `${ patient.age } years, `}{ patient.sex === "M" ? "Male": "Female" }</p>
                                            <div className="row patient-detail-more flex-space-between pl-3">
                                                <div className="">
                                                    <div className="patient-detail-matrix">
                                                        <div className="patient-detail-matrix-label"><strong>Date</strong></div>
                                                        { moment(patient.datetime).format("DD/MM/YYYY") }
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="patient-detail-matrix">
                                                        <div className="patient-detail-matrix-label"><strong>Phone</strong></div>
                                                        { patient.phone }
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="patient-detail-matrix">
                                                        <div className="patient-detail-matrix-label"><strong>Address</strong></div>
                                                        { patient.address1 }
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="patient-detail-matrix">
                                                        <div className="patient-detail-matrix-label"><strong>Ref. By</strong></div>
                                                        { patient.refby }
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="patient-detail-matrix">
                                                        <div className="patient-detail-matrix-label"><strong>Doctor</strong></div>
                                                        { `Dr. ${patient.doctorFname} ${patient.doctorLname}` }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Card>
                            <CardBody className="dashboard__sections">
                                <DashboardTabs encId={ encId } />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={12}>
                        <button
                            type="button"
                            className="btn btn-xs btn-primary footer-print-button"
                            onClick={handlePrint}
                        >
                            Print
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default withErrorHandler(patientDashboard, axios);