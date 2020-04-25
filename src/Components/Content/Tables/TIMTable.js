import React, { Component } from "react";

import {Button, ButtonGroup, Card, Form, Row, Table, ToggleButton} from "react-bootstrap";
//import {createBrowserHistory} from "history";

class TIMTable extends Component {

    handleSubmit = (MoD,BinNo,IPGap,PAAWin,EpsilonInput,MaxGapInput,MinVerticalSupportInput) => {

        let x= JSON.parse(sessionStorage.TIMTable);

        if (EpsilonInput) {

            let y = {
                "MethodOfDiscretization": MoD.innerText,
                "BinsNumber": BinNo.innerText,
                "InterpolationGap": IPGap.innerText,
                "PAAWindowSize": PAAWin.innerText,
                "epsilon": EpsilonInput.value,
                "MaxGap": MaxGapInput.value,
                "VerticalSupport": MinVerticalSupportInput.value
            };
            x.rows.push(y);

            sessionStorage.setItem('TIMTable', JSON.stringify(x));
            this.forceUpdate();
        }
    };

    //<editor-fold desc="Sub-elements">
    HeadElement = (Heading) => {
        return(
            <Card.Header className={"bg-hugobot"}>
                <Card.Text className={"text-hugobot"}>
                    {Heading}
                </Card.Text>
            </Card.Header>
        );
    };

    nothing = () => {
        window.alert("stop tickling me");
    }
    //</editor-fold>

    //<editor-fold desc="Render functions">
    renderAddRunHeader = () => {
        return (
            <thead>
                <tr>
                    <td width={"15%"}>
                       PAA-Bins-Interpolation-Method
                    </td>
                    <td width={"5%"}>
                        Epsilon
                    </td>
                    <td width={"5%"}>
                        Max Gap
                    </td>
                    <td width={"5%"}>
                        Min. Vertical Support
                    </td>
                    <td width={"10%"}>
                        No. of Allen Relations
                    </td>
                    <td width={"10%"}>
                        Class0/1/both
                    </td>
                    <td width={"5%"}>
                        Status/Download Link
                    </td>
                </tr>
            </thead>
        );
    };

    renderAddRunData = () => {
        return JSON.parse(sessionStorage.DiscretizationTable).rows.map((iter, index) => {
            let Disc = "Disc" + index;
            let EpsilonInput = "EpsilonInput" + index;
            let MaxGapInput = "MaxGapInput" + index;
            let MinVSInput = "MinVSInput" + index;
            return (
                <tr key={index}>
                    <td id={Disc}>
                        {iter.PAAWindowSize+"-"
                        +iter.BinsNumber+"-"
                        +iter.InterpolationGap+"-"
                        +iter.MethodOfDiscretization}
                    </td>
                    <td>
                        <Form.Control id={EpsilonInput} type={"text"}>
                        </Form.Control>
                    </td>
                    <td>
                        <Form.Control id={MaxGapInput} type={"text"}>
                        </Form.Control>
                    </td>
                    <td>
                        <Form.Control id={MinVSInput} type={"text"}>
                        </Form.Control>
                    </td>
                    <td>
                        <ButtonGroup toggle={true} >
                            <ToggleButton checked={false}
                                          className={"btn-hugobot"}
                                          onChange={this.nothing}
                                          type={"radio"}
                                          value={true}>
                                3
                            </ToggleButton>
                            <ToggleButton checked={false}
                                          className={"btn-hugobot"}
                                          onChange={this.nothing}
                                          type={"radio"}
                                          value={false}>
                                7
                            </ToggleButton>
                        </ButtonGroup>
                    </td>
                    <td>
                        <ButtonGroup toggle={true} >
                            <ToggleButton checked={false}
                                          className={"btn-hugobot"}
                                          onChange={this.nothing}
                                          type={"radio"}
                                          value={true}>
                                0
                            </ToggleButton>
                            <ToggleButton checked={false}
                                          className={"btn-hugobot"}
                                          onChange={this.nothing}
                                          type={"radio"}
                                          value={false}>
                                1
                            </ToggleButton>
                            <ToggleButton checked={false}
                                          className={"btn-hugobot"}
                                          onChange={this.nothing}
                                          type={"radio"}
                                          value={false}>
                                0 + 1
                            </ToggleButton>
                        </ButtonGroup>
                    </td>
                    <td>
                        <Button className="bg-hugobot"
                                 onClick={() => this.handleSubmit(
                                     document.getElementById(iter.PAAWindowSize),
                                     document.getElementById(iter.BinsNumber),
                                     document.getElementById(iter.InterpolationGap),
                                     document.getElementById(iter.MethodOfDiscretization),
                                     document.getElementById(EpsilonInput),
                                     document.getElementById(MaxGapInput),
                                     document.getElementById(MinVSInput))}>
                            <i className="fas fa-play"/>Mine
                        </Button>
                    </td>
                </tr>
            )
        })
    };

    renderExistingRunsHeader = () => {
        return (
            <thead>
                <tr>
                    <td>
                        Method Of Discretization
                    </td>
                    <td>
                        Bins Number
                    </td>
                    <td>
                        Interpolation Gap
                    </td>
                    <td>
                        PAA Window Size
                    </td>
                    <td>
                        Epsilon
                    </td>
                    <td>
                        Max Gap
                    </td>
                    <td>
                        Min. Vertical Support
                    </td>
                    <td>
                        Status/Download Link
                    </td>
                </tr>
            </thead>
        );
    };

    renderExistingRunsData = () => {
        return JSON.parse(sessionStorage.TIMTable).rows.map((iter, index) => {
            return (
                <tr key={index}>
                    <td>
                        {iter.MethodOfDiscretization}
                    </td>
                    <td>
                        {iter.BinsNumber}
                    </td>
                    <td>
                        {iter.InterpolationGap}
                    </td>
                    <td>
                        {iter.PAAWindowSize}
                    </td>
                    <td>
                        {iter.epsilon}
                    </td>
                    <td>
                        {iter.MaxGap}
                    </td>
                    <td>
                        {iter.VerticalSupport}
                    </td>
                    <td>
                        {<Button className="bg-hugobot" onClick={this.nothing}>
                            <i className="fas fa-download"/> Download
                        </Button>}
                    </td>
                </tr>
            )
        })
    };
    //</editor-fold>

    render() {
        return (
            <small>
                <Card style={{ width: 'auto' }}>
                    {this.HeadElement("Add a New Time Interval Mining Configuration")}
                    <Card.Body>
                        <Row>

                        </Row>
                    </Card.Body>
                </Card>
                <Card style={{ width: 'auto' }}>
                    {this.HeadElement("...Or Use An Existing One Instead")}
                    <Card.Body>
                        <Table hover>
                            {this.renderAddRunHeader()}
                            <tbody>
                                {this.renderAddRunData()}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <Card style={{ width: 'auto' }}>
                    {this.HeadElement("Discovered Patterns")}
                    <Card.Body>
                        <Table hover>
                            {this.renderExistingRunsHeader()}
                            <tbody>
                                {this.renderExistingRunsData()}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </small>
        )
    }
}

export default TIMTable ;