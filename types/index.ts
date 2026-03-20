import React from 'react'

export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
  disabled?: boolean
  external?: boolean
}

export interface SiteConfig {
  name: string
  description: string
  links: { github: string }
}

export interface Feature {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export interface StatCard {
  title: string
  value: string
  change: number // 증감율 %
  icon: React.ComponentType<{ className?: string }>
}
