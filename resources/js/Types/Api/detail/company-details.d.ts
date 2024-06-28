interface ICompanies {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

interface ICompaniesResult {
	id: number;
	logo: string;
	name: string;
	origin_country: string | undefined;
}

interface ICompany {
	description: string | undefined;
	headquarters: string | undefined;
	homepage: string | undefined;
	id: number;
	logo_path: string;
	name: string | undefined;
	origin_country: string;
	parent_company: string | undefined;
}

interface ICompanyResults {
	description: string | undefined;
	headquarters: string | undefined;
	homepage: string | undefined;
	id: number;
	logo: string;
	name: string | undefined;
	origin_country: string | undefined;
	parent_company: string | undefined;
}
