const { Schema, model } = require("mongoose");

const MensajeSchema = new Schema(
	{
		de: {
			type: Schema.Types.ObjectId,
			ref: "Usuario",
			required: true,
		},
		para: {
			type: Schema.Types.ObjectId,
			ref: "Usuario",
			required: true,
		},
		mensaje: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

MensajeSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject();
	return object;
	// const user = this;
	// const userObject = user.toObject();

	// delete userObject.password;

	// userObject.uid = user._id;

	// return userObject;
});

module.exports = model("Mensaje", MensajeSchema);
