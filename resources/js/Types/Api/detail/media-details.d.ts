interface IImagesDetail {
	id: number;
	posters: Array<{ file_path: string }>;
	backdrops: Array<{ file_path: string }>;
}

interface IVideos {
	id: string;
	key: string;
	type: string;
	site: string;
	name: string;
}

interface IMediaResult {
	backdrops: Array<string>;
	posters: Array<string>;
	videos: Array<IVideos> | undefined;
}
