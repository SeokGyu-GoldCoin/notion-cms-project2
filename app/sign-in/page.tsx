'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SignUpForm } from '@/components/SignUpForm'

// zod 스키마
const signInSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('유효한 이메일 형식이 아닙니다'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요')
    .min(8, '비밀번호는 8자 이상이어야 합니다'),
})

type SignInFormValues = z.infer<typeof signInSchema>

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [signUpOpen, setSignUpOpen] = useState(false)

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: SignInFormValues) {
    setIsLoading(true)
    setMessage(null)

    // 시뮬레이션: 실제 API 호출 대신 2초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (values.email === 'demo@example.com' && values.password === 'password123') {
      setMessage({
        type: 'success',
        text: '로그인에 성공했습니다!',
      })
      form.reset()
    } else {
      setMessage({
        type: 'error',
        text: '이메일 또는 비밀번호가 올바르지 않습니다.',
      })
    }

    setIsLoading(false)
  }

  return (
    <PageLayout>
      <div className="flex min-h-[calc(100vh-140px)] items-center justify-center py-12">
        <Card className="w-full max-w-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">로그인</CardTitle>
            <CardDescription>
              계정에 로그인하려면 이메일과 비밀번호를 입력하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* 이메일 필드 */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@email.com"
                          type="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 비밀번호 필드 */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 메시지 표시 */}
                {message && (
                  <div
                    className={`rounded-md p-3 text-sm ${
                      message.type === 'success'
                        ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {/* 제출 버튼 */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? '로그인 중...' : '로그인'}
                </Button>
              </form>
            </Form>

            {/* 데모 계정 정보 */}
            <div className="mt-4 rounded-md bg-muted p-3 text-sm text-muted-foreground">
              <p className="font-medium mb-2">데모 계정:</p>
              <p>이메일: demo@example.com</p>
              <p>비밀번호: password123</p>
            </div>
          </CardContent>

          {/* 푸터 */}
          <div className="border-t px-6 py-4">
            <p className="text-sm text-muted-foreground text-center">
              계정이 없으신가요?{' '}
              <Dialog open={signUpOpen} onOpenChange={setSignUpOpen}>
                <DialogTrigger asChild>
                  <button className="text-primary hover:underline text-sm font-medium">
                    가입하기
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>회원가입</DialogTitle>
                    <DialogDescription>
                      새 계정을 만들려면 아래 정보를 입력하세요.
                    </DialogDescription>
                  </DialogHeader>
                  <SignUpForm
                    onSuccess={() => setSignUpOpen(false)}
                    onCancel={() => setSignUpOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </p>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
