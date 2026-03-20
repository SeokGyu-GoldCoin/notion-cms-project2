// Notion 데이터베이스 글 메타데이터 타입
export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  publishedAt: string
  coverImage: string | null
  status: 'Draft' | 'Published' | 'Archived'
}

// Notion 블록 타입
export type NotionBlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'code'
  | 'image'
  | 'quote'
  | 'divider'
  | 'toggle'

// Notion 리치 텍스트 요소
export interface RichTextItem {
  type: 'text'
  text: {
    content: string
    link: { url: string } | null
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: string | null
}

// Notion 블록 공통 구조
export interface NotionBlock {
  id: string
  type: NotionBlockType
  has_children: boolean
  [key: string]: unknown
}

// Notion API 응답: 글 목록
export interface NotionQueryResponse {
  results: NotionPageObject[]
  has_more: boolean
  next_cursor: string | null
}

// Notion 페이지 객체 (데이터베이스 row)
export interface NotionPageObject {
  id: string
  created_time: string
  last_edited_time: string
  properties: NotionPageProperties
}

// Notion 데이터베이스 속성 타입
export interface NotionPageProperties {
  Title: {
    title: RichTextItem[]
  }
  Category: {
    select: { name: string } | null
  }
  Tags: {
    multi_select: { name: string }[]
  }
  Published: {
    date: { start: string } | null
  }
  Status: {
    select: { name: string } | null
  }
  Excerpt: {
    rich_text: RichTextItem[]
  }
  Cover: {
    files: { file?: { url: string }; external?: { url: string } }[]
  }
}
