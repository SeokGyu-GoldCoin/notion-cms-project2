import { SiteConfig, NavItem } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'Next.js Starter Kit',
  description: '완성도 높은 Next.js 보일러플레이트. 즉시 사용 가능한 컴포넌트와 레이아웃.',
  links: {
    github: 'https://github.com',
  },
}

export const navItems: NavItem[] = [
  {
    label: '홈',
    href: '/',
  },
  {
    label: '예제',
    href: '/examples',
  },
  {
    label: '대시보드',
    href: '/dashboard',
  },
  {
    label: '로그인',
    href: '/sign-in',
  },
  {
    label: '회원가입',
    href: '/sign-up',
  },
]

export const techStack = [
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Tailwind CSS v4',
  'shadcn/ui',
  'date-fns',
]
