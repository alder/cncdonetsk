var chart;
$(document).ready(function () {
	//generation chart
	generationChart = new Highcharts.Chart({
		chart:{
			renderTo:'genTheoryContainer',
			type:'areaspline'
		},
		title:{
			text:'График умерших объектов за еденицу GC-времени'
		},
		xAxis:{
			type:'number',
			title:{
				text:'Сборки мусора'
			}
		},
		yAxis:{
			title:{
				text:'Объекты'
			},
			min:0,
			minorGridLineWidth:1,
			gridLineWidth:0,
			alternateGridColor:null,
			plotBands:[
				{//blue
					from:20,
					to:200,
					color:'rgba(0, 128, 52, 0.54)',
					label:{
						text:'',
						style:{
							color:'#606060',
							'font-size':'20px',
							'font-family':"'Ubuntu', arial, serif",
							'text align':'text-align: right',
							'opacity':'0.8'
						}
					}
				},
				{//yelow
					from:220,
					to:600,
					color:'rgb(255, 211, 25)',
					label:{
						text:'',
						style:{
							color:'#606060',
							'font-size':'20px',
							'font-family':"'Ubuntu', arial, serif",
							'text align':'text-align: right'
						}
					}
				},
				{ //red
					from:620,
					to:1500,
					color:'rgba(239, 95, 59, 0.54)',
					label:{
						text:'',
						style:{
							color:'#606060',
							'font-size':'15px',
							'font-family':"'Ubuntu', arial, serif",
							'text align':'text-align: right'
						}
					}
				}
			]
		},
		plotOptions:{
			spline:{
				lineWidth:6,
				states:{
					hover:{
						lineWidth:1
					}
				},
				marker:{
					enabled:false,
					states:{
						hover:{
							enabled:true,
							symbol:'circle',
							radius:5,
							lineWidth:1
						}
					}
				},
				pointInterval:0.2,
				pointStart:0
			}
		},
		series:[
			{
				name:'Умерших объектов',
				data:[0, 1200, 400, 200, 151, 104, 70, 47, 38, 0 ]
			}
		],
		navigation:{
			menuItemStyle:{
				fontSize:'20px'
			}
		}
	});
});