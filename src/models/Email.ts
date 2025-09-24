import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "a valid user id is required"],
		},
		recipient: {
			type: String,
			required: [true, "a valid recipient is required"],
		},
		content: {
			type: String,
			required: [true, "email content is required"],
		},
	},
	{ timestamps: true }
);

const Email = mongoose.model("Email", EmailSchema);

export default Email;
