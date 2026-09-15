<div class='row'>
    <button id='carrito-button' class='btn btn-secondary' onclick='toggleCarrito()' style='position:relative;right:-131px;top:1px;background-color:green;' >
    <i class='fa fa-shopping-cart fa-lg'></i>&nbsp&nbsp&nbsp<strong>Carrito</strong>&nbsp
    </button>
</div>
<div class='row'>

    <div id='carrito-card' class='card text-white bg-primary' toggle='off' style='width: 421px;position:relative;left:-105px;'>
        <div id='carrito-pages'> <label style='color:black;'>Página</label> </div>
        <div id='carrito-form' style="position:relative;left:-35px">    
            <div id='carrito-lista' class='card-body' style='padding-top:17px;'>
                <p id='no-elements-text' class='card-text text-center' style='position:relative;top:10px;left:25px;'> El carrito está vacío!</p>
                
                <div id='tabla-carrito' style='display:none;'>
                    <table class='table'>
                        <tr class='row-caract row-show' >
                            <th class='' style='width:140px;'> Modelo </th>
                            <th class='' style='width:30px;'> Cantidad </th>
                            <th class='text-right' style='width:30px;'> Subtotal </th>
                            <th> </th>
                        </tr>
                    </table>
                    
                </div>
                
            </div>
            
            <div id='row-total' class='row' style='font-weight:bold;position:relative;left:210px;display:none;'>
                Total: 
            </div>
            <br>
            <div id='solicitar-pedido-button' style='padding-left:110px;display:none;'>
                <input type='button' class='btn btn-secondary' style='color:black;' value='Solicitar pedido'>
            </div>
        </div>
    </div>
</div>