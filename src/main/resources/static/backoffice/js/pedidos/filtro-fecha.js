function loadFiltrosFecha(estado){
	$('input[name="sol-anterior"]').first().datepicker(global.jsonDatepicker);
	$('input[name="sol-anterior"]').first().parent().find('button').prop('disabled',true);
	$('input[name="sol-anterior"]').first().parent().find('button').hide();
	$('input[name="sol-anterior"]').last().datepicker(global.jsonDatepicker);
	$('input[name="sol-anterior"]').last().parent().find('button').prop('disabled',true);	
	$('input[name="sol-anterior"]').last().parent().find('button').hide();
	$('input[name="sol-posterior"]').first().datepicker(global.jsonDatepicker);
	$('input[name="sol-posterior"]').first().parent().find('button').prop('disabled',true);
	$('input[name="sol-posterior"]').first().parent().find('button').hide();
	$('input[name="sol-posterior"]').last().datepicker(global.jsonDatepicker);
	$('input[name="sol-posterior"]').last().parent().find('button').prop('disabled',true);
	$('input[name="sol-posterior"]').last().parent().find('button').hide();
	if(estado=="ENT"){
		$('input[name="ent-anterior"]').first().datepicker(global.jsonDatepicker);
		$('input[name="ent-anterior"]').first().parent().find('button').prop('disabled',true);
		$('input[name="ent-anterior"]').first().parent().find('button').hide();
		$('input[name="ent-anterior"]').last().datepicker(global.jsonDatepicker);
		$('input[name="ent-anterior"]').last().parent().find('button').prop('disabled',true);	
		$('input[name="ent-anterior"]').last().parent().find('button').hide();
		$('input[name="ent-posterior"]').first().datepicker(global.jsonDatepicker);
		$('input[name="ent-posterior"]').first().parent().find('button').prop('disabled',true);
		$('input[name="ent-posterior"]').first().parent().find('button').hide();
		$('input[name="ent-posterior"]').last().datepicker(global.jsonDatepicker);
		$('input[name="ent-posterior"]').last().parent().find('button').prop('disabled',true);	
		$('input[name="ent-posterior"]').last().parent().find('button').hide();
		
	} else {
		$('.filtro-fecha-entrega').hide();
	}
	$('div.ui-datepicker').css("font-size", "62%");
	$('div[role="wrapper"]').css('padding','5%');
	$('.text-filtro-fecha').css('border-radius','.25rem');
	
}

$('#open-filtro-fecha-label').click(function(){
	 if($(this).attr('toggle')==='off'){
	    	$('.filtro-fecha-div').slideDown();
	        $(this).attr('toggle','on');
	    }
	    else {
	    	$('.filtro-fecha-div').slideUp();
	        $(this).attr('toggle','off');
	    }
})


$(document).ready(function(){
    $(".rd").on('click', function() {
        var id = $(this).attr("id");
        var parent = $(this).parent();
        var textos = parent.parent().find('.text-filtro-fecha');
        textos.val('');
        textos.attr('disabled','disabled');
        textos.parent().find('button').prop('disabled',true);	
        textos.parent().find('button').hide();	

        var obj = parent.find('input.enable-text-' + id);
        if(obj.attr("disabled")==='disabled'){
            obj.removeAttr('disabled');
            obj.parent().find('button').prop('disabled',false);	
            obj.parent().find('button').show();
        } 
    });
});

$(document).ready(function(){
    $('.chk-fecha').on('click', function() {
        if($(this).prop("unchecked")==false){
            $(this).prop('unchecked',true);
            $(this).parent().parent().find('.rd').attr('disabled','disabled');
            var textos = $(this).parent().parent().find('.text-filtro-fecha');
            textos.attr('disabled','disabled');
            textos.val('');
            $(this).parent().parent().find('button').hide();
        } else {
            $(this).prop('unchecked',false);
            $(this).parent().parent().find('.rd').removeAttr('disabled');
        }
    });
});

$(document).ready(function(){
    $('.text-filtro-fecha').on('change', function() {
        var cant = $(this).val();
        if(cant<0){
            $(this).val(0);
        }
    });
});

function getFechaHoy () {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return day + "/" + month + "/" + year;
}

function formatFechaToDate(fecha){

	var fechaVec = fecha.split('/');
	var day = "" + fechaVec[0] ;
    var month = fechaVec[1];
    var year = fechaVec[2];

    return year + "-" + month + "-" + day;
}

function aplicarFiltroFecha(estadoPedido){
    var formText = {};
    var formChk = {};
    var inputsFechas = $('#filtro-fecha-form input.text-filtro-fecha').serializeArray();
    $.each(inputsFechas, function (i, input) {
        formText[input.name] = input.value;
    });
    var isValid = true;
    
    $.each(formText, function (i, input) {
        if(input===""){
        	alert("Ingrese una fecha valida");
        	isValid = false;
        	return false;
        }
    });

    if(!isValid) return;
    
    var inputsChk = $('#filtro-fecha-form .chk-fecha').serializeArray();
    $.each(inputsChk, function (i, input) {
        formChk[input.name] = input.value;
    });

    if(formChk["fecha-solicitud"]){
        if(formText["sol-anterior"]){
            var fechaSolAnterior = formText["sol-anterior"];
        } else var fechaSolAnterior = "";
        if(formText["sol-posterior"]){
            var fechaSolPosterior = formText["sol-posterior"];
        } else var fechaSolPosterior = "";    
    } else {
        var fechaSolAnterior = "";
        var fechaSolPosterior = "";
    }
    if(estadoPedido == "ENT"){
	    if(formChk["fecha-entrega"]){
	        if(formText["ent-anterior"]){
	            var fechaEntAnterior = formText["ent-anterior"];
	        } else var fechaEntAnterior = "";
	        if(formText["ent-posterior"]){
	            var fechaEntPosterior = formText["ent-posterior"];
	        } else var fechaEntPosterior = "";  
	    } else {
	        var fechaEntAnterior = "";
	        var fechaEntPosterior = ""; 
	    }
    }

    var dataReq = {};
    dataReq.fechaSolicitudHasta = fechaSolAnterior;
    dataReq.fechaSolicitudDesde = fechaSolPosterior;
    dataReq.fechaEntregaHasta = fechaEntAnterior;
    dataReq.fechaEntregaDesde = fechaEntPosterior;
    dataReq.estado = global.estado;
    var loadingModal = document.querySelector('.loading-modal');

    if (!loadingModal) {
        loading();
    }
    
    document.body.classList.add('loading');
	
    $.ajax({
		  type: "POST",
		  url: global.context + "/backoffice/getPedidosFilt",
		  data: dataReq,
		  success: loadPedidos
		});
    
}

function loadPedidos(data) {
	global.data.pedidos = data.pedidos;
	global.estado = data.estadoPedido.code;
	document.body.classList.remove('loading');
	makeListPedidos(data.pedidos, global.estado, false)	
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