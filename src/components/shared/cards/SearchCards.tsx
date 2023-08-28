"use client";
import React from "react";
import Anime from "@/types/animetypes";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ReloadFunc from "@/components/error/ReloadFunc";
type ModalCloseFunction = () => void;
const SearchCards = ({ results, modalClose }: { results: Anime[]; modalClose: ModalCloseFunction }) => {
    return (
        <>
            {results?.length > 0 ? (
                <div className="flex flex-col gap-6">
                    {results.slice(0, 10)?.map((anime, index) => (
                        <div key={index}>
                            <Link href={`/details/${anime?.id}`} className="flex overflow-hidden gap-3 items-center" onClick={modalClose}>
                                <img src={anime.image} alt="" className=" w-28 rounded-lg" />
                                <div className="flex flex-col gap-3 font-semibold overflow-hidden">
                                    <h1 className=" font-semibold text-lg md:text-xl truncate w-[90%]">{anime?.title?.userPreferred || anime.title.romaji || anime.title.english || anime.title.native}</h1>
                                    <div className="flex flex-wrap gap-3">
                                        {anime.genres.map((genres) => (
                                            <span key={Math.random()}>{genres}</span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <span>Episode : {anime.totalEpisodes || 0}</span>
                                        <span>Type : {anime.type || "Unknown"}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    <Link href={"/trending"} className="text-lg gap-3 font-semibold flex items-center" onClick={modalClose}>
                        View More
                        <ArrowRight />
                    </Link>
                </div>
            ) : (
                <ReloadFunc message="Error loading trending chart" />
            )}
        </>
    );
};

export default SearchCards;