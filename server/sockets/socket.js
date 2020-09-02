const { io } = require('../server')

io.on('connection', (client) => {
    console.log('usuario conectado')

    client.on('disconnect', () => {
        console.log('Usuario desconectado')
    })


    client.on('enviarMensaje', (data, callback) => {

        console.log(data)
        client.broadcast.emit('enviarMensaje', data)
            // if (mensaje.nombre) {
            //     callback({
            //         resp: 'TODO SALIO BIEN'
            //     })
            // } else {
            //     callback({
            //         resp: 'TODO SALIO MAL !!!!!'
            //     })
            // }
    })
    client.emit('enviarMensaje', {
        usuario: 'Pedro',
        mensaje: 'hola desde el servidor'
    });
})