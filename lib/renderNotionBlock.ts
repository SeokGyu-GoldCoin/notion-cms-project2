import { RichTextItem } from '@/types/notion'

// 리치 텍스트 배열을 HTML 문자열로 변환
export function richTextToHtml(richTexts: RichTextItem[]): string {
  return richTexts
    .map((item) => {
      let text = escapeHtml(item.plain_text)

      // 어노테이션 적용
      if (item.annotations.bold) text = `<strong>${text}</strong>`
      if (item.annotations.italic) text = `<em>${text}</em>`
      if (item.annotations.strikethrough) text = `<del>${text}</del>`
      if (item.annotations.underline) text = `<u>${text}</u>`
      if (item.annotations.code) text = `<code>${text}</code>`

      // 링크 처리
      if (item.href) {
        text = `<a href="${item.href}" target="_blank" rel="noreferrer">${text}</a>`
      }

      return text
    })
    .join('')
}

// XSS 방지를 위한 HTML 이스케이프
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Notion 블록 타입별 렌더링 정보 반환
export function getBlockRenderConfig(block: Record<string, unknown>): {
  tag: string
  className: string
  content: string
} | null {
  const type = block.type as string
  const blockData = block[type] as Record<string, unknown>

  switch (type) {
    case 'paragraph': {
      const texts = blockData?.rich_text as RichTextItem[] ?? []
      return {
        tag: 'p',
        className: 'my-4 leading-7',
        content: richTextToHtml(texts),
      }
    }

    case 'heading_1': {
      const texts = blockData?.rich_text as RichTextItem[] ?? []
      return {
        tag: 'h1',
        className: 'mt-8 mb-4 text-3xl font-bold tracking-tight',
        content: richTextToHtml(texts),
      }
    }

    case 'heading_2': {
      const texts = blockData?.rich_text as RichTextItem[] ?? []
      return {
        tag: 'h2',
        className: 'mt-8 mb-4 text-2xl font-semibold tracking-tight',
        content: richTextToHtml(texts),
      }
    }

    case 'heading_3': {
      const texts = blockData?.rich_text as RichTextItem[] ?? []
      return {
        tag: 'h3',
        className: 'mt-6 mb-3 text-xl font-semibold',
        content: richTextToHtml(texts),
      }
    }

    case 'bulleted_list_item': {
      const texts = blockData?.rich_text as RichTextItem[] ?? []
      return {
        tag: 'li',
        className: 'ml-6 list-disc my-1',
        content: richTextToHtml(texts),
      }
    }

    case 'numbered_list_item': {
      const texts = blockData?.rich_text as RichTextItem[] ?? []
      return {
        tag: 'li',
        className: 'ml-6 list-decimal my-1',
        content: richTextToHtml(texts),
      }
    }

    case 'code': {
      const texts = blockData?.rich_text as RichTextItem[] ?? []
      const language = (blockData?.language as string) ?? 'plaintext'
      const code = texts.map((t) => t.plain_text).join('')
      return {
        tag: 'pre',
        className: `my-6 overflow-x-auto rounded-lg bg-muted p-4`,
        content: `<code class="language-${language} text-sm font-mono">${escapeHtml(code)}</code>`,
      }
    }

    case 'quote': {
      const texts = blockData?.rich_text as RichTextItem[] ?? []
      return {
        tag: 'blockquote',
        className: 'my-4 border-l-4 border-primary pl-4 italic text-muted-foreground',
        content: richTextToHtml(texts),
      }
    }

    case 'divider': {
      return {
        tag: 'hr',
        className: 'my-8 border-border',
        content: '',
      }
    }

    case 'image': {
      const fileData = blockData?.file as { url: string } | undefined
      const externalData = blockData?.external as { url: string } | undefined
      const url = fileData?.url ?? externalData?.url ?? ''
      const caption = (blockData?.caption as RichTextItem[])
        ?.map((t) => t.plain_text)
        .join('') ?? ''

      return {
        tag: 'figure',
        className: 'my-6',
        content: `<img src="${url}" alt="${caption}" class="w-full rounded-lg" />
          ${caption ? `<figcaption class="mt-2 text-center text-sm text-muted-foreground">${escapeHtml(caption)}</figcaption>` : ''}`,
      }
    }

    default:
      return null
  }
}
