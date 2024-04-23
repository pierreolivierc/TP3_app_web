const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const areaSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		gettingThere: {
			type: String,
			required: true,
		},
        lon: {
			type: Number,
			required: true,
		},
        lat: {
			type: Number,
			required: true,
		},
        routes:[
            {
              type: Schema.Types.ObjectId,
              ref: 'Route'
            }
          ],
        user : {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Area", areaSchema);
