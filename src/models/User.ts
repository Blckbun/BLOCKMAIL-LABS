import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		address: {
			type: String,
			unique: true,
			required: [true, "user address or publickey is required"],
		},
		username: String,
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
