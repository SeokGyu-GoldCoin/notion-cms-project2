# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 코드를 작업할 때 참고하도록 작성되었습니다.

**개인 개발 블로그**는 Notion을 CMS로 활용하여 개발자가 작성한 기술 콘텐츠를 자동으로 웹에 반영하는 블로그 플랫폼입니다.

상세 프로젝트 요구사항은 @/docs/PRD.md 참조

## 프로젝트 개요

**주요 기술 스택:**
- Next.js 16.1.7 (App Router)
- React 19.2.3
- TypeScript 5 (strict mode)
- Tailwind CSS v4 (with @tailwindcss/postcss)
- shadcn/ui 4.0.8 + Radix UI 1.4.3
- @notionhq/client 2.3.0 (Notion CMS 연동)
- react-hook-form 7.71.2 + zod 4.3.6 (폼 검증)
- date-fns 4.1.0 (날짜 유틸)
- next-themes 0.4.6 (테마 관리)
- lucide-react 0.577.0 (아이콘)

## 일반적인 개발 명령어

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

개발 서버는 `http://localhost:3000`에서 실행되며 핫 모듈 리로딩을 지원합니다.

## 프로젝트 구조 & 아키텍처

```
notion-cms-project2/
├── app/                          # Next.js App Router 페이지 & 레이아웃
│   ├── layout.tsx               # 루트 레이아웃 (테마 제공자 포함)
│   ├── page.tsx                 # 홈 페이지 (히어로 + 최근 글 + 카테고리)
│   ├── blog/
│   │   ├── page.tsx             # 글 목록 페이지
│   │   ├── [slug]/page.tsx      # 글 상세 페이지
│   │   └── category/[category]/page.tsx  # 카테고리 페이지
│   └── globals.css              # 글로벌 스타일
├── components/
│   ├── ui/                      # shadcn/ui 컴포넌트 라이브러리
│   ├── layout/
│   │   ├── Header.tsx           # 네비게이션 헤더 (use client)
│   │   ├── Footer.tsx           # 푸터
│   │   └── PageLayout.tsx       # 메인 페이지 래퍼 (헤더 + 푸터)
│   ├── ThemeToggle.tsx          # 다크/라이트 모드 토글 버튼 (use client)
│   └── providers.tsx            # 루트 제공자 (next-themes, use client)
│   (예정) BlogCard.tsx          # 글 카드 컴포넌트
│   (예정) NotionRenderer.tsx    # Notion 블록 렌더러
├── lib/
│   ├── utils.ts                 # 유틸리티 함수 (cn() for Tailwind merging)
│   ├── config.ts                # 사이트 설정 (siteConfig, navItems, blogCategories)
│   ├── notion.ts                # Notion API 래퍼 (getPublishedPosts, getPostBySlug 등)
│   └── renderNotionBlock.ts     # Notion 블록 렌더링 로직
├── types/
│   ├── index.ts                 # 공통 타입 (NavItem, SiteConfig)
│   └── notion.ts                # Notion 관련 타입 (BlogPost, NotionBlock 등)
├── hooks/
│   └── useTheme.ts              # 테마 관리 훅
├── docs/
│   └── PRD.md                   # 프로젝트 요구사항 문서
├── public/                      # 정적 자산
├── .env.local                   # 환경 변수 (NOTION_API_KEY, NOTION_DATABASE_ID)
├── next.config.ts               # Next.js 설정
├── tailwind.config.ts           # Tailwind CSS 설정
├── tsconfig.json                # TypeScript 설정
└── package.json                 # 의존성 & 스크립트
```

## 주요 아키텍처 패턴

### 경로 별칭
프로젝트는 루트 디렉토리(`tsconfig.json`)를 가리키는 `@/*` 별칭을 사용합니다. components, lib, types에서 import할 때는 항상 `@/`를 사용합니다:

```typescript
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'
```

### 레이아웃 구조
- **루트 레이아웃** (`app/layout.tsx`): 전체 앱을 Providers(테마 제공자)로 래핑
- **PageLayout** (`components/layout/PageLayout.tsx`): Header + Footer를 포함한 표준 페이지 래퍼
- 대부분의 페이지에는 PageLayout을 사용하고, 필요한 경우 커스텀 레이아웃으로 오버라이드

### 컴포넌트 조직화
- **UI 컴포넌트** (`components/ui/`): shadcn/ui 프리미티브 컴포넌트 - 이들을 수정하지 마세요. shadcn CLI를 통해 업데이트하도록 의도됨
- **레이아웃 컴포넌트** (`components/layout/`): 재사용 가능한 레이아웃 빌딩 블록 (Header, Footer 등)
- **기능 컴포넌트**: `components/` 루트 또는 기능별 서브디렉토리에 생성

