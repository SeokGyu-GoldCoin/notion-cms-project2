# Product Requirements Document (PRD)
## 개인 개발 블로그 - Notion CMS 연동 프로젝트

**작성일**: 2026년 3월 20일
**프로젝트명**: 개인 개발 블로그
**버전**: v1.0 (MVP)

---

## 1. 프로젝트 개요

### 1.1 프로젝트 배경
개발자가 작성한 기술 콘텐츠를 효율적으로 관리하고 배포할 수 있는 개인 블로그 플랫폼이 필요합니다. Notion을 CMS로 활용하여 복잡한 백엔드 구축 없이 직관적인 콘텐츠 관리가 가능합니다.

### 1.2 프로젝트 목적
Notion 데이터베이스를 Content Management System으로 활용하여 작성한 글이 자동으로 웹 블로그에 반영되는 시스템 구축

### 1.3 CMS 선택 이유
- **직관적 UI**: Notion의 친숙한 인터페이스에서 글 작성 및 메타데이터 관리
- **API 지원**: Notion 공식 API를 통한 자동화된 데이터 동기화
- **인프라 최소화**: 별도의 백엔드 서버 없이 Notion API만으로 운영 가능
- **버전 관리**: Notion 내 변경 이력 자동 추적
- **비용 절감**: 무료 Notion 계정으로 충분한 콘텐츠 관리 가능

### 1.4 타겟 사용자
- 기술 콘텐츠를 작성하는 개발자
- 블로그를 통해 지식 공유를 원하는 엔지니어
- 낮은 기술적 진입장벽으로 콘텐츠 관리하길 원하는 사용자

---

## 2. 주요 기능

### 2.1 핵심 기능
1. **Notion 데이터베이스 연동**
   - Notion API를 통한 자동 데이터 동기화
   - 공개된 데이터베이스에서 발행 글만 추출
   - 실시간 또는 캐시된 데이터 제공

2. **블로그 글 목록 페이지**
   - 최신순 글 목록 표시
   - 페이지네이션 지원 (또는 무한 스크롤)
   - 글 미리보기 (제목, 카테고리, 발행일, 태그)

3. **블로그 글 상세 페이지**
   - Notion 페이지 내용을 렌더링
   - 메타데이터 표시 (작성자, 발행일, 카테고리, 태그)
   - 관련 글 추천

4. **카테고리 필터링**
   - 카테고리별 글 목록 표시
   - 카테고리 페이지 자동 생성

5. **검색 기능** (MVP v1.1 이후 가능)
   - 제목 및 본문 검색
   - 필터 조합 검색 (카테고리 + 태그)

6. **반응형 디자인**
   - 모바일, 태블릿, 데스크톱 최적화
   - 접근성 기준 준수

---

## 3. 기술 스택

