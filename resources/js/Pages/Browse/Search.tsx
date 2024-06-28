import CinemaCard from "@/Components/Cards/CinemaCard";
import { TabItem, TabMenu } from "@/Components/Common/TabMenu";
import Input from "@/Components/Forms/Input";
import SearchIcon from "@/Components/Icons/SearchIcon";
import { useSearch } from "@/Hooks/Api/useSearch";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/Types";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

const Search = ({ query }: PageProps) => {
	const results = useSearch(query, ["searchResults", query], !!query);

	const { data, setData, get } = useForm<{ query: string | undefined }>({ query: "" });

	const handleSearchFormSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		get(route("browse.search"));
	};

	return (
		<MainLayout>
			<Head title={`Search | ${query}`} />

			<form onSubmit={handleSearchFormSubmit} className="relative mx-32 mt-24">
				<Input
					type="text"
					name="Search"
					placeholder="Search Series, Movies, Person, Keywords, Company, or Collection"
					value={query}
					onChange={(e) => setData("query", e.target.value)}
				/>
				<button type="button" className="absolute right-3 top-1/2 -translate-y-1/2">
					<SearchIcon className="h-5 w-5" />
				</button>
			</form>

			<TabMenu rootClassName="px-20 mt-9" activeIndex={0}>
				{results.data?.map((data, index) => {
					return (
						<TabItem key={index} name={`${data.media_type}  ${data.results.length}`}>
							<div className="grid w-full grid-cols-4 gap-5">
								{data.results.map((item: any, index) => {
									if (data.media_type === "Persons") {
										return (
											<Link
												key={index}
												href={route("browse.person.detail", {
													id: item.id,
													slug: item.name,
												})}
												className="mr-1 flex flex-row gap-2 text-center"
											>
												<img
													src={item.profile}
													alt={item.name}
													className="h-14 w-14 rounded-full object-cover"
												/>
												<div className="flex flex-col items-start justify-center">
													<h1 className="line-clamp-1 text-start text-lg font-semibold text-white">
														{item.name}
													</h1>
													<p className="line-clamp-1 text-start text-sm font-medium text-gray">
														{item.known_for_department}
													</p>
												</div>
											</Link>
										);
									}
									if (
										data.media_type === "Series" ||
										data.media_type === "Movies"
									) {
										return (
											<CinemaCard
												key={index}
												href={route(`main.${item.media_type}.detail`, {
													id: item.id,
													slug: item.slug,
												})}
												data={item}
											/>
										);
									}
								})}
							</div>
						</TabItem>
					);
				})}
			</TabMenu>
		</MainLayout>
	);
};

export default Search;
