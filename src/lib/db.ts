import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	throw Error("Missing required environment variables: DATABASE_URL");
}

export const connectDB = async () => {
	await mongoose
		.connect(DATABASE_URL)
		.then(() => console.log("Database connected"));
};
