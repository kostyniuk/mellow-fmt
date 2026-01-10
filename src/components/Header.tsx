import { Link } from '@tanstack/react-router'
import { Code2 } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { GenerateConfigDropdown } from './GenerateConfigDropdown'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Code2 className="h-6 w-6 text-primary" />
          <span>Prettier Options</span>
        </Link>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <a
            href="https://prettier.io/docs/options"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
          >
            Prettier Docs
          </a>
          <a
            href="https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
          >
            Oxfmt Docs
          </a>
          <GenerateConfigDropdown />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
