
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/language-context";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

interface ArchiveVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  imageHint: string;
  duration: string;
  rating: number;
  isBonus: boolean;
  order: number;
}

export default function ArchivePage() {
  const { t } = useLanguage();
  const firestore = useFirestore();

  const archiveVideosQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "archive_videos"), orderBy("order", "desc"));
  }, [firestore]);

  const { data: archiveVideos, isLoading } = useCollection<ArchiveVideo>(archiveVideosQuery);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t('content_archive')}</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading && (
            [...Array(6)].map((_, i) => (
                <Card key={i} className="flex flex-col overflow-hidden">
                    <CardHeader className="relative p-0">
                        <Skeleton className="aspect-video w-full" />
                    </CardHeader>
                    <CardContent className="flex-1 p-4">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="mt-2 h-4 w-full" />
                        <Skeleton className="mt-1 h-4 w-2/3" />
                    </CardContent>
                    <CardFooter className="mt-auto flex items-center justify-between p-4 pt-0">
                        <Skeleton className="h-5 w-12" />
                        <Skeleton className="h-9 w-24 rounded-md" />
                    </CardFooter>
                </Card>
            ))
        )}
        {archiveVideos && archiveVideos.map((video) => (
          <Card key={video.id} className="group flex flex-col overflow-hidden">
            <CardHeader className="relative p-0">
              <Link href="#">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={400}
                  height={225}
                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={video.imageHint}
                />
              </Link>
              {video.isBonus && <Badge variant="destructive" className="absolute right-2 top-2">Bonus</Badge>}
               <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                    <Clock className="h-3 w-3" />
                    {video.duration}
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-4">
              <CardTitle className="leading-snug text-lg font-semibold transition-colors hover:text-primary">
                <Link href="#">{video.title}</Link>
              </CardTitle>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{video.description}</p>
            </CardContent>
            <CardFooter className="mt-auto flex items-center justify-between p-4 pt-0">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    <span>{video.rating}</span>
                </div>
              <Button asChild variant="secondary" size="sm">
                <Link href="#">{t('watch_now')}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
