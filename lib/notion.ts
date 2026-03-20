import { Client } from '@notionhq/client'
import { BlogPost, NotionPageObject, NotionPageProperties } from '@/types/notion'

// Notion 클라이언트 초기화 (서버 사이드 전용)
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID as string

// Notion 페이지 객체를 BlogPost 형식으로 변환
function parsePageToBlogPost(page: NotionPageObject): BlogPost {
  const props = page.properties as NotionPageProperties

  // 제목 추출
  const title = props.Title?.title?.[0]?.plain_text ?? '제목 없음'

  // slug: 제목을 URL 친화적으로 변환 (공백 → 하이픈, 소문자)
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  // 요약 추출
  const excerpt = props.Excerpt?.rich_text?.[0]?.plain_text ?? ''

  // 카테고리 추출
  const category = props.Category?.select?.name ?? '미분류'

  // 태그 추출
  const tags = props.Tags?.multi_select?.map((tag) => tag.name) ?? []

  // 발행일 추출
  const publishedAt = props.Published?.date?.start ?? page.created_time

  // 커버 이미지 추출 (외부 URL 또는 Notion 파일)
  const coverFile = props.Cover?.files?.[0]
  const coverImage = coverFile?.file?.url ?? coverFile?.external?.url ?? null

  // 상태 추출
  const status = (props.Status?.select?.name ?? 'Draft') as BlogPost['status']

  return {
    id: page.id,
    slug,
    title,
    excerpt,
    category,
    tags,
    publishedAt,
    coverImage,
    status,
  }
}

// 발행된 글 목록 조회
export async function getPublishedPosts(pageSize = 20): Promise<BlogPost[]> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: 'Status',
      select: {
        equals: 'Published',
      },
    },
    sorts: [
      {
        property: 'Published',
        direction: 'descending',
      },
    ],
    page_size: pageSize,
  })

  return (response.results as unknown as NotionPageObject[]).map(parsePageToBlogPost)
}

// 카테고리별 글 목록 조회
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Status',
          select: { equals: 'Published' },
        },
        {
          property: 'Category',
          select: { equals: category },
        },
      ],
    },
    sorts: [
      {
        property: 'Published',
        direction: 'descending',
      },
    ],
  })

  return (response.results as unknown as NotionPageObject[]).map(parsePageToBlogPost)
}

// slug로 단일 글 조회
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // 모든 발행된 글을 조회한 후 slug로 필터링
  // (Notion API는 slug 필드가 없으므로 제목 기반으로 생성된 slug를 비교)
  const posts = await getPublishedPosts(100)
  return posts.find((post) => post.slug === slug) ?? null
}

// 글 상세 내용(블록) 조회
export async function getPageBlocks(pageId: string) {
  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  })

  return response.results
}

// 모든 카테고리 목록 조회 (정적 생성용)
export async function getAllCategories(): Promise<string[]> {
  const posts = await getPublishedPosts(100)
  const categories = [...new Set(posts.map((post) => post.category))]
  return categories.filter(Boolean)
}

// 관련 글 조회 (같은 카테고리, 현재 글 제외)
export async function getRelatedPosts(
  currentPostId: string,
  category: string,
  limit = 3
): Promise<BlogPost[]> {
  const posts = await getPostsByCategory(category)
  return posts
    .filter((post) => post.id !== currentPostId)
    .slice(0, limit)
}
