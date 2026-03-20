# 프로젝트 AI 개발 규칙

**⚠️ 이 문서는 AI 에이전트를 위한 프로젝트 개발 규칙입니다. 개발자 문서가 아닙니다.**

---

## 프로젝트 개요

- **프로젝트**: Notion CMS 기반 개인 개발 블로그
- **기술 스택**: Next.js 16.1.7, React 19, TypeScript 5 strict, Tailwind CSS v4, shadcn/ui 4.0.8
- **핵심 기능**: Notion 데이터베이스에서 블로그 글 자동 렌더링, 카테고리별 필터링, 다크모드
- **언어**: 코드 주석/커밋/문서는 한국어, 코드 네이밍은 영어

---

## 디렉토리 구조 및 규칙

### `app/` - Next.js App Router 페이지
```
app/
├── layout.tsx                          # 루트 레이아웃 (전체 앱을 Providers로 래핑)
├── page.tsx                            # 홈 페이지 (히어로 + 최근 글)
├── globals.css                         # 글로벌 스타일
└── blog/
    ├── page.tsx                        # 블로그 글 목록
    ├── [slug]/page.tsx                 # 글 상세 페이지 (Notion 콘텐츠 렌더링)
    └── category/[category]/page.tsx   # 카테고리별 글 필터링
```

**규칙:**
- **새 페이지 추가 시**: `app/` 디렉토리에 `page.tsx` 생성 AND `lib/config.ts`의 `navItems` 배열에 네비게이션 항목 추가
- **모든 페이지는** `<PageLayout>` 래퍼로 감싸기 (Header + Footer 자동 포함)
- **Server Component 기본**: 필요한 경우만 `'use client'` 지시어 추가

### `components/` - 컴포넌트 조직화
```
components/
├── ui/                                 # shadcn/ui 프리미티브 (수정 금지 ❌)
│   ├── button.tsx, card.tsx, etc.
├── layout/                             # 재사용 가능한 레이아웃
│   ├── Header.tsx                      # 네비게이션 헤더 (use client)
│   ├── Footer.tsx                      # 푸터
│   └── PageLayout.tsx                  # 표준 페이지 래퍼 (Header + Footer)
├── ThemeToggle.tsx                     # 다크/라이트 모드 토글 (use client)
└── providers.tsx                       # 루트 제공자 (next-themes, use client)
```

**규칙:**
- **`components/ui/` 수정 금지** ❌ → shadcn CLI로 업데이트 (`npx shadcn@latest add <component>`)
- **새 컴포넌트**:
  - 재사용 가능한 일반 컴포넌트 → `components/` 루트에 PascalCase 파일
  - 기능별 컴포넌트 → `components/<feature>/` 서브디렉토리
- **클라이언트 컴포넌트** (`'use client'` 필요):
  - React 훅 사용 (`useState`, `useEffect`, `useContext` 등)
  - 이벤트 핸들러 사용 (`onClick`, `onChange` 등)
  - 브라우저 API 사용 (`localStorage`, `window` 등)
  - Next.js Navigation 훅 (`useRouter`, `usePathname` 등)

### `lib/` - 유틸리티 및 설정
```
lib/
├── config.ts                           # 사이트 설정 (⭐ 중요: 네비게이션/카테고리 관리)
├── utils.ts                            # Tailwind cn() 유틸
├── notion.ts                           # Notion API 래퍼
└── renderNotionBlock.ts                # Notion 블록 렌더링 로직
```

**규칙 - `lib/config.ts` (네비게이션/카테고리 중앙 관리):**
```typescript
// ✅ 구조
export const siteConfig: SiteConfig = { ... }
export const navItems: NavItem[] = [
  { label: '홈', href: '/' },
  { label: '블로그', href: '/blog' },
  // 새 페이지 추가 시 여기에 항목 추가
]
export const blogCategories = ['React', 'Next.js', ...] // Notion과 동기화
export const techStack = [...]  // 홈페이지, Footer에서 사용
```

