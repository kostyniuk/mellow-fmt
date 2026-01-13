import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export interface TabOption {
    value: string
    label: string
    isDefault: boolean
}

interface OptionTabsProps {
    value: string
    onValueChange: (value: string) => void
    options: TabOption[]
    resultFromPreset?: boolean
    children: React.ReactNode
}

export function OptionTabs({
    value,
    onValueChange,
    options,
    resultFromPreset,
    children,
}: OptionTabsProps) {
    return (
        <Tabs value={value} onValueChange={onValueChange} className="w-full">
            <TabsList className="w-full flex-wrap h-auto gap-1 bg-muted/50">
                {options.map((opt) => {
                    const isSelected = value === opt.value
                    const isHighlighted = resultFromPreset && isSelected && !opt.isDefault

                    return (
                        <TabsTrigger
                            key={opt.value}
                            value={opt.value}
                            className={`text-xs transition-all ${isHighlighted
                                ? '!bg-amber-500 !text-white shadow-sm dark:!bg-amber-600'
                                : ''
                                }`}
                        >
                            {opt.label + (opt.isDefault ? ' ⚙️' : '')}
                        </TabsTrigger>
                    )
                })}
            </TabsList>
            {children}
        </Tabs>
    )
}
