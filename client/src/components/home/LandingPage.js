import React from "react";
import {Col, Row} from 'react-grid';

class LandingPage extends React.Component{
    render() {
        return(
            <div className="page-container text-center">
                <Row>
                    <Col sm={3} />
                    <Col sm={5}>
                        <div className="title">Hello :)</div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3} />
                    <Col sm={6}>
                        <div className="description pb-4">
                            This is a Service-oriented Project, this product allows unknown people to interact among themselves to make their travel Easy, Comfortable, Interesting and also reduces their travel expenditure.
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}/>
                    <Col sm={3} className="ml-5 pt-4">
                        <hr />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default LandingPage
