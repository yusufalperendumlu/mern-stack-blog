import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getAllPosts } from "../../../services/index/posts";

import ArticleCard from "../../../components/ArticleCard";

const Articles = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <section className="flex flex-col container mx-auto px-5 py-10">
      <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {!isLoading &&
          !isError &&
          data?.map((post) => (
            <ArticleCard
              key={post._id}
              post={post}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] bg-black md:bg-white lg:bg-white"
            />
          ))}
      </div>
      <button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 ease-linear">
        <span>More article</span>
        <FaArrowRight className="w-3 h-3" />
      </button>
    </section>
  );
};

export default Articles;
