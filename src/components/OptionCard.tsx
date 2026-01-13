import React from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { OptionTabs } from './OptionTabs'
import { OptionCardLayout } from './OptionCardLayout'
import { CodePreview } from './CodePreview'
import { useSelectedValues } from './SelectedValuesContext'
import { presets } from '@/data/presets'
import { SubOptionCard } from './SubOptionCard'
import type { PrettierOption } from '@/data/prettierOptions'

interface OptionCardProps {
  option: PrettierOption
  selectedValue: string | boolean | number | Record<string, any>
  onValueChange: (value: string | boolean | number | Record<string, any>) => void
}

export function OptionCard({ option, selectedValue, onValueChange }: OptionCardProps): React.ReactNode {
  const { selectedPreset } = useSelectedValues()

  // Check if this option has subOptions (special handling for experimentalSortImports etc.)
  if (option.subOptions && option.subOptions.length > 0) {
    return (
      <SubOptionCard
        option={option}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      />
    )
  }

  const isFromPreset = (() => {
    if (selectedPreset === 'default') {
      return false
    }

    const preset = presets.find(p => p.id === selectedPreset)
    if (!preset) {
      return false
    }

    const presetValue = preset.values[option.key]
    return presetValue !== undefined && presetValue !== option.defaultValue
  })()

  // Regular options (no subOptions)
  const currentTabValue = String(selectedValue)

  return (
    <OptionCardLayout option={option}>

      <OptionTabs
        value={currentTabValue}
        onValueChange={(value) => {
          // Find the original option value that matches the selected tab string
          // This avoids manual type conversion since we have the original values available
          const selectedOpt = option.options.find(o => String(o.value) === value)
          if (selectedOpt) {
            onValueChange(selectedOpt.value)
          }
        }}
        options={option.options.map(opt => ({
          value: String(opt.value),
          label: opt.label,
          isDefault: opt.value === option.defaultValue
        }))}
        resultFromPreset={isFromPreset}
      >

        {option.options.map((opt) => (
          <TabsContent key={String(opt.value)} value={String(opt.value)}>
            {opt.description && (
              <p className="text-sm text-muted-foreground mb-3">
                {opt.description}
              </p>
            )}
            <CodePreview
              code={opt.codeExample}
              language={option.language ?? 'typescript'}
            />
          </TabsContent>
        ))}
      </OptionTabs>
    </OptionCardLayout>
  )
}
