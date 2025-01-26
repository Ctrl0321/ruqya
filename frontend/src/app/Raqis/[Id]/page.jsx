"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import sampledata from "@/data/sampledata.json";
import ReactCountryFlag from "react-country-flag";
import Link from "next/link";
import { MdOutlineMessage } from "react-icons/md";
import Button from "@/components/ui/buttons/DefaultButton";

function Raqis() {
  const [data, setData] = useState(null);
  const params = useParams();
  const Id = parseInt(params.Id, 10);

  useEffect(() => {
    const foundData = sampledata.find((item) => item.id === Id);
    setData(foundData);
  }, [Id]);

  if (!Id) {
    return <p>No ID found.</p>;
  }

  if (data === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen mb-56 text-black">
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
      <div className="flex flex-col justify-center m-auto lg:flex-row lg:space-x-4 lg:space-y-0 space-y-4 lg:items-start items-center">
        <div className="flex flex-col lg:flex-row lg:space-x-4 lg:space-y-0 space-y-4 lg:items-start items-center w-full">
          <div id="one" className="flex flex-row justify-between items-center space-y-4 p-4 group -mt-16">
            <div className="h-48 w-48 p-2 bg-white rounded-lg">
              <img id="raqi-profile" src={data.image} alt={data.name} className="w-full h-full object-cover rounded-lg" />
              <div className="justify-center mt-4 hidden md:flex">
                <Link href={`/raqis/${data.id}/chat`} className="flex items-center bg-RuqyaGreen text-white w-full rounded-lg p-2">
                  <MdOutlineMessage className="mr-4" />
                  Chat with Raqi
                </Link>
              </div>
            </div>
          </div>
          <div className="md:flex hidden flex-col items-start space-y-2 p-4 group mt-10">
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
                    {lang.toUpperCase()}
                  </span>
                ))}
              </div>
            )}
            {data.Experience && <p>{data.Experience} Years of Experience</p>}
          </div>
        </div>
        <div className="flex-col items-center justify-center hidden md:flex">
          <div className="flex flex-col items-center justify-center w-56 m-5 rounded-lg border border-blue-400 p-4">
            <h3 className="mb-3">Want to have a Session ?</h3>
            <Button href={"/raqis/book/" + data.id} bg={true} text="Book Now" className="w-full bg-RuqyaGreen text-white rounded-lg p-3" />
          </div>
        </div>
      </div>
      <div className="flex md:hidden flex-col items-start space-y-2 text-xl p-4 group mx-3">
        {data.name && (
          <h1 className="text-4xl font-semibold flex flex-row">
            {data.name} <p className="ml-5 m-2 px-3 p-1 bg-green-400 rounded-2xl text-sm font-sans font-normal">{data.status ? data.status : ""}</p>
          </h1>
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
                {lang.toUpperCase()}
              </span>
            ))}
          </div>
        )}
        {data.Experience && <p>{data.Experience} Years of Experience</p>}
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default Raqis;
