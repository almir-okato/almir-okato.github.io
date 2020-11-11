/**
 * Web application
 */
const apiUrl = 'https://2bd08590.us-south.apigw.appdomain.cloud/live-4stories-aeroclube-2020';
const live4storiesPedidos = {
  // retrieve the existing live4storiesPedidos entries
  get() {
    return $.ajax({
      type: 'GET',
      url: `${apiUrl}/entries`,
      dataType: 'json'
    });
  },
  checkvoucher(numvoucher) {
    return $.ajax({
      type: 'GET',
      url: `${apiUrl}/checkvoucher`,
	  data: {numvoucher: numvoucher},
      dataType: 'json'
    });
  },
  // add a single guestbood entry
  add(nome, Combo, Refri, numvoucher, email, endereco, bairro, telefone, isDelivery, vendedor) {
    console.log('Sending', nome, Combo, Refri, numvoucher, email, endereco, bairro, telefone, isDelivery, vendedor)
    return $.ajax({
      type: 'PUT',
      url: `${apiUrl}/entries`,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        nome, Combo, Refri, numvoucher, email, endereco, bairro, telefone, isDelivery, vendedor
      }),
      dataType: 'json',
	  error: function(xhr, status, error){
		console.log(error);
        document.body.innerHTML = 'Algo deu errado, por favor tente novamente!<br><a href="javascript:void(0)" onClick="location.reload();">Voltar</a>';
	    window.scrollTo(0,0);
	    alert("ERRO! Por favor tente novamente - status " + error + " cod " + xhr.status);
	  },
    });
  }
};

(function() {

  // intercept the click on the submit button, add the live4storiesPedidos entry and
  // reload entries on success
  $(document).on('submit', '#formulario', function(e) {
    e.preventDefault();
	let delivery = "Nao"
	if ($('#isDelivery-0').prop("checked")) {
		delivery = "Sim"
	}

	let count = 0;
	
	live4storiesPedidos.checkvoucher(
		$('#numvoucher').val().trim()
	).done(function(result) {
		$.each(result.docs, function(idx, pedido) {
			count++;
		});
		console.log(count);
		if (count > 0) {
			alert("Este voucher já está cadastrado! Verifique se o número está correto!");
			return; //cant add an order
		}

		live4storiesPedidos.add(
		  $('#nome').val().trim(),
		  $('#Combo').val().trim(),
		  $('#Refri').val().trim(),
		  $('#numvoucher').val().trim(),
		  $('#email').val().trim(),
		  $('#endereco').val().trim(),
		  $('#bairro').val().trim(),
		  $('#telefone').val().trim(),
		  delivery,
		  $('#vendedor').val().trim()
		).done(function(result) {
		  document.body.innerHTML = 'Pedido feito com sucesso!<br><a href="javascript:void(0)" onClick="location.reload(true);">Voltar</a>';
		  window.scrollTo(0,0);
		  alert("Pedido feito com sucesso!");
		});
	});
	
  });
  
  // $(document).ready(function() {
	  
  // });

})();
