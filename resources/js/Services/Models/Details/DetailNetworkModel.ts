import { HImg } from "@/Services/Utils/Format/images/HImg";
import { country } from "@/Services/Utils/Format/regions/country";

export const DetailNetworkModel = (data: INetworks): INetworkResults => {
	return {
		headquarters: data.headquarters,
		homepage: data.homepage,
		id: data.id,
		logo: HImg(data.logo_path),
		name: data.name,
		origin_country: country(data.origin_country),
	};
};
