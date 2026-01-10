import { FileJson, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { prettierOptions } from '@/data/prettierOptions'
import { oxfmtOptions } from '@/data/oxfmtOptions'

function generatePrettierConfig() {
  const config: Record<string, string | boolean | number> = {}

  for (const option of prettierOptions) {
    config[option.key] = option.defaultValue
  }

  return config
}

function generateOxfmtConfig() {
  const config: Record<string, string | boolean | number> = {}

  // Include all prettier options
  for (const option of prettierOptions) {
    config[option.key] = option.defaultValue
  }

  // Include oxfmt-specific options
  for (const option of oxfmtOptions) {
    config[option.key] = option.defaultValue
  }

  return config
}

function downloadJson(config: Record<string, unknown>, filename: string) {
  const jsonString = JSON.stringify(config, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function GenerateConfigDropdown() {
  const handleGeneratePrettier = () => {
    const config = generatePrettierConfig()
    downloadJson(config, '.prettierrc')
  }

  const handleGenerateOxfmt = () => {
    const config = generateOxfmtConfig()
    downloadJson(config, '.oxfmt.json')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <FileJson className="h-4 w-4" />
          <span className="hidden sm:inline">Generate Config</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleGeneratePrettier} className="cursor-pointer">
          <span className="text-primary font-medium">Prettier</span>
          <span className="ml-2 text-muted-foreground text-xs">.prettierrc</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleGenerateOxfmt} className="cursor-pointer">
          <span className="text-[#F9D949] font-medium">Oxfmt</span>
          <span className="ml-2 text-muted-foreground text-xs">.oxfmt.json</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
