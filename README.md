# 개인 개발 블로그 - Notion CMS 연동 프로젝트

Notion을 CMS로 활용하여 개발자가 작성한 기술 콘텐츠를 효율적으로 관리하고 배포할 수 있는 개인 블로그 플랫폼입니다. Next.js, TypeScript, Tailwind CSS v4, shadcn/ui를 기반으로 구축되었으며, Notion API를 통해 복잡한 백엔드 구축 없이 직관적인 콘텐츠 관리가 가능합니다.

**작성일**: 2026년 3월 20일 | **버전**: v1.0 (MVP)

## 주요 기술 스택

- **Framework**: Next.js 15.x (App Router)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS v4 + shadcn/ui v4
- **Icons**: Lucide React
- **CMS**: Notion API (@notionhq/client)
- **Utilities**:
  - react-hook-form + zod (폼 검증)
  - date-fns (날짜 유틸)
  - next-themes (테마 관리)

## 빠른 시작

### 1. 환경 설정

```bash
# 의존성 설치
npm install

# 환경 변수 설정 (.env.local)
NOTION_API_KEY=<your-notion-api-key>
NOTION_DATABASE_ID=<your-notion-database-id>
```

**Notion API 키 발급:**
1. [Notion Developers](https://www.notion.so/my-integrations) 접속
2. 새 통합(Integration) 생성
3. API 키 복사 후 `.env.local`에 저장
4. Notion 데이터베이스 ID 설정

### 2. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 애플리케이션에 접속합니다.

### 3. Notion 데이터베이스 구성

Notion 워크스페이스에서 아래 필드로 새 데이터베이스를 생성합니다:

| 필드명 | 타입 | 설명 |
|--------|------|------|
| **Title** | Title | 블로그 글 제목 |
| **Category** | Select | 카테고리 (React, Next.js, TypeScript 등) |
| **Tags** | Multi-Select | 태그 |
| **Published** | Date | 발행일 |
| **Status** | Select | 상태 (Draft / Published / Archived) |
| **Excerpt** | Text | 글 요약 (150자 이내) |
| **Cover** | Files & Media | 커버 이미지 |

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

## 프로젝트 구조

```
notion-cms-project/
├── app/
│   ├── layout.tsx                    # 루트 레이아웃
│   ├── page.tsx                      # 홈 페이지
│   ├── blog/
│   │   ├── page.tsx                 # 글 목록 페이지
│   │   ├── [slug]/
│   │   │   └── page.tsx             # 글 상세 페이지
│   │   └── category/
│   │       └── [category]/
│   │           └── page.tsx         # 카테고리 페이지
│   └── globals.css
├── components/
│   ├── ui/                          # shadcn/ui 컴포넌트
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── PageLayout.tsx
│   ├── BlogCard.tsx                 # 글 카드 컴포넌트
│   ├── NotionRenderer.tsx           # Notion 블록 렌더러
│   └── ThemeToggle.tsx
├── lib/
│   ├── notion.ts                    # Notion API 래퍼
│   ├── renderNotionBlock.ts         # 블록 렌더링 로직
│   ├── utils.ts
│   └── config.ts
├── types/
│   ├── index.ts                     # 일반 타입
│   └── notion.ts                    # Notion 관련 타입
├── hooks/
│   └── useTheme.ts
├── docs/
│   └── PRD.md                       # 프로젝트 요구사항 문서
├── public/
├── .env.local                       # 환경 변수
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## 주요 기능

### MVP 범위 (Phase 1)
- ✅ **Notion API 연동**: @notionhq/client를 통한 자동 데이터 동기화
- ✅ **글 목록 페이지**: 최신순 글 목록 및 페이지네이션
- ✅ **글 상세 페이지**: Notion 블록 렌더링 및 메타데이터 표시
- ✅ **카테고리 필터링**: 카테고리별 글 목록 및 동적 라우팅
- ✅ **기본 반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- ✅ **다크/라이트 모드**: next-themes를 통한 테마 관리
- ✅ **Notion 블록 지원**: 텍스트, 이미지, 코드 블록 기본 렌더링
- ✅ **SEO 최적화**: 메타데이터, Open Graph 태그

### v1.1+ 예정 기능
- ⏳ **검색 기능**: 제목 및 본문 검색
- ⏳ **댓글 시스템**: Disqus, Giscus 등 연동
- ⏳ **조회수 추적**: 분석 및 모니터링
- ⏳ **고급 Notion 블록**: 테이블, 데이터베이스 등

## 주요 페이지 및 컴포넌트

### 페이지
- **`/`** - 홈 페이지: 최근 글 미리보기 및 카테고리 네비게이션
- **`/blog`** - 글 목록 페이지: 카테고리 필터링 및 페이지네이션
- **`/blog/[slug]`** - 글 상세 페이지: Notion 콘텐츠 렌더링 및 관련 글 추천
- **`/blog/category/[category]`** - 카테고리 페이지: 해당 카테고리의 모든 글

### 주요 컴포넌트
- **BlogCard**: 글 카드 (제목, 요약, 카테고리, 발행일, 썸네일)
- **NotionRenderer**: Notion 블록 파싱 및 HTML 렌더링
- **Header**: 네비게이션 헤더
- **Footer**: 사이트 푸터
- **PageLayout**: 헤더 + 푸터를 포함한 표준 레이아웃

## shadcn/ui 컴포넌트 추가

필요한 컴포넌트를 shadcn CLI로 추가:

```bash
npx shadcn@latest add button card input label form
```

## 배포

### Vercel에 배포 (권장)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 환경 변수 설정:
   ```
   NOTION_API_KEY=<your-key>
   NOTION_DATABASE_ID=<your-id>
   ```
4. 배포 완료

### 로컬 배포 테스트

```bash
npm run build      # 프로덕션 빌드
npm start          # 포트 3000에서 서버 실행
```

## 성능 메트릭 목표

- 홈 페이지 로딩 시간: < 2초 (3G)
- First Contentful Paint (FCP): < 1.5초
- Lighthouse 점수: > 85 (Performance, Accessibility, Best Practices)

## 문서

- **[PRD.md](./docs/PRD.md)** - 상세한 프로젝트 요구사항 문서
- **[CLAUDE.md](./CLAUDE.md)** - 개발 환경 및 아키텍처 가이드

## 참고 자료

- [Notion API 공식 문서](https://developers.notion.com/)
- [Next.js 문서](https://nextjs.org/docs)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com/)
- [Tailwind CSS v4 가이드](https://tailwindcss.com/blog/tailwindcss-v4)

## 라이선스

MIT
