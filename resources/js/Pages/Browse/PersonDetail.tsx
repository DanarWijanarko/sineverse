import { Fragment } from "react";
import { Head } from "@inertiajs/react";

import { toTitle } from "@/Services/Utils/Format/slug/toTitle";
import { useDetailPerson } from "@/Hooks/Api/useDetails";
import { age } from "@/Services/Utils/Format/tmdb/age";
import { PageProps } from "@/Types";

import { externalIds } from "@/Services/Utils/Format/tmdb/externalIds";
import MultiCarousel from "@/Components/Carousel/MultiCarousel";
import { TabMenu, TabItem } from "@/Components/Common/TabMenu";
import ShareIcon from "@/Components/Icons/ShareIcon";
import CustomImage from "@/Components/Common/Image";
import LikeIcon from "@/Components/Icons/LikeIcon";
import MainLayout from "@/Layouts/MainLayout";
import CinemaCard from "@/Components/Cards/CinemaCard";
import Skeleton from "@/Components/Common/Skeleton";

const PersonDetail = ({ person_slug, person_id }: PageProps) => {
	const person = useDetailPerson(person_id, ["personDetail"], true);

	const profileTemplate = (item: any) => {
		return (
			<CustomImage
				src={item}
				alt="photo"
				preview={true}
				imageClassName="max-h-96"
				className="mx-1.5"
			/>
		);
	};

	const skeletonResultsArr = Array.from(Array(10).keys());

	return (
		<MainLayout>
			<Head title={toTitle(person_slug)} />

			<section className="flex w-full shrink-0 grow-0 flex-row pl-20 pt-28">
				{/* Detail Person */}
				<div className="flex min-w-[300px] max-w-[300px] flex-col gap-4">
					{/* Person Image */}
					<img
						src={person.data?.profile}
						alt={person.data?.name}
						className="rounded-lg"
					/>

					{/* External Ids */}
					<div className="flex flex-row gap-3">
						{person.data?.external_ids?.map((item, index) => (
							<a
								key={index}
								href={
									item.media === "imdb"
										? `https://${item.media}.com/name/${item.id}`
										: `https://${item.media}.com/${item.id}`
								}
								target="_blank"
							>
								{externalIds(item.media)}
							</a>
						))}
					</div>

					{/* Known For Department */}
					<div className="flex flex-col">
						<h1 className="text-base font-extrabold tracking-wider text-white">
							Known for Department
						</h1>
						<p className="text-sm font-medium tracking-wide text-gray">
							{person.data?.known_for_department}
						</p>
					</div>

					{/* Popularity */}
					<div className="flex flex-col">
						<h1 className="text-base font-extrabold tracking-wider text-white">
							Popularity
						</h1>
						<p className="text-sm font-medium tracking-wide text-gray">
							{person.data?.popularity}
						</p>
					</div>

					{/* Gender */}
					<div className="flex flex-col">
						<h1 className="text-base font-extrabold tracking-wider text-white">
							Gender
						</h1>
						<p className="text-sm font-medium tracking-wide text-gray">
							{person.data?.gender}
						</p>
					</div>

					{/* Age */}
					<div className="flex flex-col">
						<h1 className="text-base font-extrabold tracking-wider text-white">Age</h1>
						<p className="text-sm font-medium tracking-wide text-gray">
							{age(person.data?.birthday)}
						</p>
					</div>

					{/* Birthday */}
					<div className="flex flex-col">
						<h1 className="text-base font-extrabold tracking-wider text-white">
							Birthday
						</h1>
						<p className="text-sm font-medium tracking-wide text-gray">
							{person.data?.birthday}
						</p>
					</div>

					{/* Place of Birth */}
					<div className="flex flex-col">
						<h1 className="text-base font-extrabold tracking-wider text-white">
							Place of Birth
						</h1>
						<p className="text-sm font-medium tracking-wide text-gray">
							{person.data?.place_of_birth}
						</p>
					</div>

					{/* Also Known As */}
					<div className="flex flex-col">
						<h1 className="text-base font-extrabold tracking-wider text-white">
							Also Known As
						</h1>
						<p className="text-sm font-medium tracking-wide text-gray">
							{person.data?.also_known_as.map((known, index) => {
								return (
									<Fragment key={index}>
										{known}
										<span
											className={
												index === person.data?.also_known_as.length - 1
													? "hidden"
													: ""
											}
										>
											,{" "}
										</span>
									</Fragment>
								);
							})}
						</p>
					</div>
				</div>

				{/* Biography, Image, Cinema List */}
				<div className="h-full w-full">
					{/* Person Name & Buttons */}
					<div className="flex w-full flex-row items-center justify-between pl-5 pr-20">
						<h1 className="text-3xl font-extrabold text-white">{person.data?.name}</h1>

						{/* Buttons */}
						<div className="flex items-end gap-2.5">
							{/* Share */}
							<button className="flex items-center justify-center gap-1.5 rounded-lg border-2 border-black-700 bg-black-900 px-3 py-1.5 text-sm font-bold transition-all hover:opacity-85">
								<ShareIcon className="h-3.5 w-3.5" />
								Share
							</button>

							{/* Like */}
							<button className="flex items-center justify-center gap-1.5 rounded-lg border-2 border-black-700 bg-black-900 px-3 py-1.5 text-sm font-bold transition-all hover:opacity-85">
								<LikeIcon className="h-3.5 w-3.5" />
								Like
							</button>
						</div>
					</div>

					{/* Biography */}
					<div className="mt-5 flex w-full flex-col gap-2 pl-5 pr-20">
						<h1 className="text-lg font-bold text-white">Biography</h1>
						<p className="font-medium">{person.data?.biography}</p>
					</div>

					{/* Profile Pictures */}
					<div className="mt-5 flex w-full flex-col gap-2">
						<h1 className="pl-5 text-lg font-bold text-white">Profile Pictures</h1>
						<MultiCarousel
							value={person.data?.images}
							className="pl-3.5 pr-[76px]"
							numScroll={2}
							numVisible={5}
							showIndicators={false}
							showNavigators={true}
							isLoading={person.isPending}
							itemTemplate={profileTemplate}
						/>
					</div>

					<div className="mb-10 mt-12 h-[1px] w-full bg-black-700"></div>

					{/* Series & Movies Credits */}
					<TabMenu rootClassName="pr-20 pl-5" headerClassName="text-lg" activeIndex={0}>
						<TabItem name="Series">
							<div className="grid grid-cols-5 gap-3">
								{person.isPending
									? skeletonResultsArr.map((_, index) => (
											<Skeleton
												key={index}
												className="h-40 w-full rounded-lg"
											/>
										))
									: person.data?.tv_credits.map((series, index) => (
											<CinemaCard
												key={index}
												href="#"
												data={series}
												className="grid-cols-1"
											/>
										))}
							</div>
						</TabItem>

						<TabItem name="Movies">
							<div className="grid grid-cols-5 gap-3">
								{person.isPending
									? skeletonResultsArr.map((_, index) => (
											<Skeleton
												key={index}
												className="h-40 w-full rounded-lg"
											/>
										))
									: person.data?.movie_credits.map((movies, index) => (
											<CinemaCard
												key={index}
												href="#"
												data={movies}
												className="grid-cols-1"
											/>
										))}
							</div>
						</TabItem>
					</TabMenu>
				</div>
			</section>
		</MainLayout>
	);
};

export default PersonDetail;
