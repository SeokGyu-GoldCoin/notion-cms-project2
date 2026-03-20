import React from 'react'

// 네비게이션 메뉴 아이템 타입
export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
  disabled?: boolean
  external?: boolean
}

// 사이트 전역 설정 타입
export interface SiteConfig {
  name: string
  description: string
  links: { github: string }
}
