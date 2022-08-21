import {useEffect, useState} from "react";
import axios from "axios";
import {Container, Divider, Grid, IconButton, Typography} from "@mui/material";
import {
    Baseline,
    Charts,
    ChartContainer,
    ChartRow,
    EventMarker,
    Resizable,
    YAxis,
    LineChart,
    Legend
} from "react-timeseries-charts";
import {TimeSeries} from "pondjs";
import CrossHairs from "./CrossHairs"
import styler from "react-timeseries-charts/lib/js/styler";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Constants from "../Utils/Constants";
import Requester from "../Utils/Requester";

function Lag(props) {
    const [series , setSeries] = useState(null)
    const [boundaries , setBoundaries] = useState(null)
    const [highlight, setHighlight] = useState("")
    const [selection , setSelection] = useState(null)
    const [tracker , setTracker] = useState(null)
    const [trackerEventTime , setTrackerEventTime] = useState(null)
    const [trackerEvent , setTrackerEvent] = useState(null)
    const [trackerValue, setTrackerValue] = useState(null)
    const [x, setX] = useState(null)
    const [y, setY] = useState(null)
    const [timerange, setTimerange] = useState(null)
    const [lagValue, setLagValue] = useState(null)
    const [graphBoundaries , setGraphBoundaries] = useState(null)

    const styles = {
        subheader: {
            margin: "25px 0px"
        },
        graphContainer: {
            margin: "50px auto",
        },
    }

    const graphStyle = styler([
        { key: "lag", color: "steelblue", width: 2 }
    ]);

    const handleTrackerChanged = t => {
        setTracker(t)
        if (!t) {
            setX(null)
            setY(null)
            setTrackerEventTime(null)
        } else {
            const e = series.at(series.bisect(t))
            const eventValue = e.get("lag");
            const v = `${eventValue > 0 ? "+" : ""}${eventValue}`;
            setTrackerValue(v)
            setTrackerEvent(e)
            setTrackerEventTime(new Date(
                e.begin().getTime() + (e.end().getTime() - e.begin().getTime()) / 2
            ));


            setLagValue(series.at(series.bisect(t)).get("lag"))
        }
    };

    const buildSeries = (lags, boundaries) => {
        if (lags === undefined || lags === null)
            return
        const points = []
        let max = Number.MIN_VALUE, min = Number.MAX_VALUE;
        lags.forEach(lag => {
            if (lag.value > max)
                max = lag.value
            if (lag.value < min)
                min = lag.value

            points.push([(new Date(lag.timestamp)).getTime(), lag.value])
        })

        if (boundaries && boundaries.lower < min)
            min = boundaries.lower
        if (boundaries && boundaries.upper > max)
            max = boundaries.upper

        setGraphBoundaries({max,min})
        const newSeries = new TimeSeries({
            name: "Lags",
            columns: ["time" , "lag"],
            points
        });
        setSeries(newSeries)
        setTimerange(newSeries.range())
    }

    const renderMarker = () => {
        if (!trackerEventTime)
            return (<g />)

        return (<EventMarker
            type="flag"
            axis="y"
            event={trackerEvent}
            column="lag"
            info={[{ label: "Lag", value: trackerValue }]}
            infoWidth={100}
            markerRadius={2}
            markerStyle={{ fill: "black" }}
        />)
    }


    useEffect(() => {
        buildSeries(props.lags, props.boundaries)
    },[props])

    return (
        <div className={"LagGraph"}>
            {(series === null || series.size() === 0) && <Container style={styles.graphContainer}>
                <Typography variant={"h6"} align={"center"} display={"block"}>No lags found.</Typography>
            </Container>}

            {series !== null && series.size() !== 0 && <Container style={styles.graphContainer}>
                    <Resizable>
                        <ChartContainer
                            timeRange={timerange}
                            timeAxisStyle={{
                                ticks: {
                                    stroke: "#AAA",
                                    opacity: 0.5,
                                    "stroke-dasharray": "1,1"
                                },
                                values: {
                                    fill: "#AAA",
                                    "font-size": 15
                                }
                            }}
                            paddingRight={100}
                            timeAxisAngledLabels={true}
                            timeAxisHeight={65}
                            onTrackerChanged={handleTrackerChanged}
                            onBackgroundClick={() => setSelection(null)}
                            enablePanZoom={true}
                            onTimeRangeChanged={(timerange) => setTimerange(timerange)}
                            onMouseMove={(x,y) => {setX(x); setY(y)}}
                        >
                            <ChartRow height="400">
                                <YAxis
                                    id="y"
                                    label="Lag"
                                    min={graphBoundaries.min}
                                    max={graphBoundaries.max}
                                    style={{
                                        ticks: {
                                            stroke: "#AAA",
                                            opacity: 0.5,
                                        },
                                        values: {
                                            fill: "#AAA",
                                            "font-size": 15
                                        }
                                    }}
                                    showGrid
                                    hideAxisLine
                                    width="50"
                                    type="linear"
                                    format={".19d"}
                                />
                                <Charts>
                                    <LineChart
                                        axis="y"
                                        breakLine={false}
                                        series={series}
                                        style={graphStyle}
                                        columns={["lag"]}
                                        interpolation="curveLinear"
                                        smooth={false}
                                        highlight={highlight}
                                        onHighlightChange={change => setHighlight(change)}
                                        selection={selection}
                                        onSelectionChange={change => setSelection(change)}
                                    />
                                    <CrossHairs x={x} y={y} />
                                    <Baseline
                                        style = {{label: { fill: "#ad3232", fontWeight: 600, fontSize: 12, pointerEvents: "none" },
                                            line: { stroke: "#ad3232", strokeWidth: 2, strokeDasharray: "5,3", pointerEvents: "none" }}}
                                        axis="y"
                                        value={boundaries ? boundaries.lower : 0}
                                        label="Lower Bound"
                                        position="right"
                                        visible={boundaries !== null}/>
                                    <Baseline
                                        style = {{label: { fill: "#ad3232", fontWeight: 600, fontSize: 12, pointerEvents: "none" },
                                            line: { stroke: "#ad3232", strokeWidth: 2, strokeDasharray: "5,3", pointerEvents: "none" }}}
                                        axis="y"
                                        value={boundaries ? boundaries.upper : 0}
                                        label="Upper Bound"
                                        position="right"
                                        visible={boundaries !== null}/>
                                    {renderMarker()}
                                </Charts>
                            </ChartRow>
                        </ChartContainer>
                    </Resizable>
                {<Legend
                    type="line"
                    align="right"
                    style={graphStyle}
                    highlight={highlight}
                    onHighlightChange={change => setHighlight(change)}
                    selection={selection}
                    onSelectionChange={change => setSelection(change)}
                    categories={[
                        { key: "lag", label: "lag", value: lagValue },
                    ]}
                />}
            </Container> }


        </div>
    )

}

export default Lag;