import { VImg } from "@/Services/Utils/Format/images/VImg";
import { toSlug } from "@/Services/Utils/Format/slug/toSlug";
import { gender } from "@/Services/Utils/Format/tmdb/gender";

export const DetailCreditModel = (data: Array<ICast>): Array<ICastResult> => {
	const Data = data.map((cast): ICastResult => {
		return {
			slug: toSlug(cast.name),
			character: cast.character,
			credit_id: cast.credit_id,
			gender: gender(cast.gender),
			id: cast.id,
			known_for_department: cast.known_for_department,
			name: cast.name,
			original_name: cast.original_name,
			popularity: cast.popularity,
			profile: VImg(cast.profile_path),
		};
	});

	return Data;
};
