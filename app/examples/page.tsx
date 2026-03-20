'use client'

import { useState } from 'react'

import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// 예제 데이터 구조
const exampleCategories = [
  {
    id: 'button',
    label: '버튼',
    description: '다양한 상태와 스타일의 버튼 컴포넌트',
  },
  {
    id: 'card',
    label: '카드',
    description: '기본 카드 및 다양한 레이아웃의 카드 컴포넌트',
  },
  {
    id: 'badge',
    label: '배지',
    description: '다양한 변형의 배지 컴포넌트',
  },
  {
    id: 'input',
    label: '입력',
    description: '텍스트 입력 및 다양한 상태의 입력 필드',
  },
  {
    id: 'form',
    label: '폼',
    description: '라벨, 입력, 설명으로 구성된 폼 요소',
  },
  {
    id: 'dialog',
    label: '다이얼로그',
    description: '모달 대화상자 컴포넌트',
  },
  {
    id: 'tabs',
    label: '탭',
    description: '탭 네비게이션 컴포넌트',
  },
]

export default function ExamplesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <PageLayout>
      {/* Hero 섹션 */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold">컴포넌트 예제</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Next.js Starter Kit에 포함된 다양한 UI 컴포넌트의 예제입니다. 각 탭에서 컴포넌트의
          다양한 변형과 사용 방법을 확인할 수 있습니다.
        </p>
      </section>

      {/* 탭 섹션 */}
      <section className="container mx-auto px-4 pb-20">
        <Tabs defaultValue="button" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            {exampleCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* 버튼 탭 */}
          <TabsContent value="button" className="mt-8 space-y-8">
            <div>
              <h2 className="mb-2 text-2xl font-semibold">버튼 컴포넌트</h2>
              <p className="text-muted-foreground">
                다양한 변형(variant)과 크기(size)의 버튼 예제입니다.
              </p>
            </div>

            {/* Default 버튼 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Default 버튼</CardTitle>
                <CardDescription>기본 스타일의 버튼</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="default">기본 버튼</Button>
                <Button variant="default" size="sm">
                  작은 버튼
                </Button>
                <Button variant="default" size="lg">
                  큰 버튼
                </Button>
                <Button variant="default" disabled>
                  비활성화
                </Button>
              </CardContent>
            </Card>

            {/* Secondary 버튼 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Secondary 버튼</CardTitle>
                <CardDescription>보조 스타일의 버튼</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="secondary">Secondary</Button>
                <Button variant="secondary" size="sm">
                  작은
                </Button>
                <Button variant="secondary" size="lg">
                  큰
                </Button>
                <Button variant="secondary" disabled>
                  비활성화
                </Button>
              </CardContent>
            </Card>

            {/* Outline 버튼 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Outline 버튼</CardTitle>
                <CardDescription>테두리 스타일의 버튼</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline">Outline</Button>
                <Button variant="outline" size="sm">
                  작은
                </Button>
                <Button variant="outline" size="lg">
                  큰
                </Button>
                <Button variant="outline" disabled>
                  비활성화
                </Button>
              </CardContent>
            </Card>

            {/* Ghost 버튼 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ghost 버튼</CardTitle>
                <CardDescription>투명한 스타일의 버튼</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="ghost">Ghost</Button>
                <Button variant="ghost" size="sm">
                  작은
                </Button>
                <Button variant="ghost" size="lg">
                  큰
                </Button>
                <Button variant="ghost" disabled>
                  비활성화
                </Button>
              </CardContent>
            </Card>

            {/* Destructive 버튼 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Destructive 버튼</CardTitle>
                <CardDescription>삭제/위험 작업용 버튼</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="destructive">삭제</Button>
                <Button variant="destructive" size="sm">
                  작은
                </Button>
                <Button variant="destructive" size="lg">
                  큰
                </Button>
                <Button variant="destructive" disabled>
                  비활성화
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 카드 탭 */}
          <TabsContent value="card" className="mt-8 space-y-8">
            <div>
              <h2 className="mb-2 text-2xl font-semibold">카드 컴포넌트</h2>
              <p className="text-muted-foreground">
                기본 카드 및 다양한 구조의 카드 예제입니다.
              </p>
            </div>

            {/* 기본 카드 */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">기본 카드</h3>
              <Card className="max-w-sm">
                <CardContent className="pt-6">
                  <p>이것은 기본적인 카드 컴포넌트입니다. 콘텐츠를 래핑합니다.</p>
                </CardContent>
              </Card>
            </div>

            {/* 헤더와 콘텐츠가 있는 카드 */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">헤더가 있는 카드</h3>
              <Card className="max-w-sm">
                <CardHeader>
                  <CardTitle>카드 제목</CardTitle>
                  <CardDescription>카드에 대한 설명입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>이것은 헤더와 콘텐츠가 있는 카드입니다.</p>
                </CardContent>
              </Card>
            </div>

            {/* 헤더, 콘텐츠, 푸터가 있는 카드 */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">헤더, 콘텐츠, 푸터가 있는 카드</h3>
              <Card className="max-w-sm">
                <CardHeader>
                  <CardTitle>완전한 카드</CardTitle>
                  <CardDescription>모든 요소를 포함하는 카드</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>이것은 헤더, 콘텐츠, 푸터를 모두 가진 카드입니다.</p>
                </CardContent>
                <div className="flex gap-2 border-t border-border p-6">
                  <Button size="sm" variant="outline">
                    취소
                  </Button>
                  <Button size="sm">확인</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* 배지 탭 */}
          <TabsContent value="badge" className="mt-8 space-y-8">
            <div>
              <h2 className="mb-2 text-2xl font-semibold">배지 컴포넌트</h2>
              <p className="text-muted-foreground">
                다양한 변형의 배지 컴포넌트 예제입니다.
              </p>
            </div>

            {/* Default 배지 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Default 배지</CardTitle>
                <CardDescription>기본 스타일의 배지</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="default">New</Badge>
                <Badge variant="default">Featured</Badge>
              </CardContent>
            </Card>

            {/* Secondary 배지 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Secondary 배지</CardTitle>
                <CardDescription>보조 스타일의 배지</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="secondary">Badge</Badge>
                <Badge variant="secondary">Example</Badge>
              </CardContent>
            </Card>

            {/* Destructive 배지 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Destructive 배지</CardTitle>
                <CardDescription>주의/삭제 관련 배지</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant="destructive">Urgent</Badge>
                <Badge variant="destructive">Critical</Badge>
                <Badge variant="destructive">Error</Badge>
              </CardContent>
            </Card>

            {/* Outline 배지 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Outline 배지</CardTitle>
                <CardDescription>테두리 스타일의 배지</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant="outline">Outline</Badge>
                <Badge variant="outline">Badge</Badge>
                <Badge variant="outline">Example</Badge>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 입력 탭 */}
          <TabsContent value="input" className="mt-8 space-y-8">
            <div>
              <h2 className="mb-2 text-2xl font-semibold">입력 필드 컴포넌트</h2>
              <p className="text-muted-foreground">
                다양한 상태의 입력 필드 예제입니다.
              </p>
            </div>

            {/* 기본 입력 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">기본 입력 필드</CardTitle>
                <CardDescription>일반적인 텍스트 입력</CardDescription>
              </CardHeader>
              <CardContent className="max-w-sm space-y-2">
                <Input placeholder="입력을 입력하세요" />
                <Input type="email" placeholder="이메일 주소" />
                <Input type="password" placeholder="비밀번호" />
              </CardContent>
            </Card>

            {/* 비활성화 입력 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">비활성화된 입력 필드</CardTitle>
                <CardDescription>입력할 수 없는 필드</CardDescription>
              </CardHeader>
              <CardContent className="max-w-sm">
                <Input placeholder="비활성화된 입력" disabled />
              </CardContent>
            </Card>

            {/* 오류 상태 입력 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">오류 상태의 입력 필드</CardTitle>
                <CardDescription>검증 오류가 있는 필드</CardDescription>
              </CardHeader>
              <CardContent className="max-w-sm space-y-2">
                <Input aria-invalid="true" placeholder="오류가 있는 입력" defaultValue="잘못된 값" />
                <p className="text-sm text-destructive">이 필드는 유효하지 않습니다.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 폼 탭 */}
          <TabsContent value="form" className="mt-8 space-y-8">
            <div>
              <h2 className="mb-2 text-2xl font-semibold">폼 요소</h2>
              <p className="text-muted-foreground">
                라벨, 입력, 설명으로 구성된 폼 요소 예제입니다.
              </p>
            </div>

            {/* 기본 폼 필드 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">기본 폼 필드</CardTitle>
              </CardHeader>
              <CardContent className="max-w-sm space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" placeholder="이름을 입력하세요" />
                  <p className="text-sm text-muted-foreground">
                    당신의 전체 이름을 입력해주세요.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 여러 폼 필드 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">전체 폼 예제</CardTitle>
              </CardHeader>
              <CardContent className="max-w-sm space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                  <p className="text-sm text-muted-foreground">최소 8자 이상이어야 합니다.</p>
                </div>
                <Button className="w-full">제출</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 다이얼로그 탭 */}
          <TabsContent value="dialog" className="mt-8 space-y-8">
            <div>
              <h2 className="mb-2 text-2xl font-semibold">다이얼로그 컴포넌트</h2>
              <p className="text-muted-foreground">모달 대화상자 컴포넌트의 예제입니다.</p>
            </div>

            {/* 기본 다이얼로그 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">기본 다이얼로그</CardTitle>
                <CardDescription>간단한 모달 대화상자</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">다이얼로그 열기</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>다이얼로그 제목</DialogTitle>
                      <DialogDescription>
                        이것은 다이얼로그의 설명입니다. 사용자에게 추가 정보를 제공하거나 확인을 요청할 수
                        있습니다.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        취소
                      </Button>
                      <Button onClick={() => setIsDialogOpen(false)}>확인</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* 확인 다이얼로그 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">확인 다이얼로그 예제</CardTitle>
                <CardDescription>확인 또는 취소를 요청하는 대화상자</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  위의 버튼을 클릭하여 다이얼로그를 열고 상호작용할 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 탭 탭 */}
          <TabsContent value="tabs" className="mt-8 space-y-8">
            <div>
              <h2 className="mb-2 text-2xl font-semibold">탭 컴포넌트</h2>
              <p className="text-muted-foreground">탭 네비게이션 컴포넌트의 예제입니다.</p>
            </div>

            {/* 기본 탭 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">기본 탭</CardTitle>
                <CardDescription>탭 네비게이션 예제</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tab1" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tab1">탭 1</TabsTrigger>
                    <TabsTrigger value="tab2">탭 2</TabsTrigger>
                    <TabsTrigger value="tab3">탭 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      첫 번째 탭의 콘텐츠입니다.
                    </p>
                  </TabsContent>
                  <TabsContent value="tab2" className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      두 번째 탭의 콘텐츠입니다.
                    </p>
                  </TabsContent>
                  <TabsContent value="tab3" className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      세 번째 탭의 콘텐츠입니다.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* 카드 형식의 탭 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">카드 형식의 탭</CardTitle>
                <CardDescription>다양한 구조의 탭 예제</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">계정</TabsTrigger>
                    <TabsTrigger value="settings">설정</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="mt-4 space-y-4">
                    <p className="text-sm text-muted-foreground">계정 정보를 관리합니다.</p>
                    <Button>프로필 수정</Button>
                  </TabsContent>
                  <TabsContent value="settings" className="mt-4 space-y-4">
                    <p className="text-sm text-muted-foreground">설정을 변경합니다.</p>
                    <Button variant="outline">설정 저장</Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </PageLayout>
  )
}