**네비게이션 변경 영향 범위:**
- `Header.tsx`에서 `navItems` 자동 렌더링됨
- 새 네비게이션 추가 → `lib/config.ts` → `app/*/page.tsx` 생성
- 카테고리 변경 → Notion 데이터베이스 필터도 동시 업데이트 필요

### `types/` - TypeScript 타입 정의
```
types/
├── index.ts                            # 공통 타입 (NavItem, SiteConfig 등)
└── notion.ts                           # Notion 관련 타입 (BlogPost, NotionBlock 등)
```

**규칙:**
- **공통 타입** (여러 파일에서 사용) → `types/index.ts`
- **기능별 타입** (특정 컴포넌트만 사용) → 컴포넌트 파일 내 정의 가능

### `hooks/` - React 커스텀 훅
```
hooks/
└── useTheme.ts                         # next-themes 래퍼 훅
```

**규칙:**
- **새 훅 추가** → `hooks/useXxx.ts` (use 접두사 필수)
- **훅은 항상 Server Component에서 사용 가능하지만**, 브라우저 API 사용 시 `'use client'` 컴포넌트로 감싸기

---

## 코드 스타일 및 네이밍 규칙

### 들여쓰기 및 포매팅
- **들여쓰기**: 2칸 (프로젝트 설정)
- **세미콜론**: 항상 사용
- **따옴표**: 작은따옴표 또는 큰따옴표 (혼용 금지)

### 네이밍 컨벤션
```typescript
// ✅ 변수/함수: camelCase
const blogTitle = 'My Blog'
function getPostBySlug(slug: string) { }

// ✅ 컴포넌트/타입: PascalCase
export function BlogCard() { }
export type NavItem = { ... }

// ✅ 상수: UPPER_SNAKE_CASE
const MAX_ITEMS = 10
const API_TIMEOUT = 3000

// ✅ 파일명
// - 컴포넌트: PascalCase (Button.tsx, PageLayout.tsx)
// - 유틸/타입: camelCase (utils.ts, config.ts)
// - 페이지: 소문자 (page.tsx, layout.tsx)
```

### Import 순서
```typescript
// 1️⃣ React/Next.js 코어
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// 2️⃣ 외부 라이브러리
import { format } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod'

// 3️⃣ 프로젝트 코드 (@/ 별칭)
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'

// 4️⃣ 구분선이 필요하면 공백 추가
```

### 주석 스타일
```typescript
// ✅ 한국어 주석 (한 줄)
const title = 'Blog'  // 블로그 제목

// ✅ 여러 줄 주석
/*
 * 블로그 글 목록을 Notion에서 가져와
 * 날짜순으로 정렬하는 함수
 */
function getPublishedPosts() { }

// ❌ 영어 주석
// const title = 'Blog'  // Blog title (금지)
```

---

## 아키텍처 패턴

### @/* 경로 별칭 (필수)
```typescript
// ✅ 모든 프로젝트 코드는 @/* 별칭 사용
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/types/notion'

// ❌ 상대 경로 사용 금지
// import { Button } from '../../../components/ui/button'
```

**설정:** `tsconfig.json`의 `compilerOptions.paths`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Server Component vs Client Component
```typescript
// ✅ 기본: Server Component
export default async function Page() {
  const posts = await getPublishedPosts()  // 서버에서 데이터 페칭
  return <div>{posts.map(...)}</div>
}

// ✅ 필요할 때만: Client Component
'use client'
import { useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  return <button onClick={() => setTheme('dark')}>...</button>
}

// ❌ 불필요한 'use client' 사용 금지
// 'use client'
// export function Card({ title }) {  // 상태 없음, 이벤트 없음
//   return <div>{title}</div>
// }
```

### PageLayout 래퍼 (표준 패턴)
```typescript
// ✅ 모든 페이지는 PageLayout으로 감싸기
import { PageLayout } from '@/components/layout/PageLayout'

export default function MyPage() {
  return (
    <PageLayout>
      <div className="container py-10">
        <h1>내 페이지</h1>
      </div>
    </PageLayout>
  )
}

// ❌ PageLayout 없이 직접 Header/Footer 추가 금지
// export default function MyPage() {
//   return <>
//     <Header />
//     <main>...</main>
//     <Footer />
//   </>
// }
```

