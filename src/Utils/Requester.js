import axios from "axios";

class Requester {
    static GET_CLUSTERS = async () => {
        return await axios.create().get(process.env.REACT_APP_DOMAIN.concat("clusters/"))
    }

    static GET_CONSUMER_GROUPS = async (clusterId) => {
        return await axios.create().get(process.env.REACT_APP_DOMAIN.concat("clusters/").concat(clusterId).concat("/consumers"))
    }

    static GET_TOPICS = async (clusterId, consumerGroup) => {
        return await axios.create().get(process.env.REACT_APP_DOMAIN.concat("clusters/").concat(clusterId).concat("/consumers/").concat(consumerGroup))
    }

    static GET_LAGS = async (clusterId, consumerGroup, topic) => {
        return await axios.create().get(process.env.REACT_APP_DOMAIN.concat("clusters/").concat(clusterId).concat("/consumers/")
            .concat(consumerGroup).concat("/topics/").concat(topic).concat("/lags"))
    }

}

export default Requester;