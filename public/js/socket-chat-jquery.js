var params = new URLSearchParams(window.location.search);

var nombreUsuario = params.get('nombre')
var sala = params.get('sala')
var divUsuarios = $("#divUsuarios");
var formEnviar  = $("#formEnviar")
var divChatbox  = $("#divChatbox")
var txtMensaje = $("#txtMensaje");

function renderizarUsuarios(personas) {
console.log(personas)
    var html = '';

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {

        html += '<li>';
        html += '<a href="javascript:void(0)" data-id="'+personas[i].id+'"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html)

}

function renderizarMensajes(mensaje, yo) {
    console.log(mensaje)
    var html = '';
    var fecha = new Date(mensaje.fecha)
    var hora  = fecha.getHours()+':'+ fecha.getMinutes();
    var adminClass = 'info';

    if (mensaje.usuario ==='Admin') {
        adminClass ='danger'
    }

    if (yo) {
        html+='<li class="reverse">';
        html+='    <div class="chat-content">';
        html+='        <h5>'+mensaje.usuario+'</h5>';
        html+='        <div class="box bg-light-inverse">'+mensaje.mensaje+'</div>';
        html+='    </div>';
        html+='<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html+='    <div class="chat-time">'+hora+'</div>';
        html+='</li>';
    }else{

        html +='<li class="animated fadeIn">';
        if (mensaje.usuario!=='Admin') {
            
            html +='    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html +='        <div class="chat-content">';
        html +='            <h5>'+mensaje.usuario+'</h5>';
        html +='                <div class="box bg-light-'+adminClass+'">'+mensaje.mensaje+'</div>';
        html +='         </div>';
        html +='    <div class="chat-time">'+hora+'</div>';
        html +='</li>';
    }

   
    divChatbox.append(html)
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


divUsuarios.on('click','a',function() {
   var id  = $(this).data('id')  
   if (id) {
       console.log(id)
   }
})
formEnviar.on('submit',function(e) {
    e.preventDefault();

    if(txtMensaje.val().trim().length ===0 ){ return;}
            // Enviar información
        socket.emit('crearMensaje', {
            nombre: nombreUsuario,
            mensaje: txtMensaje.val()
        }, function(mensaje) {
            txtMensaje.val('').focus()
            renderizarMensajes(mensaje,true)
            scrollBottom() //hacer scroll y ubicar en el ultimo mensaje
        });
})