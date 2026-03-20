import { PageLayout } from '@/components/layout/PageLayout'

// TODO: Notion API 연동 후 실제 데이터로 교체
// import { getPublishedPosts } from '@/lib/notion'

export const metadata = {
  title: '블로그 | 개발 블로그',
  description: 'React, Next.js, TypeScript 등 개발 기술 콘텐츠를 공유합니다.',
}

export default async function BlogPage() {
  // TODO: Notion API 연동
  // const posts = await getPublishedPosts()

  return (
    <PageLayout>
      <div className="container py-10">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">블로그</h1>
          <p className="text-muted-foreground">
            React, Next.js, TypeScript 등 개발 기술 콘텐츠를 공유합니다.
          </p>
        </div>

        {/* TODO: BlogCard 컴포넌트 및 실제 데이터로 교체 */}
        <div className="mt-10 text-center text-muted-foreground">
          <p>Notion API 연동 후 글 목록이 표시됩니다.</p>
          <p className="mt-2 text-sm">
            <code className="rounded bg-muted px-2 py-1">lib/notion.ts</code>에서 API 설정을 완료하세요.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
