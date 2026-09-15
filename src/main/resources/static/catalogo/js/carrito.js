function toggleCarrito(){
    var carrito = $('#carrito-card');
    var toggle = carrito.attr('toggle');
    if(toggle=='off'){
        carrito.slideDown();
        carrito.attr('toggle','on');
        if($('#open-filtro-formato-label').attr('toggle')==='on'){
            $('.filtro-formato-form').slideUp();
            $('#open-filtro-formato-label').attr('toggle','off');
        } else if ($('#open-filtro-tamano-label').attr('toggle')==='on'){
                $('.filtro-tamano-form').slideUp();
                $('#open-filtro-tamano-label').attr('toggle','off');
        }
    } else {
        carrito.slideUp();
        carrito.attr('toggle','off');
    }
}

$(document).ready(function(){
    $("[data-toggle='add-carrito']").on('click', function() {
        var toggle = $(this).attr('toggle');
        var cod_new = $(this).attr('cod-add');
        var maceta = getMacetaByCodNew(global.data,cod_new);
        var cod = maceta.codigo;
        if (toggle=="off"){
            if($('#carrito-card').attr('toggle')=='off')
                $('#carrito-button').trigger('click');
            window.cantCarrito+=1;
            if(window.cantCarrito==1){
                $('#no-elements-text').hide();
                $('#solicitar-pedido-button').show();
                $('#carrito-pages').show();
                $('#row-total').show();
                $('#solicitar-pedido-button').on('click',parseDetallePedido);
            }
            $(this).attr('toggle','on');
            $(this).html("<i class='fa fa-check fa-lg'></i>");
            $(this).removeClass('btn btn-primary');
            $(this).removeAttr('title');
            $(this).children().css({'padding-top':'8px'});
            $('#tabla-carrito').show();
            var html = "<tr id='row-carrito-"+cod_new+"' class='row-elem-carrito row-carrito-on'>";
            html += "<td style='text-align:left;padding-top:15px;'>" + cod + "</td>";
            html += "<td><input style='position:relative;left:0px;width:70px;' ";
            html += " onChange='calcSubTotal(this)' modelo='"+cod_new+ "' ";
            html += " type='number' maxlength='2' size='2' min='0' class='form-control cod-pedido' name='cant-" + cod_new + "'></td>";
            html += "<td class='subtotal' style='padding-top:15px'></td>";
            html += "<td style='text-align:right'>";
            html += "<div onClick='removeRowCarrito(this)' style='position:relative;left:8px'><i btn-rem='"+ cod_new +"'";
            html += " class='btn fa fa-remove fa-lg' title='Eliminar' ></i></a></td>";
            html += "</tr>"
            $('#tabla-carrito tbody').append(html);
            var page = Math.ceil(window.cantCarrito / window.maxCantPageCarrito);
            if(window.cantCarrito % window.maxCantPageCarrito == 1){   
                makePaginationCarritoUp(page);
            } else {
                switchCarritoPage(page);
            } 
        } 
        
    });
});

function removeRowCarrito(source) {
        var cod_new = $(source).children().attr('btn-rem');
        $('#row-carrito-' + cod_new).remove();
        window.cantCarrito-=1;
        if(window.cantCarrito==0){
            $('#no-elements-text').show();
            $('#tabla-carrito').hide();
            $('#carrito-pages').find('.page-carrito-on').remove();
            $('#carrito-pages').hide();
            $('#solicitar-pedido-button').hide();
            $('#row-total').html("Total: ");
            $('#row-total').hide();
        }
        else {
            total= calcTotal();
            if (total>0)
                $('#row-total').html("Total: $" + total);
            else 
                $('#row-total').html("Total: ");
        
            var pageActualCarrito = window.pageActualCarrito;
            if(window.cantCarrito % window.maxCantPageCarrito == 0){
                makePaginationCarritoDown();
            } else 
                switchCarritoPage(pageActualCarrito);
        }
        var obj = $("[cod-add='" + cod_new + "']");
        obj.html("<i class='fa fa-plus fa-lg'></i>");
        obj.addClass('btn btn-primary');
        obj.attr('title','Agregar al carrito');
        obj.attr('toggle','off');
        

    
}

function makePaginationCarritoUp(page){
    var carritoPages = $('#carrito-pages');
    var prevPage = $(carritoPages).find('.page-carrito-on');
    $(prevPage).addClass('page-carrito-off');
    $(prevPage).removeClass('page-carrito-on');
    $(carritoPages).append('<label class="page-carrito-on page-num" value=' + page + '>&nbsp&nbsp' + page + '</label>');
    var pagesOff = $(carritoPages).find('.page-carrito-off');
    $(pagesOff).unbind("click");
    $(pagesOff).click(switchCarritoBind);
    showElementsCarritoInPage(page);
}

function switchCarritoBind(){
    var pageNew = $(this).attr("value");
    switchCarritoPage(pageNew);
}

