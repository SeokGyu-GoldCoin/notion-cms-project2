import Link from 'next/link'

import { siteConfig, navItems, techStack } from '@/lib/config'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function Footer() {

  return (
    <footer className="w-full bg-muted/50">
      <div className="container space-y-8 py-8">
        {/* 메인 푸터 콘텐츠 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* 로고 및 설명 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-primary to-primary/70" />
              <span className="font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.slice(0, 5).map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* 빠른 링크 */}
          <div className="space-y-4">
            <h3 className="font-semibold">빠른 링크</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 소셜 링크 */}
          <div className="space-y-4">
            <h3 className="font-semibold">리소스</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  GitHub
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Next.js 문서
                </a>
              </li>
              <li>
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  shadcn/ui
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator />

        {/* 저작권 및 기술스택 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © 2025 {siteConfig.name}. 모든 권리 보유.
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.slice(2, 5).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
