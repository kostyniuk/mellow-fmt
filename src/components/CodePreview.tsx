import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodePreviewProps {
  code: string
  language?: string
  className?: string
}

export function CodePreview({
  code,
  language = 'tsx',
  className,
}: CodePreviewProps) {
  const [html, setHtml] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    codeToHtml(code, {
      lang: language,
      theme: 'github-dark',
    }).then(setHtml)
  }, [code, language])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('relative group rounded-lg overflow-hidden', className)}>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      <div
        className="[&>pre]:p-4 [&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:text-sm [&>pre]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