### Tailwind 클래스 병합 (cn 유틸)
```typescript
import { cn } from '@/lib/utils'

// ✅ cn()으로 조건부 클래스 안전하게 병합
export function Button({ isActive, ...props }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded',
        isActive && 'bg-primary text-white',
        'hover:opacity-80',
      )}
      {...props}
    />
  )
}

// ❌ 직접 문자열 연결 (Tailwind 충돌 발생 가능)
// className={`px-4 py-2 ${isActive ? 'bg-primary' : 'bg-gray'}`}
```

---

## 다중 파일 조정 규칙

### 새 페이지 추가 워크플로우
**3가지 파일 함께 수정:**
1. **`app/<page-name>/page.tsx`** 생성 (페이지 컴포넌트)
2. **`lib/config.ts`** - `navItems` 배열에 항목 추가
3. **네비게이션 필요 시** - Header 자동 렌더링됨 (추가 수정 불필요)

**예시:**
```typescript
// 1️⃣ app/about/page.tsx 생성
import { PageLayout } from '@/components/layout/PageLayout'

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="container py-10">
        <h1>소개</h1>
      </div>
    </PageLayout>
  )
}

// 2️⃣ lib/config.ts 수정
export const navItems: NavItem[] = [
  { label: '홈', href: '/' },
  { label: '블로그', href: '/blog' },
  { label: '소개', href: '/about' },  // 추가
]
```

### 카테고리 추가 워크플로우
**2가지 파일 함께 수정:**
1. **`lib/config.ts`** - `blogCategories` 배열에 카테고리명 추가
2. **Notion 데이터베이스** - 새 카테고리를 Posts 데이터베이스의 카테고리 선택지에 추가
3. **검증**: `app/blog/category/[category]/page.tsx`에서 자동 필터링 작동 확인

### 네비게이션 수정 워크플로우
**2가지 파일만 수정:**
1. **`lib/config.ts`** - `navItems` 배열 수정
2. **컴포넌트 수정 불필요** - `Header.tsx`에서 `navItems`를 자동 렌더링

---

## shadcn/ui 컴포넌트 사용

### 설치 규칙
```bash
# ✅ shadcn CLI로 컴포넌트 추가
npx shadcn@latest add button
npx shadcn@latest add card

# ❌ 수동 복사 금지
# 직접 파일 복사하여 components/ui/에 추가하면 안 됨
```

### 수정 금지 ❌
```typescript
// ❌ components/ui/button.tsx 수정 금지
// shadcn은 버전 관리를 위해 자동 업데이트됨
// 커스텀이 필요하면 컴포넌트를 상속하여 새 컴포넌트 생성
```

### 커스텀 필요 시 패턴
```typescript
// ✅ 새 컴포넌트로 감싸기 (composition pattern)
import { Button as BaseButton, ButtonProps } from '@/components/ui/button'

export function CustomButton(props: ButtonProps) {
  return (
    <BaseButton
      className="custom-styling"
      {...props}
    />
  )
}
```

### 현재 설치된 컴포넌트
- `button`, `card`, `input`, `label`, `form`
- `dialog`, `tabs`, `sheet`, `separator`
- `skeleton`, `avatar`, `badge`, `tooltip`

---

## 의존성 관리

### 현재 기술 스택 (변경 가능성 낮음)
```json
{
  "next": "16.1.7",
  "react": "19.2.3",
  "typescript": "5",
  "tailwindcss": "4",
  "@notionhq/client": "2.3.0",
  "react-hook-form": "7.71.2",
  "zod": "4.3.6",
  "date-fns": "4.1.0",
  "next-themes": "0.4.6",
  "lucide-react": "0.577.0",
  "class-variance-authority": "*",
  "clsx": "*",
  "tailwind-merge": "*"
}
```

### 추가 의존성 규칙

