<button class='btn btn-primary' style='position:relative;right:-85px;' toggle='off' id="open-filtro-fecha-label"><strong>Filtrar por Fecha</strong></button>
<br>
<div class='filtro-fecha-div' style='display:none;padding:30px;'>
    <div id='filtro-fecha-form'>
        <div class='container'>
            <div class='row' id='sol'>
                <div class='col-md-12'>
                    <div class='checkbox pointer' style='position:relative;left:-20px;'>
                        <input class='pointer chk-fecha checkbox' type='checkbox' name='fecha-solicitud' id='ck-fecha-solicitud' unchecked> <strong>Por Fecha de Solicitud</strong>
                    </div>
                    <br>
                    <div class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-sol' id='anterior' disabled> Anterior a <input class='enable-text-anterior text-filtro-fecha' maxlength="2" size="1" name='sol-anterior' disabled>
                    </div>
                    <br>
                    <div class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-sol' id='posterior' disabled> Posterior o igual a <input class='enable-text-posterior text-filtro-fecha' maxlength="2" size="1" name='sol-posterior' disabled> 
                    </div>
                    <br>
                    <div class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-sol' id='entre' disabled> Entre las fechas <input class='enable-text-entre text-filtro-fecha' maxlength="2" size="1" name='sol-posterior' disabled><input class='enable-text-entre text-filtro-fecha' maxlength="2" size="1" name='sol-anterior' disabled> 
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class='container filtro-fecha-entrega'>
            <div class='row' id='ent'>
                <div class='col-md-12'>
                    <div class='checkbox pointer' style='position:relative;left:-20px;'>
                        <input class='pointer chk-fecha checkbox' type='checkbox' name='fecha-entrega' id='ck-fecha-entrega' unchecked> <strong>Por Fecha de Entrega</strong>
                    </div>
                    <br>
                    <div class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-ent' id='anterior' disabled> Anterior a <input class='enable-text-anterior text-filtro-fecha' maxlength="2" size="1" name='ent-anterior' disabled>
                    </div>
                    <br>
                    <div class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-ent' id='posterior' disabled>  Posterior o igual a <input class='enable-text-posterior text-filtro-fecha' maxlength="2" size="1" name='ent-posterior' disabled>
                    </div>
                    <br>
                    <div class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-ent' id='entre' disabled> Entre las fechas <input class='enable-text-entre text-filtro-fecha' maxlength="2" size="1" name='ent-posterior' disabled><input class='enable-text-entre text-filtro-fecha' maxlength="2" size="1" name='ent-anterior' disabled>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class='row'>
            <input type='button' style='position:relative;right:-80px;' class='btn btn-secondary' onclick='aplicarFiltroFecha(global.estado)' value='Aplicar Filtro'>
        </div>
    </div>
</div>


