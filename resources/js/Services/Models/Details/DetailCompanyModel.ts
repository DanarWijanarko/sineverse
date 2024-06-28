import { HImg } from "@/Services/Utils/Format/images/HImg";
import { country } from "@/Services/Utils/Format/regions/country";

export const DetailCompanyModel = (data: ICompany): ICompanyResults => {
	return {
		description: data.description,
		headquarters: data.headquarters,
		homepage: data.homepage,
		id: data.id,
		logo: HImg(data.logo_path),
		name: data.name,
		origin_country: country(data.origin_country),
		parent_company: data.parent_company,
	};
};
