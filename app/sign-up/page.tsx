'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { PageLayout } from '@/components/layout/PageLayout'
import { SignUpForm } from '@/components/SignUpForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function SignUpPage() {
  const router = useRouter()

  return (
    <PageLayout>
      <div className="flex min-h-[calc(100vh-140px)] items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">회원가입</CardTitle>
            <CardDescription>
              새 계정을 만들려면 아래 정보를 입력하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm
              onSuccess={() => router.push('/sign-in')}
              onCancel={() => router.push('/')}
            />
          </CardContent>

          {/* 푸터 */}
          <div className="border-t px-6 py-4">
            <p className="text-sm text-muted-foreground text-center">
              이미 계정이 있으신가요?{' '}
              <Link href="/sign-in" className="text-primary hover:underline font-medium">
                로그인
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
