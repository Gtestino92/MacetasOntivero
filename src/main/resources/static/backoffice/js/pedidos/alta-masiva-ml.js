var addJsonPedidosToForm = function(jsonPedidosML) {
	if (jsonPedidosML != null && jsonPedidosML != "") {
		document.querySelector('.status').classList.add('bg-success');
		$('.status').css('width','150%');
		document.querySelector('.status').innerHTML = '<br><h4> Pedidos obtenidos! </h4><br>';

		$('.status').show();
		$('#form-alta-ml').find('input[name="jsonPedidosML"]').val(jsonPedidosML);
	}
};

/* xlsxML Upload Script */
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.xlsxML = factory();
    }
}(this, function () {
    "use strict";
    var xlsxML = function (options) {
        if (!this || !(this instanceof xlsxML)) {
            return new xlsxML(options);
        }

        if (!options) {
            options = {};
        }

        this.endpoint = window.location.origin + global.context + '/backoffice/getListPedidosML';
        this.callback = addJsonPedidosToForm;
        this.dropzone = document.querySelectorAll('.dropzone');
        this.info = document.querySelectorAll('.info');

        this.run();
    };

    xlsxML.prototype = {
        createEls: function (name, props, text) {
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
        },
        insertAfter: function (referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },
        post: function (path, data, callback) {
            var xhttp = new XMLHttpRequest();

            xhttp.open('POST', path, true);
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 300) {
                        var response = '';
                        try {
                            response = this.responseText;
                        } catch (err) {
                            response = this.responseText;
                        }
                        callback.call(window, response);
                    } else {
                    	var statusDiv = $('.status');
                    	statusDiv.removeClass('bg-success');
                        statusDiv.addClass('bg-danger');
                        statusDiv.html(this.responseText);
                    	document.body.classList.remove('loading');
                    }
                }
            };
            xhttp.send(data);
            xhttp = null;
        },
        createDragZone: function () {
            var p1, p2, input;

                p1 = this.createEls('p', {}, 'Arrastre archivo');
                p2 = this.createEls('p', {}, 'O haga click para seleccionar');
            input = this.createEls('input', {type: 'file', className: 'input', accept: '.xlsx'});

            Array.prototype.forEach.call(this.info, function (zone) {
                zone.appendChild(p1);
                zone.appendChild(p2);
            }.bind(this));
            Array.prototype.forEach.call(this.dropzone, function (zone) {
                zone.appendChild(input);
                this.status(zone);
                this.upload(zone);
            }.bind(this));
        },
        loading: function () {
            var div, table, img;

            div = this.createEls('div', {className: 'loading-modal'});
            table = this.createEls('table', {className: 'loading-table'});
            img = this.createEls('img', {className: 'loading-image', src: 'css/loading-spin.svg'});

            div.appendChild(table);
            table.appendChild(img);
            document.body.appendChild(div);
        },
        status: function (el) {
            var div = this.createEls('div', {className: 'status'});

            this.insertAfter(el, div);
        },
        matchFiles: function (file, zone) {
            var status = zone.nextSibling;
            if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
                document.body.classList.add('loading');
                status.classList.remove('bg-success', 'bg-danger');
                status.innerHTML = '';

                var fd = new FormData();
                fd.append('filePedidosML', file);

                this.post(this.endpoint, fd, function (data) {
                    document.body.classList.remove('loading');
                    typeof this.callback === 'function' && this.callback.call(this, data);
                }.bind(this));
            } else {
                status.classList.remove('bg-success');
                status.classList.add('bg-danger');
                status.innerHTML = 'Archivo invalido';
            }
        },
        upload: function (zone) {
            var events = ['dragenter', 'dragleave', 'dragover', 'drop'],
                file, target, i, len;

            zone.addEventListener('change', function (e) {
                if (e.target && e.target.nodeName === 'INPUT' && e.target.type === 'file') {
                    target = e.target.files;

                    for (i = 0, len = target.length; i < len; i += 1) {
                        file = target[i];
                        this.matchFiles(file, zone);
                    }
                }
            }.bind(this), false);

            events.map(function (event) {
                zone.addEventListener(event, function (e) {
                    if (e.target && e.target.nodeName === 'INPUT' && e.target.type === 'file') {
                        if (event === 'dragleave' || event === 'drop') {
                            e.target.parentNode.classList.remove('dropzone-dragging');
                        } else {
                            e.target.parentNode.classList.add('dropzone-dragging');
                        }
                    }
                }, false);
            });
        },
        run: function () {
            var loadingModal = document.querySelector('.loading-modal');

            if (!loadingModal) {
                this.loading();
            }
            this.createDragZone();
        },
        end: function () {
        	this.prototype = null;
        }
    };

    return xlsxML;
}));

new xlsxML();

$('#reset-file-upload').click(function(){
	$('#form-alta-ml').find('input[name="jsonPedidosML"]').val("");
	$('.dropzone').removeClass('error-highlight');
	$('.status').html("");
	//$('.dropzone').html('<div class="info"><</div>');
});

$('#altaMLBtn').click(function(){
	var form = $('#form-alta-ml');
	if(!validateFormAltaML(form)) 
		return;
	else 
		form.submit();
});


function validateFormAltaML(form){
	var formArray = form.serializeArray();
    var isValid = true;
    var jsonPedidos = $('#form-alta-ml').find('input[name="jsonPedidosML"]').val();
    if(jsonPedidos == null || jsonPedidos == ""){
    	$('.dropzone').addClass('error-highlight');
    	isValid = false;
    } else 
    	$('.dropzone').removeClass('error-highlight');    
    return isValid;
}

