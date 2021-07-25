const { io } = require('../server')
const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utilidades/utilidades')
const usuarios = new Usuarios();
io.on('connection', (client) => {
    console.log('usuarios conectado')

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            callback({
                ok: false,
                mensaje: 'El nombre es necesario'
            })
        }
        client.join(data.sala)
        usuarios.agregarPersonas(client.id, data.nombre, data.sala)
        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonaSala(data.sala))
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin', `${data.nombre} se unió`))
        callback(usuarios.getPersonaSala(data.sala))

    })


    client.on('crearMensaje', (data,callback) => {
        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)
        callback(mensaje)
    })
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Admin', `${personaBorrada.nombre} Salió`))
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonaSala(personaBorrada.sala))
    })

    //mensajes privados 

    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    })
})