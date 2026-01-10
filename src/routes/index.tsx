import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { OptionCard } from '@/components/OptionCard'
import { OptionsCombobox } from '@/components/OptionsCombobox'
import { Separator } from '@/components/ui/separator'
import { prettierOptions } from '@/data/prettierOptions'
import { oxfmtOptions } from '@/data/oxfmtOptions'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [selectedOption, setSelectedOption] = useState('')

  const filteredPrettierOptions = selectedOption
    ? prettierOptions.filter((option) => option.key === selectedOption)
    : prettierOptions

  const filteredOxfmtOptions = selectedOption
    ? oxfmtOptions.filter((option) => option.key === selectedOption)
    : oxfmtOptions

  const showPrettierSection = !selectedOption || filteredPrettierOptions.length > 0
  const showOxfmtSection = !selectedOption || filteredOxfmtOptions.length > 0

  return (
    <div className="min-h-screen bg-background">
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="text-primary">Prettier</span> Options Preview
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore all Prettier formatting options with live code previews.
              See how each option affects your code formatting.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-10">
            <OptionsCombobox
              options={[...prettierOptions, ...oxfmtOptions]}
              value={selectedOption}
              onValueChange={setSelectedOption}
            />
          </div>

          {showPrettierSection && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPrettierOptions.map((option) => (
                <OptionCard key={option.key} option={option} />
              ))}
            </div>
          )}

          {showOxfmtSection && filteredOxfmtOptions.length > 0 && (
            <>
              {/* Separator */}
              <Separator className="my-16" />

              {/* Oxfmt Section Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  <span className="text-[#F9D949]">Oxfmt</span>-Specific Options
                </h2>
                <p className="text-md text-muted-foreground max-w-2xl mx-auto">
                  These options are exclusive to{' '}
                  <a
                    href="https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F9D949] hover:underline"
                  >
                    Oxfmt
                  </a>
                  , the Rust-based JavaScript formatter from the Oxc project.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredOxfmtOptions.map((option) => (
                  <OptionCard key={option.key} option={option} />
                ))}
              </div>
            </>
          )}

          {filteredPrettierOptions.length === 0 && filteredOxfmtOptions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No options found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
