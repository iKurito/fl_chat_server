const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es obligatorio"],
	},
	email: {
		type: String,
		unique: true,
		required: [true, "El email es obligatorio"],
	},
	password: {
		type: String,
		required: true,
	},
	online: {
		type: Boolean,
		default: false,
	},
});

UsuarioSchema.method("toJSON", function () {
	const { __v, _id, password, ...object } = this.toObject();
	object.uid = _id;
	return object;
	// const user = this;
	// const userObject = user.toObject();

	// delete userObject.password;

	// userObject.uid = user._id;

	// return userObject;
});

module.exports = model("Usuario", UsuarioSchema);
