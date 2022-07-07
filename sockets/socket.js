const { io } = require("../index");

const { comprobarJWT } = require("../helpers/jwt");

const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require("../controllers/socket");

// Mensajes de Sockets
io.on("connection", (client) => {
	console.log("Cliente conectado");
	const [valido, uid] = comprobarJWT(client.handshake.headers["x-token"]);

	// Verificar autenticación
	if (!valido) {
		console.log("Cliente desonectado");
		return client.disconnect();
	}

	// Cliente auntenticado
	console.log("Cliente autenticado y conectado", uid);
	usuarioConectado(uid);

	// Ingresar al usuario a una sala en particular
	// sala global (todos conectados), client.id
	client.join(uid);
	// client.to(uid).emit('') // Unir una persona a una sala específica

	// Escuchar del cliente el mensaje-personal
	client.on("mensaje-personal", async (payload) => {
		await grabarMensaje(payload);
		io.to(payload.para).emit("mensaje-personal", payload);
	});

	client.on("disconnect", () => {
		console.log("Cliente desconectado");
		usuarioDesconectado(uid);
	});

	// client.on("mensaje", (payload) => {
	// 	console.log(payload);
	// 	io.emit("mensaje", { admin: "Nuevo mensaje" });
	// });
});
