# claude-nextjs-starters

React 19, TypeScript, Tailwind CSS v4, shadcn/ui로 구축된 현대적인 프로덕션 레디 Next.js 스타터킷입니다. 예제 페이지, 재사용 가능한 컴포넌트, 그리고 이미 설정된 모범 사례들로 완전한 웹 애플리케이션을 빌드할 수 있는 탄탄한 기반을 제공합니다.

## 주요 기술 스택

- **Next.js** 16.1.7 (App Router)
- **React** 19.2.3
- **TypeScript** 5 (strict mode)
- **Tailwind CSS** v4 (with @tailwindcss/postcss)
- **shadcn/ui** 4.0.8 + Radix UI 1.4.3
- **react-hook-form** 7.71.2 + **zod** 4.3.6 (폼 검증)
- **date-fns** 4.1.0 (날짜 유틸)
- **next-themes** 0.4.6 (테마 관리)
- **lucide-react** 0.577.0 (아이콘)

## 빠른 시작

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 애플리케이션에 접속합니다.

### 3. 코드 수정

`app/page.tsx`를 수정하면 페이지가 자동으로 업데이트됩니다.

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
claude-nextjs-starters/
├── app/                    # Next.js App Router 페이지 & 레이아웃
│   ├── layout.tsx         # 루트 레이아웃 (테마 제공자 포함)
│   ├── page.tsx           # 홈 페이지
│   ├── dashboard/         # 대시보드 예제
│   ├── sign-in/          # 로그인 예제
│   └── examples/         # 컴포넌트 예제
├── components/            # React 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트 (Header, Footer)
│   └── ThemeToggle.tsx   # 다크/라이트 모드 토글
├── lib/                   # 유틸리티 함수 & 설정
│   ├── utils.ts          # cn() Tailwind 병합 유틸
│   └── config.ts         # 사이트 설정, 네비게이션
├── types/                # TypeScript 타입 정의
├── hooks/                # React 커스텀 훅
├── public/               # 정적 자산
└── package.json          # 의존성 & 스크립트
```

## 주요 기능

- ✅ **React 19 & TypeScript**: 최신 기술 스택
- ✅ **Tailwind CSS v4**: 유틸리티 퍼스트 CSS
- ✅ **shadcn/ui**: 재사용 가능한 UI 컴포넌트
- ✅ **다크 모드**: next-themes를 통한 테마 관리
- ✅ **폼 검증**: react-hook-form + zod
- ✅ **타입 안정성**: TypeScript strict mode
- ✅ **모바일 반응형**: 완전한 반응형 디자인

## 새로운 UI 컴포넌트 추가

shadcn CLI를 사용하여 컴포넌트 추가:

```bash
npx shadcn@latest add <component-name>
```

예제: `button`, `card`, `dialog`, `input`, `form` 등

## 배포

### Vercel에 배포

```bash
npm run build
npm start
```

[Vercel](https://vercel.com)의 가장 쉬운 배포 방법을 확인하세요.

### 다른 호스팅 서비스

프로젝트는 Node.js를 지원하는 모든 호스팅 서비스에 배포 가능합니다.

## 자세한 정보

자세한 설정 및 아키텍처 정보는 [`CLAUDE.md`](./CLAUDE.md)를 참고하세요.

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com)
- [shadcn/ui 문서](https://ui.shadcn.com)
