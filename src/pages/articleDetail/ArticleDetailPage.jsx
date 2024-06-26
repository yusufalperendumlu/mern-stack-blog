import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { images, stables } from "../../constants";
import { getSinglePost } from "../../services/index/posts";

import SuggestedPosts from "./container/SuggestedPosts";
import BreadCrumbs from "../../components/BreadCrumbs";
import CommentsContainer from "../../components/comments/CommentsContainer";
import MainLayout from "../../components/MainLayout";
import SocialShareButtons from "../../components/SocialShareButtons";

const postsData = [
  {
    _id: 1,
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-11-05T18:18:29.607+0000",
  },
  {
    _id: 2,
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-11-05T18:18:29.607+0000",
  },
  {
    _id: 3,
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-11-05T18:18:29.607+0000",
  },
  {
    _id: 4,
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-11-05T18:18:29.607+0000",
  },
  {
    _id: 5,
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-11-05T18:18:29.607+0000",
  },
  {
    _id: 6,
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-11-05T18:18:29.607+0000",
  },
];

const tagsData = [
  "Medical",
  "Lifestyle",
  "Learn",
  "Healthy",
  "Food",
  "Diet",
  "Education",
];

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    onSuccess: (data) => {
      console.log(data);
      setBreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: "Article title", link: `/blog/${data.slug}` },
      ]);
    },
  });

  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbsData} />
          <img
            className="rounded-xl w-full"
            src={
              data?.photo
                ? stables.UPLOAD_FOLDER_BASE_URL + data.photo
                : images.SampleImage
            }
            alt={data?.title}
          />
          {data?.categories.map((category) => (
            <Link
              to="/blog?category=selectedCategory"
              className="text-primary text-sm font-roboto inline-block mt-4 md:text-base"
            >
              {category.name}
            </Link>
          ))}
          <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
            Help children get better education
          </h1>
          <div className="mt-4 text-dark-soft">
            <p className="leading-7">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              dolore deserunt mollitia alias expedita ducimus vel iusto
              consequatur iste magni harum, facere voluptatem nesciunt cum illum
              sint nostrum tempore nihil? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Saepe dolor recusandae ex eaque natus ea magnam
              voluptatibus, magni non ut autem odio sit similique porro minima
              sint consequuntur. Accusantium, perferendis!
            </p>
          </div>
          <CommentsContainer className="mt-10" loggenedUserId="a" />
        </article>
        <div>
          <SuggestedPosts
            header="Latest Article"
            posts={postsData}
            tags={tagsData}
            className="mt-8 lg:mt-0 lg:max-w-xs"
          />
        </div>
      </section>
      <div className="fixed top-0 left-0 bg-white py-4 px-2 h-full z-50 opacity-90 border-r-2 mb-4 hidden lg:block">
        <div className="flex justify-center items-start flex-col h-full">
          <SocialShareButtons
            url={encodeURI("https://github.com/yusufalperendumlu")}
            title={encodeURIComponent(
              "Client-side and Server-side explanation"
            )}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ArticleDetailPage;
