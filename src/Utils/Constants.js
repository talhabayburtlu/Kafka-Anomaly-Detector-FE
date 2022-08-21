class Constants {
    static MAIN_COLOR = "#F7641F"
    static WHITE_COLOR = "#FFFFFF"

    static CLUSTER_STEP_HEADER = "Cluster"
    static CLUSTER_STEP_SUBHEADER = "Select a cluster to analyze."
    static CONSUMER_GROUP_STEP_HEADER = "Consumer Group"
    static CONSUMER_GROUP_STEP_SUBHEADER = "Select a consumer group to analyze."
    static TOPIC_STEP_HEADER = "Topic"
    static TOPIC_STEP_SUBHEADER = "Select a topic to analyze."
    static LAG_GRAPH_STEP_HEADER = "Lag Graph"
    static LAG_GRAPH_STEP_SUBHEADER = "Lags between selected topic and consumer group can be seen from graph."

    static CLUSTERS_ENDPOINT = "/clusters/"

    static SELECTED_CLUSTER = (cluster) => {
        return "Selected Cluster: " + cluster;
    }

    static SELECTED_CONSUMER_GROUP = (consumerGroup) => {
        return "Selected Consumer Group: " + consumerGroup;
    }

    static SELECTED_TOPIC = (topic) => {
        return "Selected Topic: " + topic;
    }

}

export default Constants;