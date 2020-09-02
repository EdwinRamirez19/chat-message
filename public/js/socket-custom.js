var socket = io();
socket.on('connect', function(params) {
    console.log('conectado al servidor')
})
socket.on('disconnect', function(params) {
    console.log('Perdimos conexion con el servidor ')
})

socket.emit('enviarMensaje', {
    nombre: 'Edwin',
    mensaje: 'hola servidor'
}, function(resp) {
    console.log('respuesta Servidor : ', resp)
})

socket.on('enviarMensaje', function(response) {
    console.log('Servidor: ', response)
})