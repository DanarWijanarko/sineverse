import { baseImgUrl } from "@/Services/Axios/TmdbInstance";

export const VImg = (imgUrl: string) => {
    if (!imgUrl) return "/images/errors/VImg.png";

    return baseImgUrl + imgUrl;
};
