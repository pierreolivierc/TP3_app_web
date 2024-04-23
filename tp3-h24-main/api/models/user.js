const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, "Adresse courriel invalide"],
		},
		password: {
			type: String,
			required: true,
			minlength: 6
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
