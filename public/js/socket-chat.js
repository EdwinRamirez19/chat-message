var socket = io();

var params = new URLSearchParams(window.location.search);
console.log(params.get('nombre'))
if (!params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('El nombre es Obligatorio');
}

var usuario = { nombre: params.get('nombre'), sala: params.get('sala') };
socket.on('connect', function(params) {
    console.log('conectado al servidor')

    socket.emit('entrarChat', usuario, function(response) {
        console.log('Usuarios Conectados : ', response)
    })
})
socket.on('disconnect', function(params) {
    console.log('Perdimos conexion con el servidor ')
})

// socket.emit('crearMensaje', {

//     mensaje: 'hola servidor'
// }, function(resp) {
//     console.log('respuesta Servidor : ', resp)
// })

socket.on('crearMensaje', function(response) {
    console.log('Servidor: ', response)
})
socket.on('listaPersonas', function(personas) {
    console.log(personas)
})

//mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('mensaje Privado :', mensaje)
})