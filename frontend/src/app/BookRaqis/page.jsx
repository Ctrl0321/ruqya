"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import RaqisCard from "@/components/cards/RaqisCard";
import { FaFilter, FaRegCalendarAlt, FaTimes } from "react-icons/fa";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import Grid from "@/components/ui/layout/GridForBooking";
import RatingInput from "@/components/ui/input/rating";
import { useSearchParams } from "next/navigation";
import { languages, countries } from "@/lib/constance";
import { getRakis } from "@/lib/api";

// Main Page Component
export default function BookRaqis() {
  const [raqiData, setRaqiData] = useState([]);

  useEffect(() => {
    async function fetchRakis() {
      const rakis = await getRakis();
      setRaqiData(rakis);
    }

    fetchRakis();
  }, []);

  const experienceRange = {
    min: raqiData.length > 0 ? Math.min(...raqiData.map((raqi) => raqi.yearOfExperience || 0)) : 0,
    max: raqiData.length > 0 ? Math.max(...raqiData.map((raqi) => raqi.yearOfExperience || 0)) : 0,
    current: 0,
  };

  const [filteredData, setFilteredData] = useState(raqiData);
  const [userSelections, setUserSelections] = useState({
    experience: [experienceRange.min, experienceRange.max],
    languages: [],
    availability: {
      date: null,
      time: null,
      duration: null,
    },
    countries: [],
  });
  const [rating, setRating] = useState(0);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleExperienceChange = (values) => {
    setUserSelections((prev) => ({
      ...prev,
      experience: values,
    }));
  };

  const availableLanguages = [
    ...new Set(
      raqiData
        .filter((raqi) => Array.isArray(raqi.languages) && raqi.languages.length > 0)
        .flatMap((raqi) => raqi.languages)
        .map((langCode) => {
          const langObj = languages.find((l) => l.value === langCode);
          return langObj ? langObj.label : langCode;
        })
    ),
  ].sort();

  const availableCountries = [
    ...new Set(
      raqiData.map((raqi) => {
        const countryObj = countries.find((c) => c.value === raqi.country);
        return countryObj ? countryObj.label : raqi.country;
      })
    ),
  ].sort();

  const availableDurations = [...new Set(raqiData.map((raqi) => raqi.bookedDuration))].sort((a, b) => a - b);

  const handleLanguageChange = (event, languageLabel) => {
    const languageCode = languages.find((l) => l.label === languageLabel)?.value;
    setUserSelections((prev) => ({
      ...prev,
      languages: event.target.checked ? [...prev.languages, languageCode] : prev.languages.filter((l) => l !== languageCode),
    }));
  };

  const handleCountryChange = (event, countryLabel) => {
    const countryCode = countries.find((c) => c.label === countryLabel)?.value;
    setUserSelections((prev) => ({
      ...prev,
      countries: event.target.checked ? [...prev.countries, countryCode] : prev.countries.filter((c) => c !== countryCode),
    }));
  };

  const handleDateChange = (date) => {
    setUserSelections((prev) => ({
      ...prev,
      availability: { ...prev.availability, date },
    }));
  };

  const handleDurationChange = (duration) => {
    setUserSelections((prev) => ({
      ...prev,
      availability: { ...prev.availability, duration: parseInt(duration) },
    }));
  };

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");
  const language = searchParams.get("language");

  useEffect(() => {
    if (searchQuery || language) {
      setUserSelections((prev) => ({
        ...prev,
        languages: language ? [language] : prev.languages,
      }));
    }
  }, [searchQuery, language]);

  useEffect(() => {
    let result = raqiData;

    if (searchQuery) {
      result = result.filter((raqi) => raqi.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (userSelections.languages.length > 0) {
      result = result.filter((raqi) => Array.isArray(raqi.languages) && raqi.languages.length > 0 && userSelections.languages.every((lang) => raqi.languages.includes(lang)));
    }

    if (userSelections.countries.length > 0) {
      result = result.filter((raqi) => userSelections.countries.includes(raqi.country));
    }

    if (userSelections.experience[0] > 0 || userSelections.experience[1] < experienceRange.max) {
      result = result.filter((raqi) => raqi.yearOfExperience >= userSelections.experience[0] && raqi.yearOfExperience <= userSelections.experience[1]);
    }

    if (userSelections.availability.date) {
      result = result.filter((raqi) => raqi.bookedDate === userSelections.availability.date);
    }

    if (userSelections.availability.duration) {
      result = result.filter((raqi) => raqi.bookedDuration === userSelections.availability.duration);
    }

    if (rating > 0) {
      result = result.filter((raqi) => raqi.rating && raqi.rating.averageRating >= rating);
    }

    setFilteredData(result);
  }, [userSelections, rating, searchQuery, raqiData]);

  const experienceLevels = raqiData
    .map((raqi) => raqi.yearOfExperience)
    .filter((exp) => exp !== undefined)
    .sort((a, b) => a - b);

  return (
    <div className="mx-6 md:mx-6 lg:mx-4 px-4 py-8 min-h-screen mb-56">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>Book Raqis</li>
        </ol>
      </nav>
      <div className="flex flex-col md:flex-row gap-1">
        {/* Filters Sidebar */}
        <aside
          className={`w-full md:w-72 xl:w-80 md:space-y-6 h-screen ${isFilterVisible ? "block" : "hidden"} md:block fixed md:relative z-50 md:h-auto top-0 left-0 right-0 bottom-0 
        ${isFilterVisible ? "-mx-6 md:mx-0 -mt-8 md:mt-0" : ""}`}
        >
          {/* Dark overlay for mobile */}
          {isFilterVisible && <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden" onClick={() => setIsFilterVisible(false)} />}

          <div
            className="bg-RuqyaLightPurple p-4 rounded-none md:rounded-lg border border-gray-300 
                        fixed md:relative w-full md:w-auto h-full md:h-auto 
                        overflow-y-auto md:overflow-visible pb-20 md:pb-4 top-0 left-0 right-0 bottom-0"
          >
            <div className="pt-10 md:pt-0">
              {/* Close button for mobile view */}
              <button className="md:hidden absolute top-4 right-4 text-primary z-50" onClick={() => setIsFilterVisible(false)}>
                <FaTimes size={24} />
              </button>

              {/* Updated Experience Level Section */}
              <div className="filter-section border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Experience Level</h2>
                  <span className="text-sm text-gray-600 ">
                    {userSelections.experience[0]} - {userSelections.experience[1]} Year{userSelections.experience[1] !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="space-y-4 ml-5">
                  <Slider
                    range
                    min={experienceRange.min}
                    max={experienceRange.max}
                    value={userSelections.experience}
                    onChange={handleExperienceChange}
                    trackStyle={[{ backgroundColor: "green", height: 2 }]}
                    handleStyle={[
                      { borderColor: "green", height: 20, width: 20, marginLeft: -9, marginTop: -9 },
                      { borderColor: "green", height: 20, width: 20, marginLeft: -9, marginTop: -9 },
                    ]}
                    railStyle={{ backgroundColor: "gray", height: 2 }}
                  />

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      {experienceRange.min} Year{experienceRange.min !== 1 ? "s" : ""}
                    </span>
                    <div className="flex ">
                      {experienceLevels.map((level) => (
                        <div key={level} className={`h-1 w-1 rounded-full ${level <= userSelections.experience[1] ? "bg-primary" : "bg-gray-300"}`} title={`${level} year${level !== 1 ? "s" : ""}`} />
                      ))}
                    </div>
                    <span>
                      {experienceRange.max} Year{experienceRange.max !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Languages Filter Section */}
              <div className="filter-section border-b border-gray-200 pb-6">
                <h2 className="text-lg  mb-4 flex items-center">
                  <span className="flex-1 font-semibold">Languages</span>
                  <div className="text-xs text-gray-500">{userSelections.languages.length} selected</div>
                </h2>
                <div className="space-y-1">
                  {availableLanguages.map((language) => (
                    <div key={language} className="flex items-center space-x-1 hover:bg-white/50 p-2 rounded-md">
                      <input type="checkbox" id={`language-${language}`} checked={userSelections.languages.includes(languages.find((l) => l.label === language)?.value)} onChange={(e) => handleLanguageChange(e, language)} className="w-5 h-5 rounded text-primary border-none focus:ring-primary cursor-pointer" style={{ borderColor: "RuqyaLightPurple" }} />
                      <label htmlFor={`language-${language}`} className="text-sm flex-1 pl-2  cursor-pointer">
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Countries Filter */}
              <div className="filter-section border-b border-gray-200 pb-6">
                <h2 className="text-lg  mb-4 flex items-center">
                  <span className="flex-1 font-semibold">Countries</span>
                  <div className="text-xs text-gray-500">{userSelections.countries.length} selected</div>
                </h2>
                <div className="space-y-1">
                  {availableCountries.map((country) => (
                    <div key={country} className="flex items-center space-x-1 hover:bg-white/50 p-2 rounded-md">
                      <input type="checkbox" id={`country-${country}`} checked={userSelections.countries.includes(countries.find((c) => c.label === country)?.value)} onChange={(e) => handleCountryChange(e, country)} className="w-5 h-5 rounded text-primary border-none focus:ring-primary cursor-pointer" style={{ borderColor: "RuqyaLightPurple" }} />
                      <label htmlFor={`country-${country}`} className="text-sm pl-2 flex-1 cursor-pointer">
                        {country}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="filter-section pb-6">
                <h2 className="text-lg font-semibold mb-4">Availability</h2>
                <div className="space-y-4 bg-white/50 p-4 rounded-lg">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Date</label>
                    <input type="date" value={userSelections.availability.date || ""} onChange={(e) => handleDateChange(e.target.value)} className="w-full rounded-md border border-gray-300 text-sm pl-10 p-2 focus:border-primary focus:ring-primary" />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="flex flex-col justify-start items-start m-auto filter-section pb-6">
                <div className="flex justify-between items-center text-lg mb-4 w-full">
                  <span className="flex-1 font-semibold">Rating</span>
                  <div className="text-xs text-gray-500 ml-auto">
                    {rating == 5 ? "Minimun" : "Minimun"} {rating} stars{" "}
                  </div>
                </div>
                <RatingInput rating={rating} setRating={setRating} />
              </div>

              {/* Debug section */}
              {/* <div className="filter-section bg-white rounded-md">
              <details>
                <summary className="cursor-pointer">Selected Filters</summary>
                <pre className="whitespace-pre-wrap text-xs mt-2 p-2 bg-gray-50">
                  {JSON.stringify(userSelections, null, 2)}
                </pre>
              </details>
            </div> */}
            </div>
          </div>
        </aside>

        {/* Practitioners Grid */}
        <main className="flex-1">
          {/* Filter button for mobile view */}
          <button className="md:hidden text-primary mb-4 fixed bottom-4 right-4 bg-white p-2 rounded-full shadow-lg shadow-gray-500/50 border-2 border-[#0C8281] z-20" onClick={() => setIsFilterVisible(true)}>
            {isFilterVisible ? <FaTimes size={24} /> : <FaFilter size={24} />}
          </button>
          <Grid>
            {filteredData.map((practitioner, index) => (
              <RaqisCard key={`${practitioner._id}-${index}`} raqi={practitioner} className={"z-5"} />
            ))}
          </Grid>
          {filteredData.length === 0 && <div className="text-center py-8 text-gray-500">No practitioners found matching your criteria</div>}
        </main>
      </div>
    </div>
  );
}
