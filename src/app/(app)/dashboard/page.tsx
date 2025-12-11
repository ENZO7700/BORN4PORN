"use client";

import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useLanguage } from "@/context/language-context";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, limit } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import imageData from "@/app/lib/placeholder-images.json";
import { useState, useEffect } from "react";

interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    registrationDate?: any;
}

export default function Dashboard() {
  const { t } = useLanguage();
  const firestore = useFirestore();
  const [liveViewers, setLiveViewers] = useState(1574);

  const usersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, "users");
  }, [firestore]);

  const recentUsersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "users"), limit(5));
  }, [firestore]);

  const { data: allUsers, isLoading: isLoadingAllUsers } = useCollection<UserProfile>(usersQuery);
  const { data: recentUsers, isLoading: isLoadingRecentUsers } = useCollection<UserProfile>(recentUsersQuery);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(prev => Math.max(200, prev + Math.floor(Math.random() * 21) - 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full flex-col gap-4 md:gap-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('total_revenue')}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% {t('from_last_month')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('subscriptions')}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoadingAllUsers ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold">+{allUsers?.length || 0}</div>}
              <p className="text-xs text-muted-foreground">
                +18.1% {t('from_last_month')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('ppv_sales')}</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% {t('from_last_month')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('live_viewers')}</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary animate-pulse">{liveViewers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {t('currently_watching')}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle className="font-headline tracking-tight text-xl">{t('recent_transactions')}</CardTitle>
                <CardDescription>
                  {t('recent_transactions_desc')}
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  {t('view_all')}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('customer')}</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      {t('type')}
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      {t('status')}
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      {t('date')}
                    </TableHead>
                    <TableHead className="text-right">{t('amount')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      PPV
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="outline">
                        {t('approved')}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">€29.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Olivia Smith</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        olivia@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {t('subscriptions')}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="outline">
                         {t('approved')}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      2023-06-24
                    </TableCell>
                    <TableCell className="text-right">€19.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Noah Williams</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        noah@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {t('subscriptions')}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="outline">
                         {t('approved')}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      2023-06-25
                    </TableCell>
                    <TableCell className="text-right">€19.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Emma Brown</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        emma@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      PPV
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="outline">
                         {t('approved')}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      2023-06-26
                    </TableCell>
                    <TableCell className="text-right">€29.99</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline tracking-tight text-xl">{t('recent_subscribers')}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {isLoadingRecentUsers && (
                    <>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <Skeleton className="hidden h-9 w-9 sm:flex rounded-full" />
                                <div className="grid gap-1 flex-1">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                                <Skeleton className="h-4 w-12" />
                            </div>
                        ))}
                    </>
                )}
                {recentUsers && recentUsers.map(user => (
                    <div key={user.id} className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={imageData.userAvatars[user.id as keyof typeof imageData.userAvatars]?.src || imageData.defaultAvatar.src} alt={`${user.firstName} avatar`} data-ai-hint={imageData.userAvatars[user.id as keyof typeof imageData.userAvatars]?.['data-ai-hint'] || imageData.defaultAvatar['data-ai-hint']} />
                        <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                        </div>
                        <div className="ml-auto font-medium">+€19.99</div>
                    </div>
                ))}
            </CardContent>
          </Card>
        </div>
    </div>
  )
}
