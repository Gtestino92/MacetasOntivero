<button class='btn btn-primary' style='position:relative;right:-85px;' onclick='toggleFiltros("tamano","formato")' toggle='off' id="open-filtro-tamano-label"><strong>Filtrar por Tamaño</strong></button>
<br>
<div class='filtro-tamano-form' style='display:none;padding:30px;'>
    <div id='filtro-tamano-form'>
        <div class='container'>
            <div class='row' id='lg'>
                <div class='col-md-12'>

                    <label class='checkbox pointer' style='position:relative;left:-20px;'>
                        <input class='pointer chk-tamano checkbox' type='checkbox' name='largo' id='ck-largo' unchecked> <strong>Por Largo</strong>
                    </label>
                    <br>
                    <label class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-lg' id='mayor' disabled> Mayor o igual a <input type='number' class='enable-text-mayor text-filtro-tam' maxlength="2" size="1" name='lg-mayor' disabled> cm.
                    </label>
                    <br>
                    <label class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-lg' id='menor' disabled> Menor o igual a <input type='number'   class='enable-text-menor text-filtro-tam' maxlength="2" size="1" name='lg-menor' disabled> cm.
                    </label>
                    <br>
                    <label class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-lg' id='entre' disabled> Entre <input type='number' class='enable-text-entre text-filtro-tam' maxlength="2" size="1" name='lg-mayor' disabled> y <input type='number'   class='enable-text-entre text-filtro-tam' maxlength="2" size="1" name='lg-menor' disabled> cm.
                    </label>
                </div>
            </div>
        </div>
        <br>
        <div class='container'>
            <div class='row' id='an'>
                <div class='col-md-12'>
                    <label class='checkbox pointer' style='position:relative;left:-20px;'>
                        <input class='pointer chk-tamano checkbox' type='checkbox' name='ancho' id='ck-ancho' unchecked> <strong>Por Ancho</strong>
                    </label>
                    <br>
                    <label class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-an' id='mayor' disabled> Mayor o igual a <input type='number'   class='enable-text-mayor text-filtro-tam' maxlength="2" size="1" name='an-mayor' disabled> cm.
                    </label>
                    <br>
                    <label class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-an' id='menor' disabled> Menor o igual a <input type='number'   class='enable-text-menor text-filtro-tam' maxlength="2" size="1" name='an-menor' disabled> cm.
                    </label>
                    <br>
                    <label class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-an' id='entre' disabled> Entre <input type='number' class='enable-text-entre text-filtro-tam' maxlength="2" size="1" name='an-mayor' disabled> y <input type='number'   class='enable-text-entre text-filtro-tam' maxlength="2" size="1" name='an-menor' disabled> cm.
                    </label>
                </div>
            </div>
        </div>
        <br>
        <div class='container'>
            <div class='row' id='al'>
                <div class='col-md-12'>
                    <label class='checkbox pointer' style='position:relative;left:-20px;'>
                        <input class='pointer chk-tamano checkbox' type='checkbox' name='alto' id='ck-alto' unchecked> <strong>Por Altura</strong>
                    </label>
                    <br>
                    <label class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-al' id='mayor' disabled> Mayor o igual a <input type='number'   class='enable-text-mayor text-filtro-tam' maxlength="2" size="1" name='al-mayor' disabled> cm.
                    </label>
                    <br>
                    <label class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-al' id='menor' disabled> Menor o igual a <input type='number'   class='enable-text-menor text-filtro-tam' maxlength="2" size="1" name='al-menor' disabled> cm.
                    </label>
                    <br>
                    <label class='checkbox pointer'>
                        <input type='radio' class='pointer rd' name='rd-al' id='entre' disabled> Entre <input type="number" class='enable-text-entre text-filtro-tam' maxlength="2" size="1" name='al-mayor' disabled> y <input type='number'   class='enable-text-entre text-filtro-tam' maxlength="2" size="1" name='al-menor' disabled> cm.
                    </label>
                </div>
            </div>
        </div>
        <br>
        <div class='row'>
            <input type='button' style='position:relative;right:-80px;' class='btn btn-secondary' onclick='aplicarFiltroTamano()' value='Aplicar Filtro'>
        </div>
    </div>
</div>


