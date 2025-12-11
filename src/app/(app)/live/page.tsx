"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, Send } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from "@/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, limit, doc, where } from "firebase/firestore";
import { formatDistanceToNow } from 'date-fns';
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Skeleton } from "@/components/ui/skeleton";
import imageData from "@/app/lib/placeholder-images.json";
import { cn } from "@/lib/utils";

interface ChatMessageData {
    id: string;
    userId: string;
    userName: string;
    message: string;
    timestamp: any;
}

const ChatMessage = ({ name, message, avatarSrc, avatarHint, timestamp, isUser }: { name: string; message: string; avatarSrc: string, avatarHint: string, timestamp: any, isUser?: boolean }) => {
    const timeAgo = timestamp ? formatDistanceToNow(timestamp.toDate(), { addSuffix: true }) : 'just now';
    
    return (
        <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                <Avatar className="h-8 w-8 border">
                    <AvatarImage src={avatarSrc} alt={`${name}'s avatar`} data-ai-hint={avatarHint} />
                    <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
                </Avatar>
            )}
            <div className={`flex flex-col max-w-[85%] rounded-lg px-3 py-2 ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <div className="flex items-center gap-2">
                    {!isUser && <p className="font-semibold text-primary text-sm">{name}</p>}
                    <p className={cn("text-xs", isUser ? "text-primary-foreground/80" : "text-muted-foreground/80")}>{timeAgo}</p>
                </div>
                <p className="leading-relaxed text-sm md:text-base">{message}</p>
            </div>
        </div>
    );
}

interface Contestant {
    id: string;
    name: string;
    bio: string;
    pictureUrl: string;
    fallback: string;
    imageHint: string;
}

interface Vote {
    id: string;
    contestantId: string;
    voteType: 'up' | 'down';
}

const ContestantCard = ({ contestant, onVote, user, disabled }: { contestant: Contestant, onVote: (id: string, type: 'up' | 'down') => void, user: any, disabled: boolean }) => {
    const firestore = useFirestore();
    
    const votesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'votes'), where('contestantId', '==', contestant.id));
    }, [firestore, contestant.id]);

    const { data: votes, isLoading } = useCollection<Vote>(votesQuery);

    const upVotes = useMemo(() => votes?.filter(v => v.voteType === 'up').length ?? 0, [votes]);
    const downVotes = useMemo(() => votes?.filter(v => v.voteType === 'down').length ?? 0, [votes]);
    
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
            <Avatar className="mb-4 h-20 w-20 border-2 border-transparent group-hover:border-primary sm:h-24 sm:w-24">
               <AvatarImage src={contestant.pictureUrl} alt={contestant.name} data-ai-hint={contestant.imageHint} />
               <AvatarFallback>{contestant.fallback}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">{contestant.name}</h3>
            <p className="text-sm text-muted-foreground">"{contestant.bio}"</p>
            <div className="mt-4 flex w-full justify-center gap-4">
                <Button variant="outline" size="icon" onClick={() => onVote(contestant.id, 'up')} disabled={!user || disabled}>
                    <ThumbsUp className="text-green-500" />
                </Button>
                 <div className="flex-grow text-center flex items-center justify-center gap-2">
                    {isLoading ? <Skeleton className="h-5 w-8" /> : <span className="font-bold text-green-500">{upVotes}</span>}
                    <span className="text-muted-foreground">/</span>
                    {isLoading ? <Skeleton className="h-5 w-8" /> : <span className="font-bold text-destructive">{downVotes}</span>}
                </div>
                <Button variant="outline" size="icon" onClick={() => onVote(contestant.id, 'down')} disabled={!user || disabled}>
                    <ThumbsDown className="text-destructive" />
                </Button>
            </div>
        </div>
    )
}

export default function LivePage() {
    const { t } = useLanguage();
    const { user } = useUser();
    const firestore = useFirestore();
    const [newMessage, setNewMessage] = useState("");
    const [votedContestants, setVotedContestants] = useState<Record<string, boolean>>({});
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const messagesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, "live_chat_messages"), orderBy("timestamp", "asc"), limit(50));
    }, [firestore]);

    const contestantsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, "contestants");
    }, [firestore]);

    const { data: messages, isLoading: messagesLoading } = useCollection<ChatMessageData>(messagesQuery);
    const { data: contestants, isLoading: contestantsLoading } = useCollection<Contestant>(contestantsQuery);
    
    const userDocRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, "users", user.uid);
    }, [user, firestore]);
    const { data: userProfile } = useDoc<{firstName: string}>(userDocRef);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !firestore || !userProfile || newMessage.trim() === "") return;

        addDocumentNonBlocking(collection(firestore, "live_chat_messages"), {
            userId: user.uid,
            userName: userProfile.firstName || 'Anonymous',
            message: newMessage.trim(),
            timestamp: serverTimestamp()
        });

        setNewMessage("");
    };
    
     const handleVote = (contestantId: string, voteType: 'up' | 'down') => {
        if (!user || !firestore) {
            console.log("User must be logged in to vote.");
            return;
        }

        setVotedContestants(prev => ({...prev, [contestantId]: true}));
        
        addDocumentNonBlocking(collection(firestore, 'votes'), {
            userId: user.uid,
            contestantId: contestantId,
            voteType: voteType,
            voteDate: serverTimestamp()
        });

        // Re-enable voting after a delay
        setTimeout(() => {
            setVotedContestants(prev => ({...prev, [contestantId]: false}));
        }, 5000);
    };
    
    useEffect(() => {
        const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            setTimeout(() => {
                viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
            }, 100);
        }
    }, [messages]);


    return (
        <div className="grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-8">
            <div className="flex flex-col gap-6 lg:col-span-2">
                <Card className="overflow-hidden">
                     <div className="relative flex aspect-video items-center justify-center bg-black">
                        <Image src={imageData.liveStreamBackground.src} fill alt="Live Stream" className="object-cover opacity-30" data-ai-hint={imageData.liveStreamBackground['data-ai-hint']} />
                         <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
                            <p className="mb-2 animate-pulse font-semibold uppercase tracking-widest text-primary">{t('live_now')}</p>
                            <h2 className="text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">{t('live_stream_title')}</h2>
                        </div>
                    </div>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline tracking-tight text-xl">{t('cast_your_vote')}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                        {contestantsLoading && (
                            <>
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
                                        <Skeleton className="mb-4 h-24 w-24 rounded-full" />
                                        <Skeleton className="h-6 w-32" />
                                        <Skeleton className="mt-2 h-4 w-40" />
                                        <div className="mt-4 flex gap-4">
                                            <Skeleton className="h-10 w-10" />
                                            <Skeleton className="h-10 w-10" />
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        {contestants && contestants.map(contestant => (
                            <ContestantCard
                                key={contestant.id}
                                contestant={contestant}
                                onVote={handleVote}
                                user={user}
                                disabled={votedContestants[contestant.id]}
                            />
                        ))}
                    </CardContent>
                </Card>
            </div>
            
            <div className="mt-6 flex h-full min-h-[500px] flex-col lg:col-span-1 lg:mt-0 lg:min-h-0 lg:max-h-[calc(100vh-theme(spacing.16))]">
                <Card className="flex h-full flex-1 flex-col">
                    <CardHeader>
                        <CardTitle className="font-headline tracking-tight text-xl">{t('live_chat')}</CardTitle>
                    </CardHeader>
                     <ScrollArea className="flex-1" ref={scrollAreaRef}>
                        <div className="space-y-4 px-4 sm:px-6 pb-4">
                             {messagesLoading && !messages && <div className="text-center text-muted-foreground">{t('loading_chat')}</div>}
                             {messages && messages.length === 0 && <ChatMessage name="System" message="Welcome to the live chat! Be the first to say something." avatarSrc={imageData.defaultAvatar.src} avatarHint={imageData.defaultAvatar['data-ai-hint']} timestamp={null} />}
                             {messages && messages.map(msg => {
                                const avatarData = imageData.userAvatars[msg.userId as keyof typeof imageData.userAvatars] || imageData.defaultAvatar;
                                return (
                                <ChatMessage 
                                    key={msg.id} 
                                    name={msg.userName} 
                                    message={msg.message} 
                                    avatarSrc={avatarData.src}
                                    avatarHint={avatarData['data-ai-hint']}
                                    timestamp={msg.timestamp}
                                    isUser={user?.uid === msg.userId}
                                />
                                )
                            })}
                        </div>
                    </ScrollArea>
                    <CardFooter className="border-t pt-4">
                        <form onSubmit={handleSendMessage} className="relative w-full">
                            <Input 
                                placeholder={user ? t('send_a_message') : 'Login to chat'}
                                className="pr-10 text-sm md:text-base"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                disabled={!user || !userProfile}
                            />
                            <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground hover:text-primary" disabled={!user || !userProfile || !newMessage.trim()}>
                                <Send className="h-4 w-4"/>
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
