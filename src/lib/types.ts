export interface UserAccountType {
	address: string;
	username: string;
}

export interface EmailContentType {
	subject: string;
	preview: string;
	body: string;
	read: boolean;
	files?: [];
}

export interface PublisherResponseType {
	newlyCreated: {
		blobObject: {
			id: string;
			registeredEpoch: number;
			blobId: string;
			size: number;
			encodingType: string;
			certifiedEpoch: number | null;
			storage: {
				id: string;
				startEpoch: number;
				endEpoch: number;
				storageSize: number;
			};
			deletable: boolean;
		};
		resourceOperation: {
			registerFromScratch: {
				encodedLength: number;
				epochsAhead: number;
			};
		};
		cost: number;
	};
}