### 스타일링
- **Tailwind CSS v4**: 유틸리티 퍼스트 CSS 프레임워크, `tailwind.config.ts`에서 설정
- **다크 모드**: next-themes를 통한 클래스 기반 다크 모드, `dark:` Tailwind 접두사 사용
- **cn() 유틸**: `@/lib/utils`의 `cn()`을 사용하여 Tailwind 클래스를 안전하게 병합 (충돌 처리)

```typescript
import { cn } from '@/lib/utils'

export function MyComponent({ isActive }) {
  return <div className={cn('px-4 py-2', isActive && 'bg-primary')}>
}
```

### 설정
- **사이트 설정** (`lib/config.ts`):
  - `siteConfig`: 프로젝트명, 설명, 링크 (Header, Footer에서 사용)
  - `navItems`: 네비게이션 메뉴 아이템 배열 (Header에서 사용)
  - `techStack`: 기술 스택 배열 (Header, Footer, HomePage에서 공유하는 기술 목록)
- **테마**: Providers의 `next-themes`를 통해 설정, 시스템 선호도 감지 지원

### 타입 안정성
- TypeScript를 strict 모드로 유지 (`tsconfig.json`)
- `types/index.ts`에서 재사용 가능한 타입 정의
- 아이콘 props에는 `React.ComponentType<{ className?: string }>` 타입 사용

### 클라이언트/서버 컴포넌트 분리
Next.js App Router에서 **Server Component**가 기본입니다. 다음 경우에만 `'use client'` 지시어를 추가합니다:

**'use client' 필수:**
- React 훅 사용 (`useState`, `useEffect`, `useContext` 등)
- 브라우저 API 사용 (`localStorage`, `window` 등)
- 이벤트 핸들러 (`onClick`, `onChange` 등)
- next/navigation 훅 (`useRouter`, `usePathname` 등)

**현재 프로젝트의 'use client' 컴포넌트:**
- `components/providers.tsx`: ThemeProvider 래핑
- `components/layout/Header.tsx`: `usePathname()`, Sheet 상태 관리
- `components/ThemeToggle.tsx`: `useTheme()`, 테마 변경
- `hooks/useTheme.ts`: next-themes 래퍼

**Server Component 유지:**
- 대부분의 페이지와 레이아웃은 Server Component (예: `app/page.tsx`, `app/layout.tsx`)
- PageLayout, Footer 등도 Server Component

### 폼 처리
- 폼 검증에 **react-hook-form** + **zod** 사용
- shadcn은 react-hook-form과 통합된 `Form` 래퍼 컴포넌트(`components/ui/form.tsx`)를 제공

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

export function MyForm() {
  const form = useForm({ resolver: zodResolver(schema) })
  // ...
}
```

## 코드 스타일 & 컨벤션

- **들여쓰기**: 2칸 (프로젝트에서 설정됨)
- **네이밍**: 변수/함수는 camelCase, 컴포넌트/타입은 PascalCase
- **주석**: 한국어 (CLAUDE.md 글로벌 지침에 따라)
- **Imports**: 순서대로 그룹화: React/Next.js → 외부 라이브러리 → 프로젝트 코드 (@/)
- **파일 네이밍**:
  - 컴포넌트: PascalCase (예: `Button.tsx`, `PageLayout.tsx`)
  - 유틸리티: camelCase (예: `utils.ts`, `config.ts`)
  - 페이지: 소문자 (예: `page.tsx`)

## 린트 & 코드 품질

프로젝트는 Next.js와 TypeScript 프리셋을 포함한 ESLint를 사용합니다 (`eslint.config.mjs`):

```bash
npm run lint
```

ESLint 설정은 다음을 강제합니다:
- Next.js 모범 사례 (Core Web Vitals, Image Optimization)
- TypeScript 타입 안정성
- React 모범 사례 (hooks rules 등)

린트 오류 수정:
```bash
npm run lint -- --fix
```

## 새로운 페이지 추가

페이지는 Next.js App Router 파일 구조를 사용합니다:

```typescript
// app/my-page/page.tsx
import { PageLayout } from '@/components/layout/PageLayout'

export default function MyPage() {
  return (
    <PageLayout>
      <div className="container py-10">
        <h1>My Page</h1>
      </div>
    </PageLayout>
  )
}
```

## UI 컴포넌트 추가

shadcn CLI를 사용하여 사전 빌드된 컴포넌트 추가:

```bash
npx shadcn@latest add <component-name>
```

사용 가능한 컴포넌트: button, card, input, label, form, dialog, tabs, sheet 등. 컴포넌트는 `components/ui/`에 추가됩니다.

## 커스텀 훅 추가

`hooks/` 디렉토리에 `use` 접두사로 훅 생성:

```typescript
// hooks/useMyHook.ts
import { useState } from 'react'

