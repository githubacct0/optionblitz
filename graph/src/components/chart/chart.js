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

const Chart = () => {

		const [data, setData] = useState([]);
		const [action_points, setAction] = useState([]);
		const [band_points, setBand] = useState([]);

		const [chartType, setChartType] = useState(["areaspline", "candlestick"])
		const [currentChartIndex, setCurrentChartIndex] = useState(0);
		const [showTechnicalAnalysisModal, setShowTechnicalAnalysisModal] = useState(false);
		const [isIndicator, setIsIndicator] = useState(false);
		const [indicator, setIndicator] = useState("");
		const chartRef = useRef();

		const [rangeSelector, setRangeSelector] = useState("");
		const [emaPeriod, setEMAPeriod] = useState();
		const [selectedIndicators, setSelectedIndicators] = useState([]);

		var now = new Date();
		const drawRectangle = (chart) => {
				chart.renderer.rect(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()), 200, 100, 100, 5)
						.attr({
								'stroke-width': 2,
								stroke: 'red',
								fill: 'yellow',
								zIndex: 3
						})
						.add();
		}
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
						spacing: [5, 5, 5, 5],
						zoomType: 'xy'

				},
				showInNavigator: false,
				navigator: {
						enabled: false
				},
				scrollbar: {
						enabled: false
				},
				// plotOptions: {
				// 		areaspline: {
				// 				fillOpacity: 0.5
				// 		},
				// 		series: {
				// 				zones: [{
				// 						value: Date.UTC(),
				// 						className: 'zone-0'
				// 				}, {
				// 						value: 100,
				// 						className: 'zone-1'
				// 				}, {
				// 						className: 'zone-2'
				// 				}],
				// 				threshold: 10
				// 		}
				// },
				lang: {
					rangeSelectorZoom: ""
				},
				plotOptions: {
					candlestick: {
						color: '#1A223D',
						upColor: '#39967B',
					},
					series: {
						lineColor: '#00CD86'
					}
				},

				xAxis: [{
					//marginRight: 20,
					gridLineColor: "#D2D2D2",
					gridLineWidth: 0.1,
					//showEmpty: true,
					//height: "100%",
					tickLength: 0,
					lineWidth: 0,
					crosshair:{
						color: 'rgba(200,200,200,0.7)',
						width: 2,
					},
					plotBands: [...band_points],
				}],
				yAxis: [
					{
						gridLineColor: "#D2D2D2",
						gridLineWidth: 0.1,
						crosshair:{
							color: '#03B279',
							width: 2,
						},
					}
				],

				tooltip: {
					crosshairs: [true,true],
					backgroundColor: '#03B279',
					borderColor: '#03B279',
					shadow: false,
					style: {
						color: '#fff',
					},
					//footerFormat: "sdfsdf ds{point.x}",
					//headerFormat: "<div class='tooltip-header'>{point.x}</div>",//new Date("{point.x}").getUTCHours()+":"+new Date("{point.x}").getUTCMinutes(),
					headerShape: "square",
					padding: 2,
					pointFormat: "{point.y}",
					pointFormater: (point) => {
						console.log(point);
						return point;
					},
					// positioner: (x,y, point)=>{
					// 	console.log(point);
					// 	console.log(x);
					// 	console.log(y);
					// 	return {x: x, y: y};
					// },
					shape: "callout",
					split: true,
					xDateFormat: "%H:%M"
				},
				rangeSelector: {
						enabled: true,
						inputEnabled: false,
						buttonSpacing: 25,
						buttonPosition: {
								align: "center"
						},
						buttonTheme: {

								fill: 'none',
								stroke: 'none',
								'stroke-width': 0,
								width: 45,
								states: {
										hover: {
										},
										select: {
												fill: 'none',
												style: {
														color: '#00CD86'
												}
										}
										// disabled: { ... }
								},
								style: {
										color: "#59648A",
										backgroundColor: "transparent",
										width: 100,
										textAlign: "center",
										border: "red"
								},

						},
						buttons: [{
							count: 5,
							type: 'minute',
							text: '1m'
						}, {
							count: 30,
							type: 'minute',
							text: '6m'
						}, {
						count: 6,
						type: 'hour',
						text: '3h'
						}, {
						count: 12,
						type: 'hour',
						text: '6h'
						}, {
						count: 24,
						type: 'hour',
						text: '12h'
						}, {
						count: 36,
						type: 'hour',
						text: '18h'
						}, {
						count: 3,
						type: 'day',
						text: '3d'
						}],
						buttonPosition:{
							align: 'left',
							x: -3,
							y: 0
						},
						buttonSpacing: 0,
						labelStyle:{
							display: 'none'
						},
						inputEnabled: false,
						//floating: true,
						selected: 0
				},
				
				series: [
					{
						type: "scatter",

						data: [...action_points],
						enableMouseTracking: false,
						opacity: 1,
						zIndex: 1000
					},
					// {
					// 		type: "arearange",
					// 		// backgroundColor: "red",
					// 		lineColor: "transparent",
					// 		fillOpacity: 0.1,
					// 		borderWidth: 0,
					// 		data: [
					// 				{
					// 						x: Date.UTC(),
					// 						high: 220,
					// 						low: 80,
					// 				},
					// 				{
					// 						x: Date.UTC(),
					// 						high: 220,
					// 						low: 80
					// 				}
					// 		],
					// 		zones: [
					// 				{ value: Date.UTC(), color: "rgba(39, 145, 178, 1)", fillOpacity: 0.1 }
					// 		],

					// }, {
					// 		type: "arearange",

					// 		// backgroundColor: "red",
					// 		fillOpacity: 0.1,
					// 		borderWidth: 0,
					// 		data: [
					// 				{
					// 						x: Date.UTC(),
					// 						high: 8000,
					// 						low: 0,
					// 				},
					// 				{
					// 						x: Date.UTC(),
					// 						high: 8000,
					// 						low: 0
					// 				}
					// 		],
					// 		zones: [
					// 				{ value: Date.UTC(), color: "rgba(255, 28, 41,1)", fillOpacity: 0.1 }
					// 		],

					// },
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

						// lastVisiblePrice: {
						// 		enabled: true,
						// 		color: '#00CD86'
						// },
						// colors: ["#00CD86", "#091117"],
					},
					// {
					// 		lastPrice: {
					// 				color: "#00CD86",
					// 				enabled: true
					// 		},
					// 		lastVisiblePrice: {
					// 				enabled: true,
					// 				style: {
					// 						fill: "#00CD86"
					// 				},
					// 				label: {
					// 						enabled: true,
					// 				}
					// 		},
					// },


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
		return (
				<div id="chart_container">
						{/* <div className="range_selector_wrapper">
								<span className={rangeSelector === "1 m" ? "active_range_selector" : "custom_range_selector"} onClick={() => { setRangeSelector("1 m"); }}>1 m</span>
								<span className={rangeSelector === "6 m" ? "active_range_selector" : "custom_range_selector"} onClick={() => { setRangeSelector("6 m"); }}>6 m</span>
								<span className={rangeSelector === "3 h" ? "active_range_selector" : "custom_range_selector"} onClick={() => { setRangeSelector("3 h"); handleRangeSelector(); }}>3 h</span>
								<span className={rangeSelector === "6 h" ? "active_range_selector" : "custom_range_selector"} onClick={() => { setRangeSelector("6 h"); }}>6 h</span>
								<span className={rangeSelector === "12 h" ? "active_range_selector" : "custom_range_selector"} onClick={() => { setRangeSelector("12 h"); }}>12 h</span>
								<span className={rangeSelector === "18 h" ? "active_range_selector" : "custom_range_selector"} onClick={() => { setRangeSelector("18 h"); }}>18 h</span>
								<span className={rangeSelector === "3 d" ? "active_range_selector" : "custom_range_selector"} onClick={() => { setRangeSelector("3 d"); }}>3 d</span>
						</div> */}
						<HighchartsReact
								highcharts={Highcharts}
								options={options}
								constructorType="stockChart"
								ref={chartRef}
								immutable={true}
						/>
						<div className="button_wrapper">

							<div className="indicaters_wrapper" onClick={() => { setShowTechnicalAnalysisModal(true); }}>
								<img src="/assets/images/technicalIndicators.png" />
							</div>
							<div className="toggle_chart_wrapper" id="expand_btn" onClick={handleToggleChartType}>
								<img src="/assets/images/switchChart.png" />
							</div>
							<div className="expand_wrapper" id="expand_btn" onClick={handleFullScreen}>
								<img src="/assets/images/expand.png" />
							</div>
						</div>
						{showTechnicalAnalysisModal === true ?
								<div className="indicators_modal">
										<div className="indicators_modal_header">
												<img src="/assets/images/leftArrowWhite.png" onClick={() => { setShowTechnicalAnalysisModal(false) }} />
												<span className="technical_indicators_header_title">technical indicators</span>
										</div>

										<div className="technical_indicators_list">
												{isIndicator === false ?
														<React.Fragment>
																<span className="technical_indicator" onClick={() => { setIndicator("ema"); setIsIndicator(true); }}>ema</span>
																<span className="technical_indicator" onClick={() => { setIndicator("macd"); setIsIndicator(true); }}>macd</span>
																<span className="technical_indicator" onClick={() => { setIndicator("bollinger bands"); setIsIndicator(true); }}>bollinger bands</span>
																<span className="technical_indicator" onClick={() => { setIndicator("fibonacci"); setIsIndicator(true); }}>fibonacci</span>
																<span className="technical_indicator" onClick={() => { setIndicator("ichimoku kinko hyo"); setIsIndicator(true); }}>ichimoku kinko hyo</span>
																<span className="technical_indicator" onClick={() => { setIndicator("rsi"); setIsIndicator(true); }}>rsi</span>
																<span className="technical_indicator" onClick={() => { setIndicator("stochastic"); setIsIndicator(true); }}>stochastic</span>
														</React.Fragment> :
														<React.Fragment>
																{indicator === "ema" ? <div className="indicator_wrapper">
																		<TextInput placeholder={"period"} onChange={(e) => { setEMAPeriod(e.target.value) }} value={emaPeriod} />
																		<PrimaryButton text="add" handleOnClick={() => { handleAddTechnicalAnalysis("ema"); }} />
																</div> : null}
																{indicator === "macd" ? <div></div> : null}
																{indicator === "bollinger bands" ? <div></div> : null}
																{indicator === "fibonacci" ? <div></div> : null}
																{indicator === "ichimoku kinko hyo" ? <div></div> : null}
																{indicator === "rsi" ? <div></div> : null}
																{indicator === "stochastic" ? <div></div> : null}
														</React.Fragment>}
										</div>
								</div> : null}

				</div>
		);

};

export default Chart;  