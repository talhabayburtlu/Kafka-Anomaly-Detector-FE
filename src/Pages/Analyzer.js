import {useEffect, useState} from "react";
import Cluster from "../Components/Cluster";
import {Backdrop, CircularProgress, Typography} from "@mui/material";
import ConsumerGroup from "../Components/ConsumerGroup";
import Topic from "../Components/Topic";
import Lag from "../Components/Lag";
import Constants from "../Utils/Constants";

function Analyzer() {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false)
    const [cluster, setCluster] = useState();
    const [consumerGroup, setConsumerGroup] = useState();
    const [topic, setTopic] = useState();

    const styles = {
        header: {
            margin: "0px",
            padding: "10px",
            height: "50px",
            background: Constants.MAIN_COLOR,
            color: Constants.WHITE_COLOR,
            justifyContent: "center"
        }
    }

    const allSteps = [
        {header: Constants.CLUSTER_STEP_HEADER, subheader: Constants.CLUSTER_STEP_SUBHEADER},
        {header: Constants.CONSUMER_GROUP_STEP_HEADER, subheader: Constants.CONSUMER_GROUP_STEP_SUBHEADER},
        {header: Constants.TOPIC_STEP_HEADER, subheader: Constants.TOPIC_STEP_SUBHEADER},
        {header: Constants.LAG_GRAPH_STEP_HEADER, subheader: Constants.LAG_GRAPH_STEP_SUBHEADER}
    ]

    const setClusterForNextStep = (cluster) => {
        setCluster(cluster)
        setStep(1)
    }

    const setConsumerGroupForNextStep = (consumerGroup) => {
        setConsumerGroup(consumerGroup)
        setStep(2)
    }

    const setTopicForNextStep = (topic) => {
        setTopic(topic)
        setStep(3)
    }

    const clearForPreviousStep = (step) => {
        setStep(step)
        switch (step) {
            case 0: setCluster(null); break;
            case 1: setConsumerGroup(null); break;
            case 2: setTopic(null); break;
        }
    }

    return (
        <div className="Analyzer">
            <Typography variant={"h4"} align={"center"} style={styles.header}>Lag Analyzer Results</Typography>
            {step === 0 && (<Cluster header={allSteps[0].header} subheader={allSteps[0].subheader} nextStep={setClusterForNextStep} setLoading={setLoading}/>)}
            {step === 1 && (<ConsumerGroup header={allSteps[1].header} subheader={allSteps[1].subheader} cluster={cluster} nextStep={setConsumerGroupForNextStep} previousStep={clearForPreviousStep} setLoading={setLoading}/>)}
            {step === 2 && (<Topic header={allSteps[2].header} subheader={allSteps[2].subheader} cluster={cluster} consumerGroup={consumerGroup} nextStep={setTopicForNextStep} previousStep={clearForPreviousStep} setLoading={setLoading}/>)}
            {step === 3 && (<Lag header={allSteps[3].header} subheader={allSteps[3].subheader} cluster={cluster} consumerGroup={consumerGroup} topic={topic} previousStep={clearForPreviousStep} setLoading={setLoading}/>)}
            <Backdrop open={loading}>
                <CircularProgress />
            </Backdrop>
        </div>
    );
}

export default Analyzer;