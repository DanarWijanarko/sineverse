export const age = (birthday: string | undefined): number | undefined => {
	if (!birthday) return undefined;

	const today = new Date();
	const birthDate = new Date(birthday);
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDiff = today.getMonth() - birthDate.getMonth();

	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;

	return age;
};
