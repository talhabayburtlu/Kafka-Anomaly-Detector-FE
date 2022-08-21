import {useEffect, useState} from "react";
import {
    Button,
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
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import Constants from "../Utils/Constants";
import Requester from "../Utils/Requester";

function ConsumerGroup(props) {
    const [consumerGroups, setConsumerGroups] = useState([])

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
            {consumerGroups.map(consumerGroup => <Grid item padding={2} xs={3} key={consumerGroup}>
                <ButtonBase sx={{width: "100%"}} onClick={event => props.nextStep(consumerGroup)}>
                    <Card style={styles.card}>
                        <CardHeader component={GroupsIcon} sx={{fontSize: 120, margin: "auto"}} />
                        <CardContent>
                            <Typography variant={"h5"}>{consumerGroup}</Typography>
                        </CardContent>
                    </Card>
                </ButtonBase>
            </Grid>)}
        </Grid>

    async function getConsumerGroups() {
        await Requester.GET_CONSUMER_GROUPS(props.cluster.id).then(response => {
            setConsumerGroups(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        props.setLoading(true);
        getConsumerGroups();
        props.setLoading(false);
    },[])

    return (
        <div className="ConsumerGroup">
            <Container>
                <Grid container justifyContent={"center"} style={styles.subheader}>
                    <Grid item xs={12}>
                        <IconButton onClick={() => props.previousStep(0)}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h4"} align={"center"} display={"block"}>{props.header}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} align={"center"} style={{color: "#EA4362"}}>{Constants.SELECTED_CLUSTER(props.cluster.name)}</Typography>
                        <Typography variant={"h6"} align={"center"} display={"block"}>{props.subheader}</Typography>
                    </Grid>
                </Grid>
                <Divider/>
                {cards}
            </Container>
        </div>
    );
}

export default ConsumerGroup;