import {useEffect, useState} from "react";
import {
    ButtonBase,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    Icon,
    Stack,
    Typography
} from "@mui/material";
import DnsIcon from '@mui/icons-material/Dns';
import axios from "axios";
import Requester from "../Utils/Requester";

function Cluster(props) {
    const [clusters, setClusters] = useState([])

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
            {clusters.map(cluster => <Grid item padding={2} xs={3} key={cluster.id}>
                <ButtonBase sx={{width: "100%"}} onClick={event => props.nextStep(cluster)}>
                    <Card style={styles.card}>
                        <CardHeader component={DnsIcon} sx={{fontSize: 120, margin: "auto"}} />
                        <CardContent>
                            <Typography variant={"h5"}>{cluster.name}</Typography>
                            <Typography variant={"body2"}>{cluster.description}</Typography>
                            <Typography variant={"body2"}>{cluster.env}</Typography>
                            <Typography variant={"body2"}>{cluster.address}</Typography>
                        </CardContent>
                    </Card>
                </ButtonBase>
            </Grid>)}
        </Grid>

    async function getClusters() {
        await Requester.GET_CLUSTERS().then(response => {
            setClusters(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        props.setLoading(true)
        getClusters()
        props.setLoading(false)
    },[])

    return (
        <div className="Cluster">
            <Container>
                <Grid container justifyContent={"center"} style={styles.subheader}>
                    <Grid item xs={12}>
                        <Typography variant={"h4"} align={"center"} display={"block"}>{props.header}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} align={"center"} display={"block"}>{props.subheader}</Typography>
                    </Grid>
                </Grid>
                <Divider/>
                {cards}

            </Container>
        </div>
    );
}

export default Cluster;