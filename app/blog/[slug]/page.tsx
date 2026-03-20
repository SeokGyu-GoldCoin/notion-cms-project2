import { notFound } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'

// TODO: Notion API 연동 후 활성화
// import { getPostBySlug, getPageBlocks, getRelatedPosts } from '@/lib/notion'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// TODO: Notion API 연동 후 정적 경로 생성 활성화
// export async function generateStaticParams() {
//   const posts = await getPublishedPosts()
//   return posts.map((post) => ({ slug: post.slug }))
// }

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  // TODO: Notion API 연동 후 실제 데이터 페칭으로 교체
  // const post = await getPostBySlug(slug)
  // if (!post) notFound()
  // const blocks = await getPageBlocks(post.id)

  if (!slug) notFound()

  return (
    <PageLayout>
      <div className="container py-10">
        <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
          {/* TODO: 실제 글 내용으로 교체 */}
          <p className="text-muted-foreground">
            Notion API 연동 후 글 내용이 표시됩니다. (slug: {slug})
          </p>
        </article>
      </div>
    </PageLayout>
  )
}
