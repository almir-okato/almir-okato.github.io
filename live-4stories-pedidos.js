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
  // add a single guestbood entry
  add(nome, Combo, numvoucher, email, endereco, bairro, telefone, isDelivery, vendedor) {
    console.log('Sending', nome, Combo, numvoucher, email, endereco, bairro, telefone, isDelivery, vendedor)
    return $.ajax({
      type: 'PUT',
      url: `${apiUrl}/entries`,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        nome, Combo, numvoucher, email, endereco, bairro, telefone, isDelivery, vendedor
      }),
      dataType: 'json',
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

    live4storiesPedidos.add(
      $('#nome').val().trim(),
      $('#Combo').val().trim(),
	  $('#numvoucher').val().trim(),
      $('#email').val().trim(),
      $('#endereco').val().trim(),
      $('#bairro').val().trim(),
      $('#telefone').val().trim(),
      delivery,
      $('#vendedor').val().trim()
    ).done(function(result) {
	  document.body.innerHTML = 'Pedido feito com sucesso!<br><a href="javascript:void(0)" onClick="location.reload(true);">Voltar</a>';
	  alert("Pedido feito com sucesso!");
    }).error(function(error) {
      console.log(error);
    });
  });
  
  // $(document).ready(function() {
	  
  // });

})();
