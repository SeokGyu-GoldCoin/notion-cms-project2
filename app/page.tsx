import Link from 'next/link'
import {
  Zap,
  Shield,
  Palette,
  Layers,
  Moon,
  Rocket,
} from 'lucide-react'

import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { techStack } from '@/lib/config'

const features = [
  {
    title: 'Next.js 16 App Router',
    description: '최신 Next.js App Router로 강력한 애플리케이션 구축',
    icon: Zap,
  },
  {
    title: 'TypeScript 엄격 모드',
    description: '타입 안정성으로 더 나은 개발 경험 제공',
    icon: Shield,
  },
  {
    title: 'Tailwind CSS v4',
    description: 'CSS-first 접근으로 빠르고 아름다운 UI 구축',
    icon: Palette,
  },
  {
    title: 'shadcn/ui 컴포넌트',
    description: '검증된 Radix UI 기반 재사용 가능한 컴포넌트',
    icon: Layers,
  },
  {
    title: '다크 모드 지원',
    description: 'next-themes로 쉬운 테마 전환 구현',
    icon: Moon,
  },
  {
    title: '빠른 시작',
    description: '즉시 사용 가능한 보일러플레이트와 레이아웃',
    icon: Rocket,
  },
]

export default function Home() {
  return (
    <PageLayout>
      {/* 섹션 1: Hero */}
      <section className="relative space-y-8 bg-gradient-to-b from-background to-muted/50 py-20 md:py-32">
        <div className="container space-y-6">
          {/* 뱃지 */}
          <div className="flex justify-center">
            <Badge className="mx-auto">스타터킷 v1.0</Badge>
          </div>

          {/* 타이틀 */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              완성도 높은
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Next.js 보일러플레이트
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              즉시 사용할 수 있는 컴포넌트, 레이아웃, 그리고 최신 개발 도구들을 포함한 스타터킷입니다.
            </p>
          </div>

          {/* CTA 버튼 */}
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">대시보드 →</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/sign-in">로그인</Link>
            </Button>
          </div>

          {/* 기술 스택 */}
          <div className="flex flex-wrap justify-center gap-2 pt-8">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* 섹션 2: Features */}
      <section className="space-y-12 py-20 md:py-32">
        <div className="container space-y-8">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              모든 웹앱에 필요한 것
            </h2>
            <p className="text-lg text-muted-foreground">
              레이아웃, 폼, 피드백, 테마 등 검증된 라이브러리로 구현되었습니다.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border border-border/40">
                  <CardHeader>
                    <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Separator />

      {/* 섹션 3: CTA */}
      <section className="space-y-8 py-20 md:py-32">
        <div className="container">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl sm:text-4xl">
                지금 시작하세요
              </CardTitle>
              <CardDescription className="text-lg">
                즉시 사용 가능한 스타터킷으로 새로운 프로젝트를 시작하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">대시보드 시작 →</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
