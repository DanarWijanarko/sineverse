import { useDetailCinema } from "@/Hooks/Api/useDetails";
import MainLayout from "@/Layouts/MainLayout";
import { toTitle } from "@/Services/Utils/Format/slug/toTitle";
import { PageProps } from "@/Types";
import { Head } from "@inertiajs/react";
import React from "react";

const Detail = ({ movies_id, movies_slug, media_type }: PageProps) => {
	const movies = useDetailCinema(movies_id, ["movies", movies_slug], media_type, !!movies_id);

	console.log(movies.data);

	return (
		<MainLayout>
			<Head title={toTitle(movies_slug)} />
		</MainLayout>
	);
};

export default Detail;
