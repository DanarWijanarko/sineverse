interface ICast {
	character: string | undefined;
	credit_id: string;
	gender: number;
	id: number;
	known_for_department: string | undefined;
	name: string;
	original_name: string;
	popularity: number | undefined;
	profile_path: string;
}

interface ICastResult {
	slug: string;
	character: string | undefined;
	credit_id: string;
	gender: string | undefined;
	id: number;
	known_for_department: string | undefined;
	name: string;
	original_name: string;
	popularity: number | undefined;
	profile: string;
}
