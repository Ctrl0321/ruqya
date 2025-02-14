'use client'
import { useState } from 'react'
import Link from "next/link"
import Button from "@/components/ui/buttons/DefaultButton"
import { FileIcon, Music2Icon, ChevronDownIcon } from 'lucide-react'
import content from '@/data/ruqyah'

export default function RuqyahPage() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="mx-5 md:mx-[8%] px-4 py-8 mb-72">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-primary underline">Home</Link></li>
          <li>/</li>
          <li>Self-Ruqyah</li>
        </ol>
      </nav>
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="w-full flex items-center justify-between p-4 bg-RuqyaLightPurple rounded-lg  md:hidden"
          >
            <span className="font-semibold">Content</span>
            <ChevronDownIcon className={`w-5 h-5 transition-transform ${isNavOpen ? 'rotate-180' : ''}`} />
          </button>
          <nav className={`
            overflow-hidden bg-RuqyaLightPurple  rounded-lg
            ${isNavOpen ? 'max-h-96' : 'max-h-0 md:max-h-96'}
            transition-all duration-300 ease-in-out
            md:h-96 md:block
          `}>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4 hidden md:block">Content</h2>
              <ul className="space-y-2">
                {content.sections.map(section => (
                  <li key={section.id} className="border-t border-gray-300 pt-4">
                    <Link 
                      href={`#${section.id}`} 
                      className="text-gray-700 hover:text-gray-900"
                      onClick={() => setIsNavOpen(false)}
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        {/* Main Content */}
        <article className="flex-1 space-y-8 lg:ml-8">
          {content.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              {section.content.split('<br/>').map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
              ))}
            </section>
          ))}

          <section id="resources" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileIcon className="h-8 w-8 text-red-500" />
                  <span>PDF Name Goes Here.pdf</span>
                </div>
                <Button variant="default" bg={true} text="Download" className="bg-teal-600 hover:bg-teal-700 rounded-lg">
                  
                </Button>
              </div>
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music2Icon className="h-8 w-8 text-teal-500" />
                  <span>MP3 name goes here</span>
                </div>
                <Button variant="default" bg={true} text="Download" className="bg-teal-600 hover:bg-teal-700 rounded-lg">
                  Download
                </Button>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  )
}

