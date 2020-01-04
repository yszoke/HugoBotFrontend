import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../../resources', false, /\.(png|jpe?g|svg)$/));

class Tutorial extends Component{

    render() {
        return (
            <Container fluid={true}>
                <h4> First steps with HugoBot </h4>
                <br/>
                You’re a data scientist and you’ve made significant progress in your research -
                the process of collecting and normalizing data has been completed
                and you’ve decided discretization is the next step prior to learning on your data.
                Luckily, you’ve heard of HugoBot™,
                a web application that services a discretization suite fit for your purposes,
                so now you must register to the website and get approved
                and then format your data according to HugoBot’s™ format.
                <br/>
                <h5> Transitioning between formats</h5>
                For the purposes of demonstration,
                assume you’ve got a dataset measuring the bodily effects of kissing
                and being exposed to your loved one as a function of time,
                where the features are beats per minute, bodily temperature and pupil dilation.
                If we were attempting to predict the subject’s gender according to their reaction,
                we might also have a gender class variable.
                <br/>
                A feasible representation of the data might be as follows:
                <br/>
                <br/>
                <Image src={images[0]}/>
                <br/>
                <br/>
                To transition to HugoBot’s format, we must dissect our data
                and map each feature to its equivalent form in HugoBot’s format.
                <br/>
                <br/>
                A record in HugoBot is composed of the following fields:
                <br/>
                <br/>
                <ListGroup>
                    <ListGroupItem>
                        Entity ID - The ID of the subject, or entity on which the recordings are made. An
                        example could be an individual patient, individual object etc.
                    </ListGroupItem>
                    <ListGroupItem>
                        Temporal Property ID -
                        The ID of the variable that measures the state of a certain feature on the current
                        <br/>
                        An example could be <strong>Patient</strong> (our entity)
                        <strong>Temperature</strong> (our feature).
                    </ListGroupItem>
                    <ListGroupItem>
                        Timestamp - A whole, non-negative number that is used to describe the current time
                        point in which the measurements are made.
                    </ListGroupItem>
                    <ListGroupItem>
                        Temporal Property Value - The current value of the temporal property in our entity
                        at the current timestamp. For example, our patients temperature at time 0 could be
                        36.7 degrees celsius.
                    </ListGroupItem>
                </ListGroup>
                <h5>Time to TimeStamp</h5>
                Now that we’ve defined the HugoBot fields, we must map our dataset to the new format.
                Our first step would be to define
                how do we transition our <strong>“Time”</strong> record into a <strong>TimeStamp</strong>.&nbsp;
                Since the highest resolution in our dataset is a measurement per minute,
                we’ll define our 0th TimeStamp as 14-08-18 10:00:00
                and define the TimeStamp to be the difference in minutes between the current date and our 0th TimeStamp.
                Therefore, 14-08-18 10:00:03 will be defined as <strong>TimeStamp 3</strong>.
                <h5>Subject ID to Entity ID</h5>
                As mentioned before, each entity is basically an independent object on which measurements are made.
                Therefore, subject ID fits the bill perfectly and we can directly use our subject ID as entity ID
                <h5>Features to Temporal Property ID</h5>
                By looking at our dataset, we can understand that BPM, Body Temperature and Pupil Dilation are all
                <strong>time-dependent measurements</strong> on an entity,
                while Subject Gender is a <strong>time-independent</strong>
                measurement and is our representative class variable.
                HugoBot uses whole non-negative numbers as ids for temporal properties
                while using whole negative numbers as ids for class variables.
                We can map the property names to arbitrary numbers so long as we follow the previous constraint,
                so we’ll use the following mapping:
                <br/>
                <br/>
                <Image src={images[1]}/>
                <br/>
                <br/>
                In addition to being helpful for us to keep record of our mapping,
                this comma-delimited csv is also fed to the system when sending a discretization request.
                <h5>Actual Data to Temporal Property Value</h5>
                When we’ve completed the mapping of the previous fields,
                we can now progress to actually mapping our data to a data-row in the HugoBot™ format.
                Each cell of our temporal properties is directly mapped to a row in HugoBot,
                where the cell value is used as the final value in the row.
                Hence, the measurement of pupil dilation at time 14-08-18 10:00:02 of subject 1
                will translate to the following data row: 1,3,2,5.
                <br/>
                Class variables are kept for each entity and recorded once at time 0.
                Thus, by arbitrarily mapping male to value 0 and female to value 1
                our class variables will be recorded in the following rows:
                1,-1,0,0 for subject 1 and 2,-1,0,1 for subject 2.
                <br/>
                <br/>
                We can now make our comma-delimited csv file in HugoBot™’s format.
                We should prepend the file with the header
                <strong>EntityID,TemporalPropertyID,TimeStamp,TemporalPropertyValue</strong>
                prior to translating our data.
                <br/>
                For our toy dataset, this should be the final result:
                <br/>
                <br/>
                <Image src={images[2]}/>
                <br/>
                <br/>
                Now, after registering and being approved we can upload our dataset for discretization!
                <h5>(Optional) Entities File</h5>
                The system can make use of an entity demographics file
                describing various demographic features on our dataset.
                Unlike other files, this file is only constrained by being a comma-delimited csv file
                and having a descriptive header for each demographic feature,
                where the first column is the id column. For example:
                <br/>
                <br/>
                <Image src={images[3]}/>
                <br/>
                <br/>
                can be representative of our dataset.
                This demographic file is useful for finding how different patterns
                are related to certain demographic features in the visualization process.
                <h5>Appendix - Used Files</h5>
                Original Dataset
                <br/>
                Formatted Dataset
                <br/>
                Variable Map
                <br/>
                Entities File
                <br/>
                <br/>
                <br/>
                <br/>
            </Container>
        );
    }
}
export default Tutorial;