"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import sampledata from "@/data/sampledata.json";
import ReactCountryFlag from "react-country-flag";
import Link from "next/link";
import { MdOutlineMessage, MdTrendingDown, MdOutlineTrendingUp } from "react-icons/md";
import Button from "@/components/ui/buttons/DefaultButton";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList, CartesianGrid } from "recharts";
import review from "@/data/review.json";
import ReviewCard from "@/components/cards/ReviewCard";
import Forth from "@/components/ui/home/Forth";
import Loading from "@/components/shared/common/LoadingSpinner";
import { languages } from "@/lib/constance";
import {ChatWidgetWrapper} from "@/components/getStream/chat/ChatWidgetWrapper";
import {useChat} from "@/components/getStream/chat/ChatContextProvider";

function Raqis() {
  const [data, setData] = useState(null);
  const params = useParams();
  const Id = params.Id;
  const [showFullAbout, setShowFullAbout] = useState(false);
  const maxAboutLength = 300; // Set the maximum length for the about section

  useEffect(() => {
    const foundData = sampledata.find((item) => item.id.toString() === Id);
    setData(foundData);
  }, [Id]);

  const { setUserId } = useChat();

  const handleStartChat = (otherUser) => {
      setUserId(otherUser);
  };

  if (!Id) {
    return <p className="min-h-screen text-black">No ID found.</p>;
  }

  if (data === null) {
    return <Loading/>;
  }

  if (!data) {
    return <div className="flex items-center justify-center min-h-screen text-black"><p>Data not available.</p></div>;
  }

  const overallAverage = data.rating?.reviewBreakdown ? data.rating.reviewBreakdown.reduce((sum, value) => sum + value, 0) / data.rating.reviewBreakdown.length : 0;

  const chartData = [
    { name: "5", real: data.rating?.reviewBreakdown ? data.rating.reviewBreakdown[0] : 0, value: data.rating?.reviewBreakdown ? Math.min(data.rating.reviewBreakdown[0], overallAverage) : 0, fill: "#4caf50" },
    { name: "4", real: data.rating?.reviewBreakdown ? data.rating.reviewBreakdown[1] : 0, value: data.rating?.reviewBreakdown ? Math.min(data.rating.reviewBreakdown[1], overallAverage) : 0, fill: "#9c27b0" },
    { name: "3", real: data.rating?.reviewBreakdown ? data.rating.reviewBreakdown[2] : 0, value: data.rating?.reviewBreakdown ? Math.min(data.rating.reviewBreakdown[2], overallAverage) : 0, fill: "#ffeb3b" },
    { name: "2", real: data.rating?.reviewBreakdown ? data.rating.reviewBreakdown[3] : 0, value: data.rating?.reviewBreakdown ? Math.min(data.rating.reviewBreakdown[3], overallAverage) : 0, fill: "#03a9f4" },
    { name: "1", real: data.rating?.reviewBreakdown ? data.rating.reviewBreakdown[4] : 0, value: data.rating?.reviewBreakdown ? Math.min(data.rating.reviewBreakdown[4], overallAverage) : 0, fill: "#ffeb3b" },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => {
      if (i < Math.floor(rating)) {
        return <FaStar key={i} color="#ffc107" />;
      } else if (i < rating) {
        return <FaStarHalfAlt key={i} color="#ffc107" />;
      } else {
        return <FaStar key={i} color="#e4e5e9" />;
      }
    });
  };

  function formatReviewsCount(count) {
    if (count >= 1000) {
      return (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + "k";
    }
    return count.toString();
  }

  const getLanguageLabel = (value) => {
    const language = languages.find(lang => lang.value === value);
    return language ? language.label : value;
  };

  return (
    <div className="min-h-screen  text-black">
      <nav aria-label="Breadcrumb m-10" className="mb-6">
        <ol className="flex items-center space-x-2 mx-5 mt-5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>{data.name}</li>
        </ol>
      </nav>
      {data.bannerImage ? <img src={data.bannerImage} alt={data.name} className="w-full h-48 object-cover bg-gray-600" /> : <div className="w-full h-48 bg-gray-600"></div>}

      <div className="flex flex-col md:flex-row items-center mx-4">
        <div className=" flex flex-col p-2 bg-white rounded-xl -mt-16">
          <img id="raqi-profile" src={data.image} alt={data.name} className="h-48 w-48 object-cover rounded-lg" />
          <div className="justify-center mt-4 hidden md:flex m-auto w-full">
            <button onClick={() => handleStartChat('679bba803d6f1d2003462721')} className="flex items-center justify-center text-center bg-RuqyaGreen text-white w-full rounded-lg py-2 px-3">
              <MdOutlineMessage className="mr-3 " />
              Chat with Raqi
            </button>
          </div>
        </div>

        <div className="md:flex hidden flex-col items-start gap-2 p-4 group">
          {data.name && <h1 className="text-2xl font-semibold">{data.name}</h1>}
          {data.Country && (
            <div className="flex items-center space-x-1">
              <p>{data.Country}</p>
              <ReactCountryFlag countryCode={data.CountryCode} svg className="w-6 h-6" title={data.Country} />
            </div>
          )}
          {data.Languages && (
            <div className="flex items-center space-x-2">
              {data.Languages.map((lang, index) => (
                <span key={index} className="px-2 py-1 bg-yellow-300 rounded-lg text-sm">
                  {getLanguageLabel(lang)}
                </span>
              ))}
            </div>
          )}
          {data.Experience && <p>{data.Experience} Years of Experience</p>}
        </div>

        <div className="flex-col items-center justify-center hidden md:flex ml-auto">
          <div className="flex flex-col items-center justify-center w-56 m-5 rounded-lg border border-blue-400 p-4">
            <h3 className="mb-3">Want to have a Session ?</h3>
            <Button link={"/Raqis/" + data.id + '/book'} bg={true} text="Book Now" className="w-full bg-RuqyaGreen text-white rounded-lg p-3" />
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex md:hidden flex-col items-start mx-4 space-y-1 gap-3 text-xl group mt-2">
        {data.name && (
          <div className="text-4xl flex flex-row gap-3">
            <h1 >{data.name}</h1>
            <p className={`ml-auto w-auto m-auto px-3 p-1 rounded-2xl text-sm ${data.status === "Available" ? "bg-[#C1FFD1]" : "bg-red-400"}`}>{data.status ? `${data.status}` : ""}</p>
          </div>
        )}
        {data.Country && (
          <div className="flex items-center space-x-1">
            <p>{data.Country}</p>
            <ReactCountryFlag countryCode={data.CountryCode} svg className="w-6 h-6" title={data.Country} />
          </div>
        )}
        {data.Languages && (
          <div className="flex items-center space-x-2">
            {data.Languages.map((lang, index) => (
              <span key={index} className="px-2 py-1 bg-yellow-300 rounded-lg text-sm">
                {getLanguageLabel(lang)}
              </span>
            ))}
          </div>
        )}
        {data.Experience && <p>{data.Experience} Years of Experience</p>}
        <div className="flex flex-col items-center justify-center w-full gap-5 pt-3">
          <Button onClick={() => handleStartChat('6790bfce3ad260fbee7fdb0c')} className="flex text-lg items-center bg-RuqyaGreen text-white w-full rounded-lg px-1 py-3">
            <MdOutlineMessage className="mr-3 text-3xl" /> Chat with Raqi
          </Button>

          {/* <Button text="Book Now"  link={"/Raqis/" + data.id + '/book'} onClick className="flex text-lg items-center bg-RuqyaGreen text-white w-full rounded-lg px-2 py-3"></Button> */}
        </div>
      </div>
      {data.about && (
        <div className="mx-4 md:mx-10">
          <h3 className="font-bold my-5 text-2xl">About</h3>
          <p>
            {showFullAbout ? data.about : `${data.about.substring(0, maxAboutLength)}...`}
            {data.about.length > maxAboutLength && (
              <button onClick={() => setShowFullAbout(!showFullAbout)} className="text-blue-500">
                {showFullAbout ? " See Less" : " See More"}
              </button>
            )}
          </p>
        </div>
      )}

      {data.rating && (
        <div className="mx-3 md:mx-10 mt-10">
          <h3 className="font-bold text-2xl mb-5 text-left">Reviews</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 md:gap-4 pr-5">
            <div className="flex justify-center items-center mr-2 flex-col border-gray-300 w-full">
              <div className="w-full text-left">
                <h2 className="text-lg font-bold mb-3">Average Rating</h2>
                <div className="flex flex-row justify-start items-center gap-3">
                  <div className="text-4xl font-bold">{data.rating ? data.rating.averageRating : 0}</div>
                  <div className="flex text-yellow-500 text-2xl md:space-x-3">{renderStars(data.rating.averageRating)}</div>
                </div>
                <div className="text-gray-600">Average rating on this year</div>
              </div>
            </div>

            <div className="flex justify-center items-center flex-col ml-4 border-l pl-5  md:border-r border-gray-300">
              <div className="w-full text-left">
                <h2 className="text-lg font-bold mb-5">Total Reviews</h2>

                <div className="flex flex-row text-3xl font-bold">
                  {formatReviewsCount(data.rating ? data.rating.totalReviews : 0)}
                  <span className={`text-sm ml-3 rounded-lg flex m-auto py-0.5 px-2 items-center  ${data.rating && data.rating.reviewsGrowth > 0 ? "bg-green-100" : "bg-red-100"}`}>
                    {data.rating ? data.rating.reviewsGrowth : 0}%{data.rating && data.rating.reviewsGrowth > 0 ? <MdOutlineTrendingUp className="text-green-500 ml-1" /> : <MdTrendingDown className="text-red-500 ml-1" />}
                  </span>
                </div>

                <div className="text-gray-600">growth in reviews on this year</div>
              </div>
            </div>

            {/* <h2 className="text-lg font-medium">Review Breakdown</h2> */}
            <div className="hidden md:flex flex-row font-bold items-center">
              <div className="flex flex-col gap-0">
                <span className="flex flex-row items-center">
                  <FaStar className="text-gray-400 mr-2" />5
                </span>
                <span className="flex flex-row items-center">
                  <FaStar className="text-gray-400 mr-2" />4
                </span>
                <span className="flex flex-row items-center">
                  <FaStar className="text-gray-400 mr-2" />3
                </span>
                <span className="flex flex-row items-center">
                  <FaStar className="text-gray-400 mr-2" />2
                </span>
                <span className="flex flex-row items-center">
                  <FaStar className="text-gray-400 mr-2" />1
                </span>
              </div>
              <BarChart width={300} height={105} data={chartData} layout="vertical" className="mt-[3px]">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" hide />
                <CartesianGrid horizontal={false} vertical={false} />
                <Bar dataKey="value" radius={[30, 30, 30, 30]} barSize={10}>
                  <LabelList dataKey="real" position="right" />
                  {chartData.map((entry, index) => (
                    <Bar key={`bar-${index}`} dataKey="value" fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </div>
        </div>
      )}
      <div className="mx-8 mt-5">
        <div className="border-b w-full mb-5"></div>
        {review.map((review, index) => (
          <ReviewCard key={index} review={review} colorIndex={index} />
        ))}
      </div>
      <Forth raqiData={sampledata} title="Similar Raqis" className="mx-5 md:mx-9"/>
      <ChatWidgetWrapper/>
    </div>
  );
}

export default Raqis;