export function useMyHook() {
  const [state, setState] = useState()
  // ...
  return { state, setState }
}
```

## 빌드 & 배포

```bash
npm run build      # .next 빌드 디렉토리 생성
npm start          # 포트 3000에서 프로덕션 서버 실행
```

빌드 프로세스:
- Next.js 페이지 및 컴포넌트 컴파일
- 자산 최적화 (이미지, 폰트)
- 가능한 곳은 정적 자산 생성
- TypeScript 타입 검증

## 의존성 주의사항

- **shadcn** (^4.0.8): shadcn/ui 컴포넌트 라이브러리 패키지로 설치됨 (CLI가 아닌 직접 패키지 사용)
- **next-themes**: 테마 지속성 및 시스템 선호도 감지 처리
- **tw-animate-css**: Tailwind CSS 애니메이션 유틸리티 클래스 확장
- **@radix-ui/react-icons**: Radix 디자인 시스템의 아이콘 라이브러리
- **class-variance-authority**: 컴포넌트 스타일 변형을 위한 유틸리티
- **clsx + tailwind-merge**: Tailwind 클래스를 안전하게 병합하는 `cn()` 유틸에 결합
- **react-hook-form**: 고성능 폼 상태 관리
- **zod**: TypeScript 중심 스키마 검증
- **lucide-react**: 일관된 스타일의 SVG 아이콘
- **date-fns**: 최신 날짜 조작 (moment.js 피하기)

무거운 의존성 추가는 피합니다. 가능하면 네이티브 Web API와 Tailwind 유틸리티를 선호합니다.

## useTheme 훅 API

`hooks/useTheme.ts`는 `next-themes`의 편의 래퍼입니다:

```typescript
import { useTheme } from '@/hooks/useTheme'

export function MyComponent() {
  const { theme, setTheme, themes, isDark, isLight } = useTheme()

  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      {isDark ? '라이트 모드' : '다크 모드'}
    </button>
  )
}
```

**반환 값:**
- `theme`: 현재 테마 ('light', 'dark' 또는 시스템 기본값)
- `setTheme(theme)`: 테마 변경 함수
- `themes`: 사용 가능한 테마 목록
- `isDark`: 현재 테마가 'dark'인지 여부 (편의 속성)
- `isLight`: 현재 테마가 'light'인지 여부 (편의 속성)

## 환경 변수

프로젝트는 `.env.local`를 사용합니다 (`.gitignore`에 포함됨):

```bash
# .env.local (버전 관리에서 제외)
# 개발 환경 전용 변수들을 여기에 작성합니다.
# 공유 가능한 기본값이 있다면 .env.example을 생성하여 문서화하세요.
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**주의사항:**
- `NEXT_PUBLIC_` 접두사: 클라이언트에 노출됨
- 기타 변수: 서버 전용 (API 키, 시크릿 등)
- 환경 변수 변경 후 개발 서버 재시작 필요

## MCP 서버 설정

프로젝트는 `.mcp.json`에 다음 MCP 서버를 설정합니다:

**Playwright MCP**: 브라우저 자동화 및 E2E 테스트
```bash
# 사용 예: 페이지 스크린샷, 요소 클릭, 폼 입력 자동화
```

**Context7 MCP**: 라이브러리 최신 문서 및 코드 예제 조회
```bash
# 사용 예: React, Next.js, Tailwind CSS 등의 최신 문서 검색
```

**Sequential Thinking MCP**: 복잡한 문제에 대한 단계적 분석
```bash
# 사용 예: 아키텍처 설계, 복잡한 버그 디버깅
```

Claude Code에서 이러한 도구들을 자동으로 활용할 수 있습니다.

## 브라우저 지원

프로젝트는 최신 브라우저 (ES2017+)를 대상으로 합니다. IE11은 지원되지 않습니다.

## 새로운 개발자를 위한 다음 단계

1. `npm run dev`를 실행하여 개발 서버 시작
2. `/examples`를 방문하여 사용 가능한 컴포넌트 확인
3. `/dashboard` 및 `/sign-in` 페이지에서 레이아웃 예제 확인
4. `lib/config.ts`를 읽어 사이트 메타데이터 구조 이해
5. `components/ui/`를 탐색하여 shadcn/ui 컴포넌트 사용 확인
