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

    live4storiesPedidos.add(
      $('#nome').val().trim(),
      $('#Combo').val().trim(),
	  $('#numvoucher').val().trim(),
      $('#email').val().trim(),
      $('#endereco').val().trim(),
      $('#bairro').val().trim(),
      $('#telefone').val().trim(),
      $('#isDelivery-0').checked ? "Sim" : "Nao",
      $('#vendedor').val().trim()
    ).done(function(result) {
      document.body.innerHTML = "SUCCESS";
	  alert("Success");
    }).error(function(error) {
      console.log(error);
    });
  });
  
  // $(document).ready(function() {
    // alert("Success");
  // });

})();