import { useState } from "react";

type Values<T extends object> = T;

export const useMultiState = <T extends object>(initialState: T) => {
    const [data, setDatas] = useState<Values<T>>(initialState);

    const setData = <K extends keyof T>(key: K, value: T[K]): void => {
        setDatas((prev) => ({ ...prev, [key]: value }));
    };

    const reset = (): void => {
        setDatas(initialState);
    };

    return { data, setData, reset };
};
