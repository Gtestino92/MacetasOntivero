function plotData(datasets, graphLabels, plotType) {
	var ctx = $('#myChart')[0].getContext('2d');
	var myChart = new Chart(ctx, {
	    type: plotType,
	    data: {
	        labels: graphLabels,
	        datasets: datasets,
	        options: {
	            responsive: false,
	            maintainAspectRatio: true,
	            scales: {
	                yAxes: [
	                  {
	                    ticks: {
	                      beginAtZero: true,
	                      suggestedMin: 0,
	                      suggestedMax: 30
	                    },
	                  },
	                ],
	              }
	              
	        }
	    }
        
	});
	myChart.update();
}

function getDatasets(dataByFormato) {
	var datasets = [];
	for(var i=0;i<dataByFormato.length;i++){
		var dataObj = {};
		dataObj.label = dataByFormato[i].formato.value;
		dataObj.labelCod = dataByFormato[i].formato.code;
		dataObj.data = dataByFormato[i].values;
		//dataObj.backgroundColor = 'rgba(255, 99, 132, 0.2)';
		dataObj.borderColor = 'rgba(' + dataByFormato[i].color.r + ' ,' +  dataByFormato[i].color.g 
			+ ' , ' + dataByFormato[i].color.b + ', ' + 1 + ')';
		//(((Math.random() + Math.random())/2))
		dataObj.borderWidth = 3;
		datasets.push(dataObj);
	}
	return datasets;
}

function getListObjValuesNoErr(values) {
	listObj = [];
	var i;
	for(i=0;i<values.length;i++){
		obj = {};
		obj.y = Number(values[i]);
		listObj.push(obj);
	}
	return listObj;
}

$('#predictionsBtn').click(function(){
	var loadingModal = document.querySelector('.loading-modal');

    if (!loadingModal) {
        loading();
    }
    
    document.body.classList.add('loading');

	$.ajax({
		  type: "GET",
		  url: global.context + "/backoffice/getPredictions",
		  success: graphPredictions,
		  error: function(e) {
	            handleErrorPredictions(e);//TODO funcion handle
	        }
		});
})

function graphPredictions(dataPredict) {
	console.log(dataPredict);
	document.body.classList.remove('loading');
	$('#myChart').remove();
	$('.canvas-div').html('<canvas id="myChart" width="70" height="50"></canvas>');
	var fechaPredictFormat = new Intl.DateTimeFormat().format(new Date(dataPredict.fechaPredict));
	global.graphLabels.push(fechaPredictFormat);
	global.datasets.forEach(dataset => {
		dataset.data.push(
				getObjInterval(
						Number(dataPredict.dataByFormato[dataset.labelCod].valuePredict),
						Number(dataPredict.dataByFormato[dataset.labelCod].stdDev))
				);
		let strColor = 'rgba(' + dataPredict.dataByFormato[dataset.labelCod].color.r + ' ,' 
			+  dataPredict.dataByFormato[dataset.labelCod].color.g 
			+ ' , ' + dataPredict.dataByFormato[dataset.labelCod].color.b + ', ' + 1 + ')';
			dataset.errorBarColor = strColor;
		dataset.errorBarWhiskerColor = strColor;
		dataset.errorBarWhiskerLineWidth = 0;
		dataset.errorBarLineWidth = 0;
		}
	)
	plotData(global.datasets, global.graphLabels, 'lineWithErrorBars');
	//$('#predictionsBtn').hide();
}

function getObjInterval(val, stdDev) {
	obj = {};
	console.log(val + stdDev);
	obj.y = val;
	obj.yMax = val + stdDev;
	obj.yMin = val - stdDev;
	if(obj.yMin<0)
		obj.yMin = 0;
	return obj;
}

function handleErrorPredictions(e){
	console.log(e);
	// Abrir cartel o algo
}

function loading() {
    var div, table, img;

    div = createEls('div', {className: 'loading-modal'});
    table = createEls('table', {className: 'loading-table'});
    img = createEls('img', {className: 'loading-image', src: 'css/loading-spin.svg'});

    div.appendChild(table);
    table.appendChild(img);
    document.body.appendChild(div);
}

function createEls(name, props, text) {
    var el = document.createElement(name), p;
    for (p in props) {
        if (props.hasOwnProperty(p)) {
            el[p] = props[p];
        }
    }
    if (text) {
        el.appendChild(document.createTextNode(text));
    }
    return el;
}