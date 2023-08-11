import React, { Suspense } from 'react'
import Slider from '../components/Slider'
import Link from "next/link"
import axios from 'axios'
import Cards from '@/components/Cards';
import AiringSchedule from '@/components/AiringSchedule';
import CardSkeleton from '@/components/CardSkeleton';
const getTrendingAnime = async () => {
  try {
    const response = await axios.get("https://animetrix-api.vercel.app/meta/anilist/trending", {
      responseType: 'json'
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
const getRecentAnime = async () => {
  try {
    const response = await axios.get("https://animetrix-api.vercel.app/meta/anilist/popular", {
      responseType: 'json'
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching recent anime:", error);
    return [];
  }
};

export default async function page() {
  const Trending = await getTrendingAnime()
  const Recent = await getRecentAnime()
  return (
    <div className="p-4 pb-40 md:pb-10 text-xl font-semibold flex-1 h-screen">
      <Slider posts={Trending} />


        <div className='flex flex-col mt-9'>
          <div className="flex justify-between items-center">
            <h1 className='text-3xl lg:text-5xl font-bold'>Popular</h1>
            <Link href={"/popular"} className='text-sm lg:text-lg'>Load more</Link>
          </div>
          <div className='flex gap-2'>
            <Cards props={Recent} />
          </div>
        </div>


        <div className='flex flex-col mt-9'>
          <div className="flex justify-between items-center">
            <h1 className='text-3xl lg:text-5xl font-bold'>Trending</h1>
            <Link href={"/trending"} className='text-sm lg:text-lg'>Load more</Link>
          </div>
          <div className='flex gap-2'>
            <Cards props={Trending} />
          </div>
        </div>

      <Suspense fallback={<h1>Loading Airing Schedule...</h1>}>
        <AiringSchedule />
      </Suspense>

    </div>
  )
}
