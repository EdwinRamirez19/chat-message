var params = new URLSearchParams(window.location.search);

function renderizarUsuarios(personas) {

    var html = '';

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.nombre + '</span></a>';
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {

        html += '<li>';
        html += '<a href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

}