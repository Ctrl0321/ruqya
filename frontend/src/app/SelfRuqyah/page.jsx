import Link from "next/link"
import Button from "@/components/ui/buttons/DefaultButton"
import { FileIcon, Music2Icon } from 'lucide-react'
import content from '@/data/ruqyah'

export default function RuqyahPage() {
  return (
    <div className="container mx-auto px-4 py-8 mb-56">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li>/</li>
          <li>Self-Ruqyah</li>
        </ol>
      </nav>
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Sidebar Navigation */}
        <nav className="w-full md:w-64 md:h-96 bg-RuqyaLightPurple font-sans rounded-lg p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Content</h2>
          <ul className="space-y-2">
            {content.sections.map(section => (
              <li key={section.id} className="border-t border-gray-300 pt-4">
                <Link href={`#${section.id}`} className="text-gray-700 hover:text-gray-900">
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Main Content */}
        <article className="flex-1 space-y-8">
          {content.sections.map(section => (
            <section key={section.id} id={section.id}>
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              {section.content.split('<br/>').map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
              ))}
            </section>
          ))}

          <section id="resources" className="space-y-4">
            <h2 className="text-2xl font-semibold">Downloadable Resources:</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileIcon className="h-8 w-8 text-red-500" />
                  <span>PDF Name Goes Here.pdf</span>
                </div>
                <Button variant="default" className="bg-teal-600 hover:bg-teal-700">
                  Download
                </Button>
              </div>
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music2Icon className="h-8 w-8 text-teal-500" />
                  <span>MP3 name goes here</span>
                </div>
                <Button variant="default" className="bg-teal-600 hover:bg-teal-700">
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

