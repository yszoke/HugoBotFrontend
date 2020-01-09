import React, { Component } from "react";
import { Router, Route} from "react-router-dom";
import {Card, Col, Container, Row} from "react-bootstrap";

import MyHomeTable from "./DisplayTableHome";
import InfoTable from "./InfoTable";
import DiscretizationTable from "./DiscretizationTable";
import TIMTable from "./TIMTable";

import history from "./History";

import HomeData from "./mainTable";
import InfoData from "./infoData";
import DiscretizationData from "./DiscretizationData";
import TIMData from "./TIMData";

import Workflow from "./Workflow";
import { Link} from "react-router-dom";

import InfoCard from "./infoComponents/InfoCard";
import StatsCard from "./infoComponents/StatsCard";
import VMapCard from "./infoComponents/VMapCard";
import AddConfigCard from "./discComponents/AddConfigCard";
import CurrentConfigsCard from "./discComponents/CurrentConfigsCard";

class TableContent extends Component{
    state = {
        HomeTable: [],
        InfoTable: [],
        DiscretizationTable: [],
        TIMTable: []
    };

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {  HomeTable: HomeData,
                        }
    }

    componentWillUnmount(){
        console.log("hey");
    }

    CollectData=(id) =>
    {
        this.setState({DiscretizationTable : DiscretizationData, InfoTable : InfoTable, TIMTable: TIMTable});
        //console.log(this.state.TemporalAbstractionTable);
        //alert(id);
        history.push("/Home/Info");
    }

    Info = (
        <Container fluid={true}>
            <Row>
                <Col md={4}>
                    <InfoCard/>
                    <StatsCard/>
                    {/*<Link to={"/Home/Info"}>*/}
                    {/*    Download Dataset Files*/}
                    {/*</Link>*/}
                </Col>
                <Col md={8}>
                    <VMapCard/>
                </Col>
            </Row>
        </Container>
    );

    CurrConfigHeadElement = (
        <Card.Header className={"bg-hugobot"}>
            <Card.Text className={"text-hugobot"}>
                Use an Existing Configuration
            </Card.Text>
        </Card.Header>
    );

    render() {
        return (
            <Router history={history}>
                <br/>
                <Workflow/>
                <br/>
                <Container>
                    <Route exact={true} path={"/Home"}>
                        <MyHomeTable
                            HomeTable={this.state.HomeTable}
                            CollectData={ this.CollectData}
                        />
                    </Route>
                    <Route path={"/Home/Info"}>
                        {this.Info}
                    </Route>
                    <Route path={"/Home/Disc"}>
                        <AddConfigCard/>
                        <Card style={{ width: 'auto' }}>
                            {this.CurrConfigHeadElement}
                            <Card.Body>
                                <DiscretizationTable
                                    DiscretizationTable={this.state.DiscretizationTable}
                                />
                            </Card.Body>
                        </Card>
                    </Route>
                    <Route path={"/Home/TIM"}>
                        <TIMTable
                            TIM={this.state.TIMTable}
                        />
                    </Route>
                </Container>
            </Router>
        );
    }
}
export default TableContent;