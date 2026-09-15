function toggleFiltros(id, idOtroFiltro){
    var filtroLabelId = '#open-filtro-'+id+'-label';
    var otroFiltroLabelId = '#open-filtro-'+idOtroFiltro+'-label';
    
    if($(filtroLabelId).attr('toggle')==='off'){
        $('.filtro-'+idOtroFiltro+'-form').slideUp();
        $('.filtro-'+id+'-form').slideDown();
        $(filtroLabelId).attr('toggle','on');
        $(otroFiltroLabelId).attr('toggle','off');
    }
    else {
        $('.filtro-'+id+'-form').slideUp();
        $(filtroLabelId).attr('toggle','off');
    }
}

function aplicarFiltroFormato(){
    var formObj = {};
    var inputs = $('#filtro-formato-form').serializeArray();
    $.each(inputs, function (i, input) {
        formObj[input.name] = input.value;
    });
    $('.tabla-macetas').hide();
    for (var key in formObj){
        $('#tabla-macetas-' + key).show();
    }
}

$(document).ready(function(){
    $(".rd").on('click', function() {
        var id = $(this).attr("id");
        var parent = $(this).parent();
        var textos = parent.parent().find('.text-filtro-tam');
        textos.val('');
        textos.attr('disabled','disabled');
        var obj = parent.children('.enable-text-' + id);
        if(obj.attr("disabled")==='disabled'){
            obj.removeAttr('disabled');
        } 
    });
});

$(document).ready(function(){
    $('.chk-tamano').on('click', function() {
        if($(this).prop("unchecked")==false){
            $(this).prop('unchecked',true);
            $(this).parent().parent().find('.rd').attr('disabled','disabled');
            var textos = $(this).parent().parent().find('.text-filtro-tam');
            textos.attr('disabled','disabled');
            textos.val('');

        } else {
            $(this).prop('unchecked',false);
            $(this).parent().parent().find('.rd').removeAttr('disabled');
            
        }
    });
});

$(document).ready(function(){
    $('.text-filtro-tam').on('change', function() {
        var cant = $(this).val();
        if(cant<0){
            $(this).val(0);
        }
    });
});

function aplicarFiltroTamano(){
    var formText = {};
    var formChk = {};
    var inputsNum = $('#filtro-tamano-form input[type=number]').serializeArray();
    $.each(inputsNum, function (i, input) {
        formText[input.name] = input.value;
    });
    $.each(formText, function (i, input) {
        if(input===""){
        	alert("Ingrese un valor numérico valido para el filtro");
        	return;
        }
    });

    var inputsChk = $('#filtro-tamano-form .chk-tamano').serializeArray();
    $.each(inputsChk, function (i, input) {
        formChk[input.name] = input.value;
    });

    if(formChk["largo"]){
        if(formText["lg-mayor"]){
            var largoMayor = Number(formText["lg-mayor"]);
        } else var largoMayor = 0;
        if(formText["lg-menor"]){
            var largoMenor = Number(formText["lg-menor"]);
        } else var largoMenor = 1000;    
    } else {
        var largoMayor = 0;
        var largoMenor = 1000;
    }
    if(formChk["ancho"]){
        if(formText["an-mayor"]){
            var anchoMayor = Number(formText["an-mayor"]);
        } else var anchoMayor = 0;
        if(formText["an-menor"]){
            var anchoMenor = Number(formText["an-menor"]);
        } else var anchoMenor = 1000;    
    } else {
        var anchoMayor = 0;
        var anchoMenor = 1000;
    }
    if(formChk["alto"]){
        if(formText["al-mayor"]){
            var altoMayor = Number(formText["al-mayor"]);
        } else var altoMayor = 0;
        if(formText["al-menor"]){
            var altoMenor = Number(formText["al-menor"]);
        } else var altoMenor = 1000;    
    } else {
        var altoMayor = 0;
        var altoMenor = 1000;
    }
    var macetas = $('.tabla-macetas').find('.row-maceta');
    macetas.each(function (i, input) {
        var valLargo = Number($(this).find('#lg').html());
        var valAncho = Number($(this).find('#an').html());
        var valAlto = Number($(this).find('#al').html());
        if(valLargo<largoMayor || valLargo>largoMenor || valAncho<anchoMayor || valAncho>anchoMenor || valAlto<altoMayor || valAlto>altoMenor){ 
            $(this).hide();
            $(this).removeClass('row-show');
        } else {
            $(this).show();
            $(this).addClass('row-show');
        }
    });
    borrarTablasSinResultados();
}

function borrarTablasSinResultados(){
    var tablas = $('.tabla-macetas');
    tablas.hide();
    tablas.each(function (i, input) {

        var macetas = $(this).find('.row-maceta');
        macetas.each(function (i, input) {
            if($(this).css('display')!='none'){
                $(this).parent().parent().parent().show();
                return;
            }
        });
    });
}

function toggle(source) {
    checkboxes = $('.chk-formato');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        checkboxes[i].checked = source.checked;
    }
}