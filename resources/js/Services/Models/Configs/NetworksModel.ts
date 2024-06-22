import { HImg } from "@/Services/Utils/Format/images/HImg";

export const NetworksModel = (data: Array<INetworks>) => {
	const Data = data.map((item: INetworks): INetworkResults => {
		return {
			headquarters: item.headquarters,
			homepage: item.homepage,
			id: item.id,
			logo: HImg(item.logo_path),
			name: item.name,
			origin_country: item.origin_country,
		};
	});

	return Data;
};
