import {useEffect, useState} from "react";
import {Container, Divider, Grid, IconButton, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Constants from "../Utils/Constants";
import Requester from "../Utils/Requester";
import LagGraph from "./LagGraph";

function Lag(props) {
    const [lags , setLags] = useState(null)
    const [boundaries , setBoundaries] = useState(null)

    const styles = {
        subheader: {
            margin: "25px 0px"
        },
        graphContainer: {
            margin: "50px auto",
        },
    }

    async function getLags() {
        await Requester.GET_LAGS(props.cluster.id, props.consumerGroup, props.topic).then(response => {
            setLags(response.data.lags)
            if (response.data.lowerBoundary !== null && response.data.upperBoundary !== null)
                setBoundaries({lower: response.data.lowerBoundary, upper: response.data.upperBoundary})
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        props.setLoading(true);
        getLags();
        props.setLoading(false);
    },[props])

    return (
        <div className={"Lag"}>
            <Container>
                <Grid container justifyContent={"center"} style={styles.subheader}>
                    <Grid item xs={12}>
                        <IconButton onClick={() => props.previousStep(2)}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h4"} align={"center"} display={"block"}>{props.header}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} align={"center"} style={{color: "#EA4362"}}>{Constants.SELECTED_CLUSTER(props.cluster.name)}</Typography>
                        <Typography variant={"h6"} align={"center"} style={{color: "#785494"}}>{Constants.SELECTED_CONSUMER_GROUP(props.consumerGroup)}</Typography>
                        <Typography variant={"h6"} align={"center"} style={{color: "#8BBF9F"}}>{Constants.SELECTED_TOPIC(props.topic)}</Typography>
                        <Typography variant={"h6"} align={"center"} display={"block"}>{props.subheader}</Typography>
                    </Grid>
                </Grid>
                <Divider/>
            </Container>
            <LagGraph lags={lags} boundaries={boundaries}/>
        </div>
    )

}

export default Lag;