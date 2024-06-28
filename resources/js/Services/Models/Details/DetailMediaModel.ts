import { HImg } from "@/Services/Utils/Format/images/HImg";
import { VImg } from "@/Services/Utils/Format/images/VImg";

export const DetailMediaModel = (dataImg: IImagesDetail, dataVid: Array<IVideos>): IMediaResult => {
	const backdrops: Array<string> = dataImg.backdrops.map((img) => HImg(img.file_path));
	const posters: Array<string> = dataImg.posters.map((img) => VImg(img.file_path));
	const videos: Array<IVideos> = dataVid.map((vid) => {
		return {
			id: vid.id,
			key: vid.key,
			name: vid.name,
			site: vid.site,
			type: vid.type,
		};
	});

	return { backdrops, posters, videos };
};
