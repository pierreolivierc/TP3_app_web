const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gradeSchema = new Schema(
	{
		text : {
			type : String,
			required : true
		},
		value : {
			type : Number,
			required : true
		},

	},
	{_id : false}
);

const routeSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
        type : {
            type : String,
            enum : ["SPORT", "TRAD", "TOPROPE" ]
        },
		grade: {
			type : gradeSchema,
			required : true
		},
        description: {
			type: String,
			required: true,
			
		},
		approach: {
			type: String,

		},
		descent: {
			type: String,
		
		},
        area : {
            type: Schema.Types.ObjectId,
            ref: 'Area',
            required: true,
        },
		user : {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
	},
	{ timestamps: true }
);

routeSchema.index({ name: 1, area: 1 }, { unique: true });

module.exports = mongoose.model("Route", routeSchema);