### 3.1 Frontend
- **Framework**: Next.js 15.x (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4 + shadcn/ui v4
- **Icons**: Lucide React

### 3.2 CMS & Data
- **CMS**: Notion API (@notionhq/client)
- **Data Management**: 클라이언트 측 데이터 페칭 또는 ISR(Incremental Static Regeneration)

### 3.3 Deployment
- **Platform**: Vercel
- **Environment**: Node.js 18+

### 3.4 선택 라이브러리
- **@notionhq/client**: 공식 Notion SDK
- **notion-to-html**: Notion 블록 파싱 및 HTML 변환 (또는 커스텀)
- **react-hook-form + zod**: 폼 검증 (필터링, 검색용)
- **date-fns**: 날짜 포매팅

---

## 4. Notion 데이터베이스 구조

### 4.1 데이터베이스 스키마

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| **Title** | Title | ✓ | 블로그 글 제목 |
| **Category** | Select | ✓ | 카테고리 (예: React, Next.js, TypeScript, 팁) |
| **Tags** | Multi-Select | ✗ | 태그 (예: hooks, performance, best-practices) |
| **Published** | Date | ✓ | 발행일 (글 작성 날짜) |
| **Status** | Select | ✓ | 상태 (초안 / 발행됨 / 보관됨) |
| **Excerpt** | Text | ✗ | 글 요약 (150자 이내) |
| **Cover** | Files & Media | ✗ | 커버 이미지 |
| **Content** | Page Content | - | Notion 페이지 본문 (자동) |

### 4.2 상태 값
- **초안 (Draft)**: 작성 중인 글 (블로그에 미표시)
- **발행됨 (Published)**: 공개된 글 (블로그에 표시)
- **보관됨 (Archived)**: 더 이상 표시하지 않을 글

### 4.3 카테고리 예시
- React
- Next.js
- TypeScript
- 성능 최적화
- 팁 & 트릭
- 프로젝트 회고

---

## 5. 화면 구성

### 5.1 페이지 레이아웃

#### 홈 페이지 (`/`)
- **구성 요소**:
  - 헤더: 사이트명, 네비게이션, 테마 토글
  - 히어로 섹션: 블로그 소개
  - 최근 글 목록: 최신 5-10개 글 미리보기
  - 카테고리 네비게이션: 모든 카테고리 링크
  - 푸터: 소개, 링크, 저작권

- **데이터 표시**:
  - 글 카드: 제목, 요약, 카테고리, 발행일, 썸네일
  - 페이지네이션 또는 "더보기" 버튼

#### 글 목록 페이지 (`/blog`)
- **구성 요소**:
  - 필터 사이드바: 카테고리 필터, 정렬 옵션
  - 글 목록: 그리드 또는 리스트 레이아웃
  - 페이지네이션

- **데이터 표시**:
  - 글 카드 (홈과 동일)
  - 선택된 필터 상태 표시

#### 글 상세 페이지 (`/blog/[slug]`)
- **구성 요소**:
  - 글 제목 및 메타데이터 (카테고리, 발행일, 작성자, 읽는 시간)
  - 글 본문 (Notion 블록 렌더링)
  - 테이블 오브 콘텐츠 (TOC) - 헤더 기반
  - 관련 글 추천 (같은 카테고리, 3-5개)
  - 댓글 섹션 (선택사항)

- **데이터 표시**:
  - Notion 페이지 콘텐츠
  - 구문 강조 (코드 블록)
  - 이미지 최적화

#### 카테고리 페이지 (`/blog/category/[category]`)
- **구성 요소**:
  - 카테고리명 및 설명
  - 해당 카테고리의 모든 글 목록
  - 정렬 옵션 (최신순, 인기순 등)

#### 검색 결과 페이지 (`/search`)
- **구성 요소** (MVP v1.1):
  - 검색 입력란
  - 필터 옵션 (카테고리, 태그)
  - 검색 결과 목록

### 5.2 공통 컴포넌트
- **Header**: 네비게이션, 테마 토글
- **Footer**: 링크, 저작권 정보
- **BlogCard**: 글 카드 컴포넌트 (미리보기)
- **BlogContent**: 글 본문 렌더러
- **Breadcrumb**: 현재 경로 표시
- **TOC**: 테이블 오브 콘텐츠
- **RelatedPosts**: 관련 글 추천

---

## 6. MVP 범위 (Phase 1)

### 6.1 포함 기능
- [x] Notion API 연동 및 데이터 페칭
- [x] 글 목록 페이지 (홈 + `/blog`)
- [x] 글 상세 페이지
- [x] 카테고리 필터링 및 동적 라우팅
- [x] 기본 반응형 디자인
- [x] 다크/라이트 모드
- [x] Notion 블록 기본 렌더링 (텍스트, 이미지, 코드)
- [x] SEO 최적화 (메타데이터, Open Graph)

### 6.2 제외 기능 (v1.1+)
- [ ] 검색 기능
- [ ] 전체 텍스트 검색 인덱싱
- [ ] 댓글 시스템
- [ ] 조회수 추적
- [ ] 소셜 공유 버튼
- [ ] 이메일 구독 기능
- [ ] 관리자 대시보드
- [ ] 고급 Notion 블록 지원 (데이터베이스, 시놉시스 등)

---

## 7. 구현 단계

### Phase 1: MVP 기초 (1-2주)

#### 1단계: 환경 설정 및 Notion 연동
- [ ] Notion 데이터베이스 생성 및 구조 설계
- [ ] Notion API 키 발급 및 환경 변수 설정
- [ ] `@notionhq/client` 패키지 설치
- [ ] Notion API 페칭 함수 작성 (`lib/notion.ts`)
- [ ] TypeScript 타입 정의 (`types/notion.ts`)

**산출물**:
- Notion 데이터베이스 (공개 설정)
- `.env.local` 설정 (API 키)
- `lib/notion.ts` (API 래퍼)
- `types/notion.ts` (타입 정의)

#### 2단계: 글 목록 페이지 구현
- [ ] `/blog` 페이지 생성
- [ ] `BlogCard` 컴포넌트 작성
- [ ] Notion 데이터 페칭 및 표시
- [ ] 페이지네이션 또는 무한 스크롤 구현
- [ ] 로딩 상태 및 에러 처리

**산출물**:
- `app/blog/page.tsx`
- `components/BlogCard.tsx`
- 페이지네이션 로직

#### 3단계: 글 상세 페이지 구현
- [ ] `/blog/[slug]` 동적 라우트 생성
- [ ] Notion 블록 렌더러 작성 (`components/NotionRenderer.tsx`)
- [ ] 기본 블록 지원 (paragraph, heading, code, image)
- [ ] 메타데이터 표시
- [ ] 관련 글 추천 로직

**산출물**:
- `app/blog/[slug]/page.tsx`
- `components/NotionRenderer.tsx`
- `lib/renderNotionBlock.ts`

#### 4단계: 카테고리 필터링
- [ ] `/blog/category/[category]` 라우트 생성
- [ ] 카테고리별 글 필터링 로직
- [ ] 홈 페이지에 카테고리 섹션 추가
- [ ] 카테고리 네비게이션 구현

**산출물**:
- `app/blog/category/[category]/page.tsx`
- 필터링 유틸 함수

#### 5단계: 스타일링 및 최적화
- [ ] 글 목록 페이지 스타일링 (shadcn/ui 활용)
- [ ] 글 상세 페이지 타이포그래피 최적화
- [ ] 반응형 디자인 테스트
- [ ] 이미지 최적화 (`next/image`)
- [ ] SEO 메타데이터 추가

**산출물**:
- 완성된 UI/UX
- 반응형 테스트 완료
- SEO 최적화

#### 6단계: 배포
- [ ] Vercel에 프로젝트 배포
- [ ] 환경 변수 설정
- [ ] 프로덕션 테스트
- [ ] 성능 모니터링 설정

**산출물**:
- 라이브 배포된 사이트
- Vercel 설정 완료

### Phase 2: 기능 확장 (v1.1+)

#### 검색 기능 추가
- [ ] 검색 페이지 구현
- [ ] 클라이언트 측 또는 서버 측 검색 로직
- [ ] 필터 조합 검색

#### 분석 및 모니터링
- [ ] Google Analytics 또는 Vercel Analytics 연동
- [ ] 조회수 추적 (선택사항)

#### 개선 사항
- [ ] 고급 Notion 블록 지원 (표, 데이터베이스 등)
- [ ] 댓글 시스템 (Disqus, Giscus 등)
- [ ] 소셜 공유 버튼
- [ ] 이메일 구독

---

## 8. 프로젝트 구조

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
│
├── components/
│   ├── ui/                          # shadcn/ui 컴포넌트
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── PageLayout.tsx
│   ├── BlogCard.tsx                 # 글 카드 컴포넌트
│   ├── NotionRenderer.tsx           # Notion 블록 렌더러
│   └── ...
│
├── lib/
│   ├── notion.ts                    # Notion API 래퍼
│   ├── renderNotionBlock.ts         # 블록 렌더링 로직
│   ├── utils.ts
│   └── config.ts
│
├── types/
│   ├── index.ts                     # 일반 타입
│   └── notion.ts                    # Notion 관련 타입
│
├── hooks/
│   └── useTheme.ts
│
├── docs/
│   └── PRD.md                       # 이 파일
│
├── public/
├── .env.local                       # 환경 변수
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 9. 기술적 고려사항

### 9.1 성능 최적화
- **ISR (Incremental Static Regeneration)**: 글 목록 캐시 및 주기적 재검증
- **이미지 최적화**: `next/image` 사용
- **코드 분할**: 동적 임포트로 번들 크기 최소화
- **API 레이트 리미팅**: Notion API 호출 최소화

### 9.2 SEO
- 메타 태그 (title, description, og:image 등)
- 구조화된 데이터 (Schema.org)
- 사이트맵 및 robots.txt
- 동적 라우트의 정적 생성 또는 동적 메타데이터

### 9.3 접근성
- WCAG 2.1 AA 기준 준수
- 시맨틱 HTML
- ARIA 라벨
- 키보드 네비게이션

### 9.4 보안
- Notion API 키 환경 변수 관리
- 입력 검증
- XSS 방지 (Notion 렌더러에서)

---

## 10. 성공 기준

### 10.1 기능 완성도
- [ ] Notion API 연동 100% 완료
- [ ] 모든 설계된 페이지 구현 완료
- [ ] 카테고리별 필터링 정상 작동
- [ ] 반응형 디자인 모든 기기에서 정상 작동

### 10.2 성능 메트릭
- 홈 페이지 로딩 시간: < 2초 (3G)
- First Contentful Paint (FCP): < 1.5초
- Lighthouse 점수: > 85 (Performance, Accessibility, Best Practices)

### 10.3 사용자 경험
- 모바일에서 최적화된 UI
- 명확한 네비게이션
- 빠른 검색 및 필터링

### 10.4 배포
- Vercel에 성공적으로 배포
- 프로덕션 환경에서 무결성 테스트 완료

---

## 11. 위험 요소 및 완화 전략

| 위험 | 영향 | 확률 | 완화 전략 |
|------|------|------|---------|
| Notion API 레이트 리미팅 | 페이지 로딩 지연 | 중 | ISR 캐싱, API 호출 최적화 |
| Notion 블록 구조 변경 | 렌더링 오류 | 낮 | 버전 관리, 에러 핸들링 |
| 대량 콘텐츠 스케일링 | 성능 저하 | 낮 | 페이지네이션, 캐싱 전략 |

---

## 12. 일정 및 마일스톤

| 마일스톤 | 예상 기간 | 상태 |
|---------|---------|------|
| 환경 설정 및 API 연동 | 2-3일 | 진행 예정 |
| MVP 구현 | 1-2주 | 진행 예정 |
| 스타일링 및 최적화 | 3-5일 | 진행 예정 |
| 테스트 및 배포 | 2-3일 | 진행 예정 |
| **전체 Phase 1** | **2-3주** | - |

---

## 13. 참고 자료

- [Notion API 공식 문서](https://developers.notion.com/)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com/)
- [Tailwind CSS v4 가이드](https://tailwindcss.com/blog/tailwindcss-v4)

---

## 부록: Notion 데이터베이스 설정 가이드

### 생성 단계
1. Notion 워크스페이스에서 새 페이지 생성
2. 데이터베이스 추가 (Database → Table)
3. 위의 스키마에 따라 속성(Properties) 설정
4. 샘플 글 몇 개 추가 (Status: Published)

### API 키 발급
1. [Notion Developers](https://www.notion.so/my-integrations) 접속
2. 새 통합(Integration) 생성
3. API 키 복사
4. `.env.local`에 `NOTION_API_KEY` 설정
5. 데이터베이스 ID 설정 (`NOTION_DATABASE_ID`)

### 데이터베이스 공개 설정
- Notion 페이지 공유 설정에서 통합이 접근할 수 있도록 허용

---

**문서 버전**: v1.0
**최종 수정**: 2026년 3월 20일
