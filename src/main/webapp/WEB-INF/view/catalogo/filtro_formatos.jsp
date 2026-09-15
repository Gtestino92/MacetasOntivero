<button class='btn btn-primary' style='position:relative;right:-31%;' onclick='toggleFiltros("formato","tamano")' toggle='off' id="open-filtro-formato-label"><strong>Filtrar por Tipo</strong></button>

<div class='filtro-formato-form' style='display:none;padding-left: 3%;'>
    <br>
    <form id='filtro-formato-form'>
        <div class='container'>
            <div class='row'>
                <div class='col-4' >
                    <label class='checkbox chk-formato-label' >
                        <input type="checkbox" class='checkbox' onClick='toggle(this)' unchecked><strong> Todas! </strong>
                    </label>
                    <label class='checkbox chk-formato-label'>
                        <input class='checkbox chk-formato' type='checkbox' name='ova' id='ck-ova' unchecked><strong> Ovaladas</strong>
                    </label>
                    <label class='checkbox chk-formato-label'>
                        <input type='checkbox' class='checkbox chk-formato' name='bsq' id='ck-bsq' unchecked><strong> Bosque</strong>
                    </label>
                    <label class='checkbox chk-formato-label'>
                        <input type='checkbox' class='checkbox chk-formato' name='cas' id='ck-cas' unchecked><strong> Cascada</strong>
                    </label>
                    <label class='checkbox chk-formato-label'>
                        <input type='checkbox' class='checkbox chk-formato' name='hex' id='ck-hex' unchecked><strong> Hexagonal</strong>
                    </label>
                    <label class='checkbox chk-formato-label'>
                        <input type='checkbox' class='checkbox chk-formato' name='lag' id='ck-lag' unchecked><strong> Lagos</strong>
                    </label>
                    <label class='checkbox chk-formato-label'>
                        <input type='checkbox' class='checkbox chk-formato' name='grs' id='ck-grs' unchecked><strong> Simil Gres</strong>
                    </label>
                </div>
                
                <div class='col-4' style='position:relative;left:20px;'>
                    <label class='checkbox chk-formato-label' >
                        <input type='checkbox' class='checkbox chk-formato' name='rec' id='ck-rec' unchecked><strong> Rectangulares</strong>
                    </label>
                    <label class='checkbox chk-formato-label'>
                        <input type='checkbox' class='checkbox chk-formato' name='red' id='ck-red' unchecked><strong> Redondas</strong>
                    </label>
                    <label class='checkbox chk-formato-label'>
                        <input type='checkbox' class='checkbox chk-formato' name='sqr' id='ck-sqr' unchecked><strong> Cuadradas</strong>
                    </label>
                    <label class='checkbox chk-formato-label'>
                        <input type='checkbox' class='checkbox chk-formato' name='oct' id='ck-oct' unchecked><strong> Octogonales</strong>
                    </label>
                    <label class='checkbox chk-formato-label'>
                        <input type='checkbox' class='checkbox chk-formato' name='otr' id='ck-otr' unchecked><strong> Otras</strong>
                    </label>
                    <label style='padding-top:15px;'>
                        <input type='button' style='position:relative;left:-5%;' class='btn btn-secondary' onclick='aplicarFiltroFormato()' value='Aplicar Filtro'>
                    </label>
                </div>
                
            </div>
                
        </div>   
    </form>
</div>
