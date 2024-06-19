import { baseImgUrl } from "@/Services/Axios/TmdbInstance";

export const HImg = (imgUrl: string) => {
    if (!imgUrl) return "/images/errors/HImg.png";

    return baseImgUrl + imgUrl;
};
