import Link from 'next/link'
import { BookOpen, Tag, Rss } from 'lucide-react'

import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { siteConfig, blogCategories } from '@/lib/config'

// TODO: Notion API 연동 후 실제 데이터 페칭으로 교체
// import { getPublishedPosts } from '@/lib/notion'

export default async function Home() {
  // TODO: Notion API 연동
  // const recentPosts = await getPublishedPosts(5)

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-b from-background to-muted/50 py-20 md:py-32">
        <div className="container space-y-6 text-center">
          <div className="flex justify-center">
            <Badge className="mx-auto">Notion CMS 블로그</Badge>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href="/blog">블로그 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* 최근 글 섹션 */}
      <section className="py-16 md:py-24">
        <div className="container space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <Rss className="h-5 w-5" />
                최근 글
              </h2>
              <p className="text-muted-foreground">최신 기술 콘텐츠를 확인하세요.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog">전체 보기 →</Link>
            </Button>
          </div>

          {/* TODO: Notion API 연동 후 BlogCard 컴포넌트 및 실제 데이터로 교체 */}
          <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
            <BookOpen className="mx-auto mb-3 h-10 w-10 opacity-40" />
            <p>Notion API 연동 후 최근 글 목록이 표시됩니다.</p>
            <p className="mt-2 text-sm">
              <code className="rounded bg-muted px-2 py-1">.env.local</code>에
              {' '}NOTION_API_KEY와 NOTION_DATABASE_ID를 설정하세요.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* 카테고리 섹션 */}
      <section className="py-16 md:py-24">
        <div className="container space-y-8">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Tag className="h-5 w-5" />
              카테고리
            </h2>
            <p className="text-muted-foreground">관심 있는 주제의 글을 찾아보세요.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blogCategories.map((category) => (
              <Card
                key={category}
                className="border border-border/40 transition-colors hover:border-border"
              >
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link
                      href={`/blog/category/${encodeURIComponent(category)}`}
                      className="hover:text-primary"
                    >
                      {category}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/category/${encodeURIComponent(category)}`}>
                      글 보기 →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
