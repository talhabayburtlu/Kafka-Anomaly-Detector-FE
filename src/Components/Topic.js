import {useEffect, useState} from "react";
import {
    ButtonBase,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    Icon, IconButton,
    Stack,
    Typography
} from "@mui/material";
import TopicIcon from '@mui/icons-material/Topic';
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Constants from "../Utils/Constants";
import Requester from "../Utils/Requester";

function Topic(props) {
    const [topics, setTopics] = useState([])

    const styles = {
        subheader: {
            margin: "25px 0px"
        },
        cardContainer: {
            margin: "50px 0px",
        },
        card: {
            width: "100%",
            height: "100%",
        }
    }

    const cards =
        <Grid container style={styles.cardContainer}>
            {topics.map(topic => <Grid item padding={2} xs={3} key={topic}>
                <ButtonBase sx={{width: "100%"}} onClick={event => props.nextStep(topic)}>
                    <Card style={styles.card}>
                        <CardHeader component={TopicIcon} sx={{fontSize: 120, margin: "auto"}} />
                        <CardContent>
                            <Typography variant={"h5"}>{topic}</Typography>
                        </CardContent>
                    </Card>
                </ButtonBase>
            </Grid>)}
        </Grid>

    async function getTopics() {
        await Requester.GET_TOPICS(props.cluster.id, props.consumerGroup).then(response => {
            setTopics(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        props.setLoading(true);
        getTopics();
        props.setLoading(false);
    },[])

    return (
        <div className="Topic">
            <Container>
                <Grid container justifyContent={"center"} style={styles.subheader}>
                    <Grid item xs={12}>
                        <IconButton onClick={() => props.previousStep(1)}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h4"} align={"center"} display={"block"}>{props.header}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} align={"center"} style={{color: "#EA4362"}}>{Constants.SELECTED_CLUSTER(props.cluster.name)}</Typography>
                        <Typography variant={"h6"} align={"center"} style={{color: "#785494"}}>{Constants.SELECTED_CONSUMER_GROUP(props.consumerGroup)}</Typography>
                        <Typography variant={"h6"} align={"center"} display={"block"}>{props.subheader}</Typography>
                    </Grid>
                </Grid>
                <Divider/>
                {cards}
            </Container>
        </div>
    );
}

export default Topic;