export type AgeData = {
	name: string;
	age: number | null;
	count: number;
};

export type AgeEstimation = {
	name: string;
	data: AgeData | null;
};
