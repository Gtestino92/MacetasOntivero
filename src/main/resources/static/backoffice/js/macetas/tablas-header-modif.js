function get_header_table(formato) {

	var table_header_html = get_table_header_html(formato);
	var html = 	"<div class='tabla-macetas' id='tabla-macetas-"
							+ formato.toLowerCase()
							+ "'><table class='table table-striped'>"
							+ "<tr class='tabla-title row-show'> <th colspan='8'class='tabla-title-text'>"
							+ table_header_html
							+ "</th> </tr>"
							+ "<tr class='row-caract row-show' ><th class='text-center tabla-cod'>"
							+ "Código</th><th class='text-center'>Largo (cm)</th><th class='text-center'>"
							+ "Ancho (cm)</th>    <th class='text-center'>Altura (cm)</th><th class='text-center'>"
							+ "Precio ($)</th>    <th class='text-center' style='width:80px;'>Foto </th>"
							+ "<th class='text-center' style='width:90px;'> Modificar "
							+ "</th> <th class='text-center' style='width:90px;'> Eliminar </th> </tr> ";

	return html;
}

function get_table_header_html(formato) {
	var table_header_html = "";
	switch (formato) {
	case "OVA":
		table_header_html = "Modelos Ovaladas";
		break;
	case "REC":
		table_header_html = "Modelos Rectangulares";
		break;
	case "LAG":
		table_header_html = "Lagos para decoración";
		break;
	case "CAS":
		table_header_html = "Modelos para Cascada";
		break;
	case "SQR":
		table_header_html = "Modelos de boca Cuadrada";
		break;
	case "HEX":
		table_header_html = "Modelos Hexagonales";
		break;
	case "RED":
		table_header_html = "Modelos Redonda";
		break;
	case "BSQ":
		table_header_html = "Modelos para Bosque";
		break;
	case "OTR":
		table_header_html = "Otros Modelos Varios";
		break;
	case "OCT":
		table_header_html = "Modelos Octogonales";
		break;
	case "GRS":
		table_header_html = "Modelos Simil Gres";
		break;

	}
	return table_header_html;
}
