import { SiteConfig, NavItem } from '@/types'

// 사이트 기본 설정
export const siteConfig: SiteConfig = {
  name: '개발 블로그',
  description: 'Notion CMS 기반 개인 개발 블로그. React, Next.js, TypeScript 등 기술 콘텐츠를 공유합니다.',
  links: {
    github: 'https://github.com',
  },
}

// 블로그 네비게이션 메뉴
export const navItems: NavItem[] = [
  {
    label: '홈',
    href: '/',
  },
  {
    label: '블로그',
    href: '/blog',
  },
]

// 블로그 카테고리 목록 (Notion 데이터베이스와 일치)
export const blogCategories = [
  'React',
  'Next.js',
  'TypeScript',
  '성능 최적화',
  '팁 & 트릭',
  '프로젝트 회고',
]

// 기술 스택 배지 표시용
export const techStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS v4',
  'Notion CMS',
]
