'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import RaqisCard from "@/components/cards/RaqisCard"
import sampledata from "../sampledata.json"


// Main Page Component
export default function BookRaqis() {
  // Add these near the top with other calculations
  const experienceRange = {
    min: Math.min(...sampledata.map(raqi => raqi.Experience || 0)),
    max: Math.max(...sampledata.map(raqi => raqi.Experience || 0)),
    current: 0
  };

  // State management
  const [filteredData, setFilteredData] = useState(sampledata);
  const [userSelections, setUserSelections] = useState({
    experience: experienceRange.min,
    languages: [],
    availability: {
      date: null,
      time: null,
      duration: null
    },
    countries: []
  });

  // Updated experience change handler
  const handleExperienceChange = (value) => {
    const numValue = parseInt(value, 10);
    setUserSelections(prev => ({
      ...prev,
      experience: Math.max(experienceRange.min, Math.min(experienceRange.max, numValue))
    }));
  };

  // Extract unique languages with null check
  const availableLanguages = [...new Set(sampledata
    .filter(raqi => Array.isArray(raqi.Languages) && raqi.Languages.length > 0)
    .flatMap(raqi => raqi.Languages))
  ].sort();

  // Extract unique values from sample data
  const availableCountries = [...new Set(sampledata.map(raqi => raqi.Country))].sort();
  const availableDurations = [...new Set(sampledata.map(raqi => raqi.bookedDuration))].sort((a, b) => a - b);

  // Updated language change handler
  const handleLanguageChange = (event, language) => {
    setUserSelections(prev => ({
      ...prev,
      languages: event.target.checked
        ? [...prev.languages, language]
        : prev.languages.filter(l => l !== language)
    }));
  };

  const handleCountryChange = (event, country) => {
    setUserSelections(prev => ({
      ...prev,
      countries: event.target.checked
        ? [...prev.countries, country]
        : prev.countries.filter(c => c !== country)
    }));
  };

  const handleDateChange = (date) => {
    setUserSelections(prev => ({
      ...prev,
      availability: { ...prev.availability, date }
    }));
  };

  const handleDurationChange = (duration) => {
    setUserSelections(prev => ({
      ...prev,
      availability: { ...prev.availability, duration: parseInt(duration) }
    }));
  };

  // Updated filter logic with null check
  useEffect(() => {
    let result = sampledata;

    // Filter by languages if any are selected
    if (userSelections.languages.length > 0) {
      result = result.filter(raqi => 
        Array.isArray(raqi.Languages) && 
        raqi.Languages.length > 0 && 
        userSelections.languages.every(lang => raqi.Languages.includes(lang))
      );
    }

    // Filter by countries
    if (userSelections.countries.length > 0) {
      result = result.filter(raqi => 
        userSelections.countries.includes(raqi.Country)
      );
    }

    // Filter by experience
    if (userSelections.experience > 0) {
      result = result.filter(raqi => 
        raqi.Experience >= userSelections.experience
      );
    }

    // Filter by availability
    if (userSelections.availability.date) {
      result = result.filter(raqi => 
        raqi.bookedDate === userSelections.availability.date
      );
    }

    if (userSelections.availability.duration) {
      result = result.filter(raqi => 
        raqi.bookedDuration === userSelections.availability.duration
      );
    }

    setFilteredData(result);
  }, [userSelections]);

  // Add this before the return statement
  const experienceLevels = sampledata
    .map(raqi => raqi.Experience)
    .filter(exp => exp !== undefined)
    .sort((a, b) => a - b);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mb-56">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li>/</li>
          <li>Book Raqis</li>
        </ol>
      </nav>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-72 space-y-6 bg-RuqyaLightPurple p-6 rounded-lg">
         
          {/* Updated Experience Level Section */}
          <div className="filter-section border-b border-gray-200 pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Experience Level</h2>
              <span className="text-sm text-gray-600">
                {userSelections.experience} Year{userSelections.experience !== 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="space-y-4">
              <input 
                type="range" 
                min={experienceRange.min}
                max={experienceRange.max}
                step="1"
                value={userSelections.experience} 
                onChange={(e) => handleExperienceChange(e.target.value)} 
                className="w-full accent-primary"
              />
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>{experienceRange.min} Year{experienceRange.min !== 1 ? 's' : ''}</span>
                <div className="flex ">
                  {experienceLevels.map((level) => (
                    <div
                      key={level}
                      className={`h-1 w-1 rounded-full ${
                        level <= userSelections.experience 
                          ? 'bg-primary' 
                          : 'bg-gray-300'
                      }`}
                      title={`${level} year${level !== 1 ? 's' : ''}`}
                    />
                  ))}
                </div>
                <span>{experienceRange.max} Year{experienceRange.max !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Languages Filter Section */}
          <div className="filter-section border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="flex-1">Languages</span>
              <div className="text-xs text-gray-500">
                {userSelections.languages.length} selected
              </div>
            </h2>
            <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
              {availableLanguages.map((language) => (
                <div key={language} className="flex items-center space-x-1 hover:bg-white/50 p-2 rounded-md">
                  <input
                    type="checkbox"
                    id={`language-${language}`}
                    checked={userSelections.languages.includes(language)}
                    onChange={(e) => handleLanguageChange(e, language)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <label
                    htmlFor={`language-${language}`}
                    className="text-sm flex-1 cursor-pointer"
                  >
                    {language}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Countries Filter */}
          <div className="filter-section border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="flex-1">Countries</span>
              <div className="text-xs text-gray-500">
                {userSelections.countries.length} selected
              </div>
            </h2>
            <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
              {availableCountries.map((country) => (
                <div key={country} className="flex items-center space-x-1 hover:bg-white/50 p-2 rounded-md">
                  <input
                    type="checkbox"
                    id={`country-${country}`}
                    checked={userSelections.countries.includes(country)}
                    onChange={(e) => handleCountryChange(e, country)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor={`country-${country}`} className="text-sm flex-1 cursor-pointer">
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
                <input
                  type="date"
                  value={userSelections.availability.date || ''}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full rounded-md border-gray-300 text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Duration (minutes)</label>
                <select
                  value={userSelections.availability.duration || ''}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  className="w-full rounded-md border-gray-300 text-sm"
                >
                  <option value="">Any duration</option>
                  {availableDurations.map(duration => (
                    <option key={duration} value={duration}>{duration} min</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Debug section */}
          {/* <div className="filter-section bg-white rounded-md">
            <details>
              <summary className="font-semibold cursor-pointer">Selected Filters</summary>
              <pre className="whitespace-pre-wrap text-xs mt-2 p-2 bg-gray-50">
                {JSON.stringify(userSelections, null, 2)}
              </pre>
            </details>
          </div> */}
        </aside>

        {/* Practitioners Grid */}
        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Available Practitioners</h1>
            <p className="text-gray-600">Found {filteredData.length} practitioners matching your criteria</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((practitioner) => (
              <RaqisCard key={practitioner.id} raqi={practitioner} />
            ))}
          </div>
          {filteredData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No practitioners found matching your criteria
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

