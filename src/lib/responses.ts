export const errorRes = (message: string) => {
	return {
		status: "error",
		message,
	};
};

export const successRes = (message: string, data?: any) => {
	return {
		status: "success",
		message,
		data,
	};
};
