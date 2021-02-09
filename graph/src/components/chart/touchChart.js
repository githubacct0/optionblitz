import React, { useState, useEffect, useRef } from "react";
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import fullScreen from "highcharts/modules/full-screen";
import PriceIndicator from "highcharts/modules/price-indicator";

import TextInput from "../textInput/textInput";
import PrimaryButton from "../buttons/primaryButton";
import "./chart.css"
import axios from "axios";

fullScreen(Highcharts);
PriceIndicator(Highcharts);
require("highcharts/highcharts-more")(Highcharts);
require("highcharts/modules/annotations")(Highcharts);
require("highcharts/modules/data")(Highcharts)

const TouchChart = () => {

        const [tab, setTab] = useState("visual");
		const [data, setData] = useState([]);
		const [action_points, setAction] = useState([]);
		const [band_points, setBand] = useState([]);

		const [chartType, setChartType] = useState(["areaspline", "column"])
		const [currentChartIndex, setCurrentChartIndex] = useState(0);
		const [showTechnicalAnalysisModal, setShowTechnicalAnalysisModal] = useState(false);
		const [isIndicator, setIsIndicator] = useState(false);
		const [indicator, setIndicator] = useState("");
		const chartRef = useRef();

		const [rangeSelector, setRangeSelector] = useState("");
		const [emaPeriod, setEMAPeriod] = useState();
		const [selectedIndicators, setSelectedIndicators] = useState([]);

		var now = new Date();
		var maxValue = 50000;
		const options = {

				credits: {
						enabled: false
				},
				title: {
						text: ''
				},
				chart: {
                    backgroundColor: "transparent",
                    panning: true,
                    styledMode: false,
                    spacing: [0, 0, 0, 0],
                    zoomType: 'xy',
                    height: 250,
                    style:{
                        fontFamily: "Conthrax"
                    }
				},
				showInNavigator: false,
				navigator: {
                    enabled: false
				},
				scrollbar: {
                    enabled: false
				},
				lang: {
					rangeSelectorZoom: ""
				},

				xAxis: [{
					gridLineColor: "#D2D2D2",
					gridLineWidth: 0,
					tickLength: 0,
					lineWidth: 0,
					crosshair:{
						color: 'rgba(200,200,200,0.7)',
						width: 0,
					},
                    lineWidth: 0,
                    visible: false,
				}],
				yAxis: [
					{
						gridLineColor: "#D2D2D2",
						gridLineWidth: 0,
						crosshair:{
							width: 0,
                        },
                        lineWidth: 0,
                        visible: false,
					}
				],

				tooltip: {
					backgroundColor: '#000',
					style: {
						color: '#fff',
                    },
                    className: 'tooltip-custom',
					crosshairs: false,
					headerFormat: "<span class='tooltip-header'>BITCOIN PRICE</span><br>",
					headerShape: "square",
					pointFormat: "<span class='tooltip-content'><small>$</small>{point.y}</span>",
                    // pointFormatter: (x) => {
					// 	return x;
                    // },
                    positioner: (x,y,point) => {
                        return {x: 15, y: 0};
                    },
                    // formatter: (th)=>{
                    //     console.log(th);
                    //     return th.y;
                    // },
                    padding: 0,
                    split: false,
                    useHTML: true
				},
				rangeSelector: {
                    enabled: false,
                    inputEnabled: false,
                    //floating: true,
                    selected: 0
				},
				
				series: [
					{
						type: chartType[currentChartIndex],

						showInNavigator: true,

						id: 'chartID',
						tooltip: {
								valueDecimals: 2
						},
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0, '#03B27966'],
								[1, '#096e560a']
							]
						},

						data: [...data],
						marker: {
							symbol: 'circle'
                        },

                    },
                    {
                        type: 'column',

                        showInNavigator: true,

                        id: 'chartColumn',
                        tooltip: {
                            valueDecimals: 2
                        },
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#03B27966'],
                                [1, '#096e560a']
                            ]
                        },

                        data: [...data],
                    }

				],
				colors: ["#00CD86"],

		}


		const handleFullScreen = () => {
				chartRef.current.chart.fullscreen.toggle();;
				chartRef.current.chart.PriceIndicator.show();
		}
		const handleToggleChartType = () => {
				if (currentChartIndex < 1) {
						setCurrentChartIndex(currentChartIndex + 1);
				} else {
						setCurrentChartIndex(0);
				}
		}
		const handleAddTechnicalAnalysis = async (val) => {
				let tmp = await selectedIndicators.filter((item) => {
						return item != val;
				});
				setSelectedIndicators([...tmp, val]);
				let obj = {
						type: 'ema',
						linkedTo: 'chartID',
						params: {
								period: emaPeriod
						}
				};
				console.log("new object 105 ==============", obj)
				let series = options.series;
				options.series = [...series, obj];
				console.log(options)
				setShowTechnicalAnalysisModal(false);
		}
		const handleRangeSelector = () => {
				let upperLimit = new Date();
				let lowerLimit = new Date();

				if (rangeSelector === "3 h") {
						lowerLimit.setHours(upperLimit.getHours() - 3);

				}

		};
		const handleNumberFormat = (num) => {
			if(num<10){
				return '0'+num;
			}
			return num;
		}
		useEffect(() => {
				async function getData() {
					// 
					let today = new Date();
					let start = new Date(today.getTime() - (2 * 24 * 60 * 60 * 1000));
					let start_date = start.getUTCFullYear() + '-' + handleNumberFormat(start.getUTCMonth()+1) + '-'+handleNumberFormat(start.getUTCDate()) + '-00:00';
					let end_date = today.getUTCFullYear() + '-' + handleNumberFormat(today.getUTCMonth()+1) + '-'+handleNumberFormat(today.getUTCDate()) + '-' + handleNumberFormat(today.getUTCHours()) + ":" + handleNumberFormat(today.getUTCMinutes());
					console.log(start_date);
					console.log(end_date);
					let endpoint = "https://marketdata.tradermade.com/api/v1/timeseries?currency=BTCUSD&api_key=eaXvcEwUpmUhGdSxeNB5&start_date="+start_date+"&end_date="+end_date+"&format=records&interval=minute&period=5"
					await axios.get(endpoint).then((res) => {
						console.log("res", res.data)
						let max_val = 0;
						const data = res.data.quotes.map((x)=>{
							if(x.high > max_val) max_val = x.high;
							return [new Date(x.date).getTime(), x.open, x.high, x.low, x.close];
						})
						console.log(data);
						setData(data);
						let maxValue = Math.ceil(max_val/(Math.pow(10, (max_val.toFixed().length-1)))) * Math.pow(10, (max_val.toFixed().length-1));
						
						options.yAxis.max = maxValue;
						console.log(maxValue);
						let action_points = [{
							y: maxValue,
							x: data[data.length-1][0],

							marker: {
									symbol: 'url(/assets/images/stopWatch.png)'
							}
							}, {
								y: maxValue,
								x: now.getTime(),
								marker: {
										symbol: 'url(/assets/images/redFlag.png)'
								}
							}];
						setAction(action_points)

						let band_points = [
								{ // mark the weekend
									color: '#59648A',
									from: data[data.length-1][0],
									to: data[data.length-1][0],
									thickness: "15%"
								}, { // mark the weekend
									color: 'red',
									from: now.getTime(),
									to: now.getTime(),
									thickness: "15%"
								}
							];
						setBand(band_points)
					}).catch((err) => {
							console.log(err);
					})
				};
				getData();

        }, []);
        useEffect(() => {

        }, [tab]);
		return (
            <div className="touchChart">
                <div className="tabs_wrapper">
                    <span className={tab === "visual" ? "trades_tab_active" : "trades_tab"} onClick={() => { setTab("visual"); }}>
                        Visual
                    </span>
                    <span className={tab === "chart" ? "trades_tab_active" : "trades_tab"} onClick={() => { setTab("chart"); }}>
                        Chart
                    </span>
                </div>
                {tab === 'visual' ?
                <div class='touch_visual'>
                    <img src="/assets/images/touchchart.gif"/>
                </div>
                :
				<div id="chart_container">
						
						<HighchartsReact
								highcharts={Highcharts}
								options={options}
								constructorType="stockChart"
								ref={chartRef}
								immutable={true}
						/>
                        <div className="button_wrapper">

                            <div className="indicaters_wrapper" onClick={() => { setShowTechnicalAnalysisModal(true); }}>
                                <img src="/assets/images/linechart.png" />
                            </div>
                            <div className="toggle_chart_wrapper" id="expand_btn" onClick={handleToggleChartType}>
                                <img src="/assets/images/help.png" />
                            </div>
                            <div className="expand_wrapper" id="expand_btn" onClick={handleFullScreen}>
                                <img src="/assets/images/search.png" />
                            </div>
                        </div>

				</div>
                }
            </div>
		);

};

export default TouchChart;  