| 상황 | 규칙 |
|-----|------|
| **무거운 라이브러리** (lodash, moment.js 등) | ❌ 금지 - Native Web API 또는 date-fns 사용 |
| **UI 라이브러리** (Bootstrap, Material-UI 등) | ❌ 금지 - shadcn/ui 또는 Tailwind 사용 |
| **상태 관리** (Redux, Zustand 등) | ❌ 금지 - React Context 또는 URL State 사용 |
| **번들 크기 증가** (의존성 수 급증) | ❌ 금지 - 꼭 필요한 경우만 검토 후 추가 |
| **Notion 데이터** | ✅ `@notionhq/client` 기존 사용 |
| **폼 검증** | ✅ `react-hook-form` + `zod` 기존 사용 |
| **아이콘** | ✅ `lucide-react` 또는 `@radix-ui/react-icons` |

---

## Notion CMS 연동 규칙

### 데이터 페칭 패턴
```typescript
// ✅ lib/notion.ts에서 Notion API 래퍼 함수 사용
import { getPublishedPosts, getPostBySlug } from '@/lib/notion'

// Server Component에서 직접 호출
export default async function BlogPage() {
  const posts = await getPublishedPosts()
  return <div>{posts.map(post => ...)}</div>
}

// ❌ 클라이언트에서 Notion API 직접 호출 금지
// 'use client'
// const client = new NotionClient(...)  // 금지
// useEffect(() => fetch('...'))
```

### Notion 블록 렌더링
```typescript
// ✅ renderNotionBlock.ts의 렌더러 사용
import { renderNotionBlock } from '@/lib/renderNotionBlock'

export function PostContent({ blocks }) {
  return <div>{blocks.map(block => renderNotionBlock(block))}</div>
}
```

### 환경 변수
```bash
# .env.local (버전 관리에서 제외)
NOTION_API_KEY=ntn_xxx...
NOTION_DATABASE_ID=xxx...
```

---

## 폼 처리 (react-hook-form + zod)

### 패턴
```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// ✅ Zod 스키마 정의
const contactSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  message: z.string().min(10, '최소 10글자 필요'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: '', message: '' },
  })

  function onSubmit(data: ContactFormData) {
    // API 호출 또는 처리
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">전송</Button>
      </form>
    </Form>
  )
}
```

---

## 금지된 행동 (❌ Prohibited)

| 항목 | 이유 | 대안 |
|-----|------|------|
| `components/ui/` 파일 직접 수정 | shadcn 버전 관리 방해 | shadcn CLI로 재설치 |
| 상대 경로 import (`../../../`) | 코드 복잡성 증가 | `@/*` 별칭 사용 |
| `'use client'` 남용 | Server Component 이점 상실 | 필수 경우만 사용 |
| 새 디렉토리 구조 생성 | 기존 패턴 혼동 | CLAUDE.md의 구조 준수 |
| 무거운 의존성 추가 | 번들 크기 증가 | Web API 또는 경량 라이브러리 |
| Notion API 클라이언트에서 호출 | 보안 (API 키 노출) | Server Component에서만 호출 |
| 페이지 추가 후 config.ts 미수정 | 네비게이션 누락 | 페이지 + navItems 동시 수정 |
| TypeScript strict 무시 | 타입 안정성 손상 | 모든 타입 명시 |

---

## 의사결정 기준

### 새 기능 추가 시 위치 선택

```
새 기능이 필요한가?
├─ 유틸리티 함수? → lib/utils.ts 또는 lib/<feature>.ts
├─ 커스텀 훅? → hooks/useXxx.ts
├─ 재사용 가능한 컴포넌트? → components/MyComponent.tsx
├─ 기능별 컴포넌트? → components/<feature>/Index.tsx
├─ 페이지? → app/<route>/page.tsx (+ lib/config.ts navItems 추가)
├─ 공통 타입? → types/index.ts
├─ 기능별 타입? → 컴포넌트 파일 내 정의
└─ shadcn 컴포넌트 필요? → npx shadcn@latest add <component>
```

### 'use client' 추가 필요 여부

