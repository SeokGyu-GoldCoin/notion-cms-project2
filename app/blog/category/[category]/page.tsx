import { notFound } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { blogCategories } from '@/lib/config'

// TODO: Notion API 연동 후 활성화
// import { getPostsByCategory, getAllCategories } from '@/lib/notion'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

// 정적 경로 생성: 설정 파일의 카테고리 목록 기준
export async function generateStaticParams() {
  // TODO: Notion API 연동 후 getAllCategories()로 교체
  return blogCategories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  // TODO: Notion API 연동 후 실제 데이터 페칭으로 교체
  // const posts = await getPostsByCategory(decodedCategory)

  // 유효하지 않은 카테고리 처리
  if (!blogCategories.includes(decodedCategory)) {
    notFound()
  }

  return (
    <PageLayout>
      <div className="container py-10">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">{decodedCategory}</h1>
          <p className="text-muted-foreground">
            {decodedCategory} 카테고리의 글 목록입니다.
          </p>
        </div>

        {/* TODO: BlogCard 컴포넌트 및 실제 데이터로 교체 */}
        <div className="mt-10 text-center text-muted-foreground">
          <p>Notion API 연동 후 글 목록이 표시됩니다.</p>
        </div>
      </div>
    </PageLayout>
  )
}