function makePaginationCarritoDown(){
    var carritoPages = $('#carrito-pages');
    $(carritoPages).find('.page-num').last().remove();
    var lastPage = Math.ceil(window.cantCarrito / window.maxCantPageCarrito);
    if(window.pageActualCarrito==lastPage + 1){
        $(carritoPages).find('.page-num').last().removeClass('page-carrito-off');
        $(carritoPages).find('.page-num').last().addClass('page-carrito-on');
        showElementsCarritoInPage(lastPage);
    } else
        showElementsCarritoInPage(window.pageActualCarrito);
}

function switchCarritoPage(pageNewNum){
    window.pageActualCarrito = pageNewNum;
    var pageNew = $('#carrito-pages').find('label[value="' + pageNewNum + '"]');
    var pagesNum = $('#carrito-pages').find('.page-num');
    $(pagesNum).addClass('page-carrito-off');
    $(pagesNum).removeClass('page-carrito-on');
    $(pagesNum).unbind("click");
    $(pagesNum).click(switchCarritoBind);
    $(pageNew).addClass('page-carrito-on');
    $(pageNew).removeClass('page-carrito-off');
    $(pageNew).unbind("click");
    showElementsCarritoInPage(parseInt(pageNewNum));
}

function showElementsCarritoInPage(page){
    window.pageActualCarrito = page;
    var tablaCarrito = $('#tabla-carrito');
    var vecElemCarrito = $(tablaCarrito).find('.row-elem-carrito');
    $(vecElemCarrito).hide();
    var i;
    var indexInicialPage = (page-1)*window.maxCantPageCarrito;
    var indexFinalPage = page*window.maxCantPageCarrito;
    for(i=indexInicialPage;i<indexFinalPage;i++){
        $($(vecElemCarrito)[i]).show();
    }
}

window.onscroll = function() {scrollCarrito()};

function scrollCarrito() {
    var carrito = $("#carrito")[0];
    var offsetCarrito = 196;

    if($('#open-filtro-formato-label').attr('toggle')=='on'){
        offsetCarrito += 290;
    } else if($('#open-filtro-tamano-label').attr('toggle')=='on'){
        offsetCarrito += 700;
    }
    
    //var width = Math.max(window.screen.width, window.innerWidth);
    var width = window.screen.width;
    //console.log(width);
    if (window.pageYOffset> offsetCarrito && width>1200) {
        $(carrito).addClass("sticky");
        $('#carrito-card').css("left", "-105px");
        $('#carrito-card').css("width", "350px");
    } else {
        $(carrito).removeClass("sticky");
        $('#carrito-card').css("left", "-105px");
    }
}

function calcSubTotal(source){
    var cod_new = $(source).attr('modelo');
    var cant = $(source).val();
    var maceta = getMacetaByCodNew(global.data, cod_new);
    var precio = maceta.precio;
    if(cant>0)
        $('#row-carrito-'+cod_new).find('.subtotal').html('$'+cant*precio);
    else{
        if(cant<0){
            $(source).val(0);
        }
        $('#row-carrito-'+cod_new).find('.subtotal').html("");
    }
    if(window.cantCarrito>=1){
        $('#row-total').html("Total: $" + calcTotal());
    }
}

function calcTotal(){
    var subTotalArray = {};
    var total = 0;
    var subTotalList = $('.subtotal');
    $(subTotalList).each(function (index) {
        if($(this).html()!="" && $(this).html()!="0"){
            total += parseInt($(this).html().substring(1));
        }
    });
    return total;
}

function parseDetallePedido(){
    var objPost = {};
    var listPedido = [];
    var modelosPedido = $('.cod-pedido').serializeArray();
    var subTotals = $('.subtotal');
    var hayCero = false;
    $(subTotals).each(function (index) {
        if($(this).html() == "" || $(this).html() == "0"){
            hayCero = true;
            return;          
        }
    });
    if(hayCero){
        alert('La cantidad solicitada no puede ser cero. Elimine el o los artículos del carrito.');
    } else {
        for(var i=0; i<modelosPedido.length; i++){
            var obj = {
                cod_new : modelosPedido[i].name.substring(5),
                cant : modelosPedido[i].value
            }
            listPedido[i] = obj;
        }
        objPost = {
            'macetas' : listPedido,
            'total' : calcTotal(),
            'cantModelos' : modelosPedido.length
        }
        var objJsonStr = JSON.stringify(objPost);
        $.redirectPost(global.context + "/catalogo/solicitar", {"jsonStrPedido" : objJsonStr});
    }
        //
    //var subTotalesPedido =  
    /*$.each(inputsNum, function (i, input) {
        formText[input.name] = input.value;
    });*/
    
    
}

$.extend(
    {
        redirectPost: function(location, args)
        {
            var form = $('<form></form>');
            form.attr("method", "post");
            form.attr("action", location);

            $.each( args, function( key, value ) {
                var field = $('<input></input>');
    
                field.attr("type", "hidden");
                field.attr("name", key);
                field.attr("value", value);
    
                form.append(field);
            });
            $(form).appendTo('body').submit();
        }
    });