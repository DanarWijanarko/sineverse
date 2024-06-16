export const gender = (gender_id: number): string | undefined => {
    switch (gender_id) {
        case 0:
            return "Not set";
        case 1:
            return "Female";
        case 2:
            return "Male";
        case 3:
            return "Non Binary";
        default:
            return undefined;
    }
};
