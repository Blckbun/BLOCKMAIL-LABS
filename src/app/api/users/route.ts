import { NextApiRequest } from "next";
import { StatusCodes } from "http-status-codes";

import User from "@/models/User";
import { badRequestError } from "@/lib/errors";
import { errorRes, successRes } from "@/lib/responses";

export async function POST(req: NextApiRequest) {
	try {
		const { username, address } = req.body;
		if (!address?.trim()) {
			throw badRequestError("Please provide all required fields");
		}

		const alreadyExists = await User.findOne({ address });
		if (alreadyExists) {
			throw badRequestError("User with that address already exists");
		}

		const newUser = new User({
			address,
			username: !username?.trim() ? address : username,
		});
		await newUser.save();

		Response.json(successRes("User created successfully.", newUser), {
			status: StatusCodes.CREATED,
		});
	} catch (err: any) {
		Response.json(errorRes(err.message), {
			status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		});
	}
}
