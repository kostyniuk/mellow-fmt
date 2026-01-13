import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import type { PrettierOption } from '@/data/prettierOptions'

interface OptionCardLayoutProps {
    option: PrettierOption
    children: React.ReactNode
}

export function OptionCardLayout({ option, children }: OptionCardLayoutProps) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                        <CardTitle className="text-xl text-foreground">{option.name}</CardTitle>
                        <code className="inline-block text-sm font-mono text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded">
                            {option.key}
                        </code>
                    </div>
                </div>
                <CardDescription className="text-sm leading-relaxed mt-2">
                    {option.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <code className="rounded bg-muted px-2 py-1">
                        CLI: {option.cliOverride}
                    </code>
                    <code className="rounded bg-muted px-2 py-1">
                        API: {option.apiOverride}
                    </code>
                </div>
                {children}
            </CardContent>
        </Card>
    )
}
