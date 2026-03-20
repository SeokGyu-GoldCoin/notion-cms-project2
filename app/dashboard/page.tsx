import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import {
  Users,
  Activity,
  TrendingUp,
  DollarSign,
  Plus,
} from 'lucide-react'

import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { StatCard } from '@/types'

const stats: StatCard[] = [
  {
    title: '총 사용자',
    value: '12,543',
    change: 12,
    icon: Users,
  },
  {
    title: '활성 세션',
    value: '1,234',
    change: 5,
    icon: Activity,
  },
  {
    title: '전환율',
    value: '3.24%',
    change: 0.8,
    icon: TrendingUp,
  },
  {
    title: '수익',
    value: '₩4,521,000',
    change: 18,
    icon: DollarSign,
  },
]

const recentActivities = [
  {
    id: 1,
    name: '김철수',
    action: '회원 가입',
    time: '2시간 전',
    avatar: 'KCS',
  },
  {
    id: 2,
    name: '이영희',
    action: '구매 완료',
    time: '4시간 전',
    avatar: 'LYH',
  },
  {
    id: 3,
    name: '박민준',
    action: '프로필 업데이트',
    time: '1일 전',
    avatar: 'PMJ',
  },
  {
    id: 4,
    name: '최지원',
    action: '댓글 작성',
    time: '1일 전',
    avatar: 'CJW',
  },
  {
    id: 5,
    name: '정준영',
    action: '파일 업로드',
    time: '2일 전',
    avatar: 'JJY',
  },
]

export default function DashboardPage() {
  const today = format(new Date(), 'yyyy년 M월 d일', { locale: ko })

  return (
    <PageLayout>
      <div className="container space-y-8 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
            <p className="text-muted-foreground">{today}</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            새 항목
          </Button>
        </div>

        {/* StatCard Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            const isPositive = stat.change > 0

            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span
                      className={isPositive ? 'text-green-600' : 'text-red-600'}
                    >
                      {isPositive ? '+' : ''}
                      {stat.change}%
                    </span>
                    {' '}지난달 대비
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="activity">활동</TabsTrigger>
            <TabsTrigger value="analytics">분석</TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* 최근 활동 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">최근 활동</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id}>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://avatar.vercel.sh/${activity.name}`} />
                          <AvatarFallback>{activity.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.action}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                      {activity.id !== recentActivities.length && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 빠른 액션 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">빠른 액션</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Button variant="outline" className="justify-start">
                      사용자 초대
                    </Button>
                    <Button variant="outline" className="justify-start">
                      보고서 생성
                    </Button>
                    <Button variant="outline" className="justify-start">
                      설정 변경
                    </Button>
                    <Button variant="outline" className="justify-start">
                      문서 보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 활동 탭 */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>활동 로그</CardTitle>
                <CardDescription>
                  실시간 활동 데이터 (미구현)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 분석 탭 */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>분석</CardTitle>
                <CardDescription>
                  자세한 분석 데이터 (미구현)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
