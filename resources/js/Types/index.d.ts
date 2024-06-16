import type { Errors, ErrorBag } from "@inertiajs/core";

export interface User {
    id: number;
    username: string;
    email: string;
}

export interface IFlashMessage {
    type: "success" | "error";
    message: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    flash_message: IFlashMessage;
    errors: Errors & ErrorBag;
};
