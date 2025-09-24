import { NextApiRequest } from "next";
import { StatusCodes } from "http-status-codes";

import User from "@/models/User";
import Email from "@/models/Email";
import { EmailContentType } from "@/lib/types";
import { errorRes, successRes } from "@/lib/responses";
import { badRequestError, internalServerError } from "@/lib/errors";
import { downloadEmailContent, uploadEmailContent } from "@/lib/mail";

export async function GET(
	_req: NextApiRequest,
	ctx: { params: { id: string } }
) {
	try {
		const { id } = ctx.params;

		const emailExists = await Email.findById(id);
		if (!emailExists) {
			throw badRequestError("Email with that id does not exist");
		}

		const emailContent = await downloadEmailContent(emailExists.content);

		Response.json(
			successRes("Email fetched successfully", {
				...emailExists,
				content: emailContent,
			}),
			{ status: StatusCodes.OK }
		);
	} catch (err: any) {
		Response.json(errorRes(err.message), {
			status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		});
	}
}

export async function DELETE(req: NextApiRequest) {
	try {
		const { sender, recipient, subject, preview, body } = req.body;

		if (
			!sender?.trim() ||
			!recipient?.trim() ||
			!subject?.trim() ||
			!body?.trim()
		) {
			throw badRequestError("Please provide all required fields");
		}

		const alreadyExists = await User.findOne({ address: sender });
		if (!alreadyExists) {
			throw badRequestError("User with that address does not exist");
		}

		const emailContent: EmailContentType = {
			subject,
			body,
			preview: !preview?.trim() ? body.slice(0, 32) + "..." : preview,
			read: false,
		};

		const blobId = await uploadEmailContent(emailContent);

		if (!blobId)
			throw internalServerError(
				"Error while sending mail: undefined blobId"
			);

		const newEmail = new Email({
			sender,
			recipient,
			content: blobId,
		});

		await newEmail.save();

		Response.json(successRes("Email sent successfully.", newEmail), {
			status: StatusCodes.CREATED,
		});
	} catch (err: any) {
		Response.json(errorRes(err.message), {
			status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		});
	}
}
