'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import Button  from "@/components/ui/buttons/DefaultButton"
import { Star } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import RaqisCard from "@/components/cards/RaqisCard"

// Sample data
const sampledata = [
    {
      id: 1,
      name: "Raqi1",
      image: "https://s3-alpha-sig.figma.com/img/570b/fa64/c576670f6fc2491ee8b27ed25dfe6f6f?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FVPLxOlAZg~BigspbGx~9KX76Gpbf9I1sN2cAFowr~xo8q2eFmEUv3UB7Y15vMPXxC2BsuWJG3NrIg-O45GBz2bqQ9ornHnZ9acIBJmAdePb6aPJ7fhb5Oj9gd8yomi536AApiengbo5Wq29xs~QWYXjrbFqtM5-Rq5hafuh7FAYB2jTVv9aN2BHYjS1fA3jOh5MtP76ZKUPv0fUNNwG29hGVMuXxaXBfCdkILSlCS~zD5svOsIFjBvEpcsmaSsI2PbwiGfk3RRrq0nkF8VJMhnwBC6P8u9PhxCvRF7IbtaB-nALchVaCrIe93qkLKI0hlfVqENKeDXAjFdHkO~L3w__",
      Country: "Sri Lanka",
      CountryCode: "LK",
      bookedDate: "2025-02-12",
      Languages: ["English", "Arabic"],
      Experience: 5,
      bookedTime: "18:00",
      bookedDuration: 120,
      bookedPrice: "$14.00",
    },
    {
      id: 2,
      name: "Raqi2",
      image: "https://s3-alpha-sig.figma.com/img/5525/c092/e5de185ff00132edbf92293fcf654f47?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IzwyQg~Ec3mAeOznb0yL83OI0Bi5~bLxiyfKm8EUkgl4oijkqRVb0rLS9KG6yS4jgsoGrtaIQTFFPHHKVKbwnpk17Aw3fFjeBq3~ntboI800TEyyAxB2EgnckXplzzDfZ6XHrLbEEIVpvlR5o2Itl4~tc~zmkjz78eQzKw-5OUBtyE6e2fFIQdjNGOE748VBwJ1vWxd4aG7lOTMX1SuzjxC6o0R2c9aLu1hcblbrc-xjlqXqTiTEWEuYA61PhquGIHz4gZ7vWhkyF0xeDvXO~0PJ~rFAw-I2pIbsS6QS9MEuQ~kHGPoUkyJ0~unG4GXiijWWVZMsYLtrjjpat8v9dg__",
      bookedDate: "2025-01-13",
      bookedTime: "00:54",
      bookedDuration: 60,
      bookedPrice: "$14.00",
    },
    {
      id: 3,
      name: "Raqi3",
      Country: "United Kingdom",
      CountryCode: "GB",
      Languages: ["English", "Arabic","Tamil"],
      Experience: 1,
      bookedDate: "2022-01-03",
      bookedTime: "14:00",
      bookedDuration: 30,
      bookedPrice: "$14.00",
    },
    {
      id: 4,
      name: "Raqi4",
      Country: "Country4",
      CountryCode: "C4",
      Languages: ["English", "Arabic"],
      Experience: 4,
      bookedDate: "2022-01-04",
      bookedTime: "15:00",
      bookedDuration: 360,
      bookedPrice: "$14.00",
    },
  ];

// Availability data
const availabilitySlots = [
  { label: "Today (06th Monday)", count: 12 },
  { label: "Tomorrow (07th Tuesday)", count: 16 },
  { label: "This Week (06-12)", count: 12 },
  { label: "Next Week (13-19)", count: 10 },
  { label: "This Month", count: 22 },
  { label: "Next Month", count: 4 }
]

// Extract unique languages and countries from sample data
const extractLanguages = (data) => Array.from(new Set(data.flatMap(practitioner => (practitioner.Languages || []).filter(Boolean))))
  .map(language => ({
    label: language,
    count: data.filter(practitioner => (practitioner.Languages || []).includes(language)).length
  }));

const extractCountries = (data) => Array.from(new Set(data.map(practitioner => practitioner.Country).filter(Boolean)))
  .map(country => ({
    label: country,
    count: data.filter(practitioner => practitioner.Country === country).length
  }));

const languages = extractLanguages(sampledata);
const countries = extractCountries(sampledata);

// Calculate max experience for slider
const maxExperience = Math.max(...sampledata.map(practitioner => parseInt(practitioner.Experience)));

// Sidebar Filter Section Component
function FilterSection({ title, items, selectedItems, onChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <label key={item.label} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={item.label}
                checked={selectedItems.includes(item.label)}
                onChange={() => onChange(item.label)}
              />
              <span>{item.label}</span>
            </div>
            <span className="text-sm text-muted-foreground">{item.count}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

// Main Page Component
export default function BookRaqis() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [filteredData, setFilteredData] = useState(sampledata);

  const handleLanguageChange = (language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]
    );
  };

  const handleCountryChange = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
    );
  };

  const handleButtonClick = () => {
    // Update the filtered data based on the selected filters
    const updatedData = sampledata.filter(practitioner => 
      (selectedLanguages.length === 0 || selectedLanguages.some(lang => practitioner.Languages.includes(lang))) &&
      (selectedCountries.length === 0 || selectedCountries.includes(practitioner.Country))
    );
    setFilteredData(updatedData);
  }

  return (
    <div className="container mx-auto px-4 py-8 mb-56">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li>/</li>
              <li>Practitioners</li>
            </ol>
          </nav>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Experience Level</h2>
            <Slider
              defaultValue={[1]}
              max={maxExperience}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>01 Year</span>
              <span>{maxExperience} Years</span>
            </div>
          </div>

          <FilterSection
            title="Language"
            items={languages}
            selectedItems={selectedLanguages}
            onChange={handleLanguageChange}
          />
          <FilterSection
            title="Availability"
            items={availabilitySlots}
            selectedItems={[]}
            onChange={() => {}}
          />
          <FilterSection
            title="Country"
            items={countries}
            selectedItems={selectedCountries}
            onChange={handleCountryChange}
          />
          <Button onClick={handleButtonClick}>Update Filters</Button>
        </aside>

        {/* Practitioners Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((practitioner) => (
              <RaqisCard key={practitioner.id} raqi={practitioner} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

