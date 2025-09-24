import { EmailContentType, PublisherResponseType } from "./types";

const AGGREGATOR = process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR;
const PUBLISHER = process.env.NEXT_PUBLIC_WALRUS_PUBLISHER;

if (!AGGREGATOR || !PUBLISHER) {
	throw Error(
		"Missing required environment variables: NEXT_PUBLIC_WALRUS_PUBLISHER or NEXT_PUBLIC_WALRUS_AGGREGATOR"
	);
}

export const uploadEmailContent = async (mail: EmailContentType) => {
	try {
		const urlPath = `${PUBLISHER}/v1/blobs`;
		// const urlPath = `${PUBLISHER}/v1/blobs?send_object_to=${ADDRESS}`;

		// Check if there are files and upload them
		if (mail.files) {
			// Upload the files and return the file id.
		}

		const mailString = JSON.stringify(mail);

		const response = await fetch(urlPath, {
			method: "PUT",
			headers: {
				"Content-Type": "application/octet-stream",
			},
			body: mailString,
		});

		const data: PublisherResponseType = await response.json();

		console.log("Mail sent successfully");
		return data.newlyCreated.blobObject.blobId;
	} catch (error: any) {
		console.error("An error occurred: ", error);
	}
};

export const downloadEmailContent = async (blobId: string) => {
	try {
		const urlPath = `${AGGREGATOR}/v1/blobs/${blobId}`;

		const response = await fetch(urlPath, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data: EmailContentType = await response.json();

		return data;
	} catch (error: any) {
		console.error("An error occurred: ", error);
	}
};
