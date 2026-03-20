'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// zod 스키마
const signUpSchema = z
  .object({
    name: z.string().min(2, '성명은 2자 이상이어야 합니다'),
    email: z
      .string()
      .min(1, '이메일을 입력해주세요')
      .email('유효한 이메일 형식이 아닙니다'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다'),
    confirmPassword: z
      .string()
      .min(1, '비밀번호 확인을 입력해주세요'),
    passwordHint: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  })

type SignUpFormValues = z.infer<typeof signUpSchema>

interface SignUpFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function SignUpForm({ onSuccess, onCancel }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordHint: '',
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(_values: SignUpFormValues) {
    setIsLoading(true)
    setMessage(null)

    // 시뮬레이션: 실제 API 호출 대신 2초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 모의 성공 응답
    setMessage({
      type: 'success',
      text: '계정이 성공적으로 생성되었습니다!',
    })
    form.reset()
    setIsLoading(false)

    // 콜백 실행
    setTimeout(() => {
      onSuccess?.()
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* 성명 필드 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>성명</FormLabel>
              <FormControl>
                <Input
                  placeholder="홍길동"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormDescription>
                8자 이상의 비밀번호를 입력하세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 비밀번호 확인 필드 */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
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

        {/* 비밀번호 힌트 필드 */}
        <FormField
          control={form.control}
          name="passwordHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 힌트 (선택사항)</FormLabel>
              <FormControl>
                <Input
                  placeholder="비밀번호를 기억할 수 있는 힌트를 입력하세요"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                비밀번호를 잊었을 때 도움이 될 수 있는 힌트를 입력할 수 있습니다.
              </FormDescription>
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

        {/* 버튼 */}
        <div className="flex gap-3">
          <Button
            type="submit"
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? '저장 중...' : '저장'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
            disabled={isLoading}
          >
            취소
          </Button>
        </div>
      </form>
    </Form>
  )
}
