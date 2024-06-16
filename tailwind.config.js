/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],
    theme: {
        colors: {
            green: "#00925D",
            red: "#EB3F5E",
            gray: "#9CA4AB",
            white: "#FFFFFF",
            yellow: "#FFC700",
            black: {
                700: "#28262D",
                800: "#0D0C0F",
                900: "#08080A",
            },
            success: {
                300: "#B2DECE",
                500: "#32A77D",
                700: "#00925D",
            },
            error: {
                300: "#F9C5CE",
                500: "#EF657E",
                700: "#EB3F5E",
            },
        },
        extend: {
            fontFamily: {
                inter: ["inter"],
                Shrikhand: ["Shrikhand"],
            },
        },
    },
    plugins: [],
};
