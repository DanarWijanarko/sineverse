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

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
	auth: {
		user: User;
	};
	flash_message: IFlashMessage;
	errors: Errors & ErrorBag;
	media_type: "movie" | "tv";
	series_slug: string;
	series_id: number;
	movies_slug: string;
	movies_id: number;
	person_slug: string;
	person_id: number;
	network_id: number;
	company_id: number;
	collection_id: number;
	query: string;
};