```
이 컴포넌트가 필요한가?
├─ React 훅 (useState, useEffect 등)? → YES: 'use client'
├─ 이벤트 핸들러 (onClick, onChange 등)? → YES: 'use client'
├─ 브라우저 API (localStorage, window 등)? → YES: 'use client'
├─ Next.js Navigation (useRouter, usePathname 등)? → YES: 'use client'
├─ 데이터 페칭만? → NO: Server Component OK
├─ 단순 렌더링만? → NO: Server Component OK
└─ Props 전달만? → NO: Server Component OK
```

### 스타일링 방식

```
스타일링이 필요한가?
├─ 기본 스타일? → Tailwind 유틸리티 (className="px-4 py-2 rounded")
├─ 조건부 클래스? → cn() 유틸 (cn("base", condition && "conditional"))
├─ 복잡한 변형? → class-variance-authority (cva)
├─ 동적 인라인 스타일? → 꼭 필요한 경우만 style prop
└─ CSS 모듈/파일? → ❌ 금지 (Tailwind 사용)
```

---

## 성능 및 SEO

### 이미지 최적화
```typescript
// ✅ next/image 사용
import Image from 'next/image'

export function BlogCover({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      priority={false}
      className="rounded-lg"
    />
  )
}

// ❌ 기본 <img> 태그 금지
// <img src={src} alt={alt} />
```

### SEO 메타 태그
```typescript
// ✅ Next.js metadata API 사용 (Server Component)
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '블로그 글 제목',
  description: '글 요약',
  openGraph: {
    title: '블로그 글 제목',
    description: '글 요약',
    url: 'https://example.com/blog/slug',
    images: [{ url: '...', width: 1200, height: 630 }],
  },
}
```

---

## 테마 및 다크 모드

### 사용 패턴
```typescript
// ✅ Server Component (테마 감지)
export default function Page() {
  return <div className="bg-white dark:bg-slate-950">...</div>
}

// ✅ Client Component (테마 변경)
'use client'
import { useTheme } from '@/hooks/useTheme'

export function MyComponent() {
  const { theme, setTheme, isDark } = useTheme()
  return (
    <>
      <div className={isDark ? 'dark-style' : 'light-style'}>...</div>
      <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
        {isDark ? '라이트 모드' : '다크 모드'}
      </button>
    </>
  )
}
```

**주의:** `next-themes` 초기화는 `components/providers.tsx`에서 처리됨 (수정 금지)

---

## 환경 별 설정

### 개발 환경
```bash
npm run dev
# http://localhost:3000 실행
# Hot Module Reloading 지원
```

### 프로덕션 빌드
```bash
npm run build
npm start
# .next 디렉토리 생성, 최적화된 빌드
```

### 린트 검사
```bash
npm run lint
# ESLint (Next.js + TypeScript 프리셋)
npm run lint -- --fix
# 자동 수정
```

---

## MCP 서버 활용

프로젝트는 다음 MCP 서버를 설정합니다:

### Playwright MCP
- **용도**: 브라우저 자동화, E2E 테스트, 스크린샷
- **예**: 페이지 렌더링 테스트, 폼 상호작용 검증

### Context7 MCP
- **용도**: React, Next.js, Tailwind, shadcn 최신 문서 및 코드 예제
- **예**: 새 shadcn 컴포넌트 사용법, Next.js 최신 기능

### Sequential Thinking MCP
- **용도**: 복잡한 아키텍처 설계, 버그 분석
- **예**: 새 기능 설계 시 단계적 사고 프로세스

---

## 체크리스트

새로운 페이지/기능 추가 후 다음을 확인하세요:

- [ ] TypeScript strict 모드 오류 없음
- [ ] `npm run lint` 성공
- [ ] `npm run build` 성공
- [ ] 개발 서버에서 정상 작동 확인
- [ ] 네비게이션 추가 시 `lib/config.ts` 수정됨
- [ ] `@/*` 경로 별칭만 사용
- [ ] PageLayout 래퍼 확인
- [ ] 'use client' 필요 여부 재확인
- [ ] 카테고리 추가 시 Notion 데이터베이스와 동기화
