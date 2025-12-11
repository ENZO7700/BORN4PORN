"use client";

import { useMemo, useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/context/language-context";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import imageData from "@/app/lib/placeholder-images.json";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    notifications?: {
        liveNow: boolean;
        newContent: boolean;
        promotions: boolean;
        castingCalls: boolean;
    }
}

export default function AccountPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, "users", user.uid);
  }, [user, firestore]);

  const { data: userProfile, isLoading } = useDoc<UserProfile>(userDocRef);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);

  const [notifications, setNotifications] = useState({
    liveNow: true,
    newContent: true,
    promotions: false,
    castingCalls: false,
  });

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName || "");
      setLastName(userProfile.lastName || "");
      if (userProfile.notifications) {
          setNotifications(userProfile.notifications);
      }
    }
  }, [userProfile]);

  const handleProfileSave = async () => {
      if (!userDocRef) return;
      setIsSavingProfile(true);
      try {
          await updateDoc(userDocRef, {
              firstName: firstName,
              lastName: lastName
          });
          toast({
              title: "Success",
              description: "Your profile has been updated.",
          });
      } catch (error) {
          console.error("Error updating profile:", error);
          toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to update your profile. Please try again.",
          });
      } finally {
          setIsSavingProfile(false);
      }
  }
  
  const handleNotificationsSave = async () => {
    if (!userDocRef) return;
    setIsSavingNotifications(true);
    try {
        await updateDoc(userDocRef, {
            notifications: notifications
        });
        toast({
            title: "Success",
            description: "Your notification preferences have been saved.",
        });
    } catch (error) {
        console.error("Error updating notifications:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to save your preferences. Please try again.",
        });
    } finally {
        setIsSavingNotifications(false);
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('account_settings_title')}</h1>
        <p className="mt-1 text-muted-foreground">{t('account_settings_desc')}</p>
      </div>
      <Separator />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
            <Card>
            <CardHeader>
                <CardTitle className="font-headline tracking-tight text-xl">{t('profile_info')}</CardTitle>
                <CardDescription>{t('profile_info_desc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {isLoading ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2"><Skeleton className="h-6 w-20" /><Skeleton className="h-10 w-full" /></div>
                            <div className="space-y-2"><Skeleton className="h-6 w-20" /><Skeleton className="h-10 w-full" /></div>
                        </div>
                        <div className="space-y-2"><Skeleton className="h-6 w-12" /><Skeleton className="h-10 w-full" /></div>
                    </div>
                ) : (
                <>
                    <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={imageData.userAvatar.src} alt="User avatar" data-ai-hint={imageData.userAvatar['data-ai-hint']} />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Button variant="outline">{t('change')}</Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">{t('first_name')}</Label>
                        <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">{t('last_name')}</Label>
                        <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input id="email" type="email" defaultValue={userProfile?.email || ''} disabled />
                    </div>
                </>
                )}
            </CardContent>
            <CardFooter>
                <Button onClick={handleProfileSave} disabled={isSavingProfile || isLoading}>
                    {isSavingProfile ? "Saving..." : t('save_changes')}
                </Button>
            </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="font-headline tracking-tight text-xl">{t('notifications')}</CardTitle>
                <CardDescription>{t('notifications_desc')}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                        <Switch id="live-now" checked={notifications.liveNow} onCheckedChange={(checked) => setNotifications(p => ({...p, liveNow: checked}))} />
                        <Label htmlFor="live-now" className="cursor-pointer">{t('live_now_alerts')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="new-content" checked={notifications.newContent} onCheckedChange={(checked) => setNotifications(p => ({...p, newContent: checked}))} />
                        <Label htmlFor="new-content" className="cursor-pointer">{t('new_content_added')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="promotions" checked={notifications.promotions} onCheckedChange={(checked) => setNotifications(p => ({...p, promotions: checked}))} />
                        <Label htmlFor="promotions" className="cursor-pointer">{t('promotions')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="casting-calls" checked={notifications.castingCalls} onCheckedChange={(checked) => setNotifications(p => ({...p, castingCalls: checked}))} />
                        <Label htmlFor="casting-calls" className="cursor-pointer">{t('new_casting_calls')}</Label>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button onClick={handleNotificationsSave} disabled={isSavingNotifications || isLoading}>
                        {isSavingNotifications ? "Saving..." : t('save_preferences')}
                    </Button>
                </CardFooter>
            </Card>
        </div>
        
        <div className="lg:col-span-1">
            <Card>
            <CardHeader>
                <CardTitle className="font-headline tracking-tight text-xl">{t('subscription')}</CardTitle>
                <CardDescription>{t('subscription_desc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-medium">{t('current_plan')}: <span className="font-semibold text-primary">{t('all_access')}</span></h4>
                    <p className="text-sm text-muted-foreground">{t('renews_on')} July 30, 2024.</p>
                </div>
                <Separator />
                <div className="space-y-3">
                    <h4 className="font-medium">{t('payment_methods')}</h4>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                        <p className="text-sm font-medium">Visa **** 4242</p>
                        <Button variant="outline" size="sm">{t('update')}</Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                        <p className="text-sm font-medium">Crypto 0x...1234</p>
                        <Button variant="outline" size="sm">{t('change')}</Button>
                    </div>
                     <Button variant="outline" className="w-full">{t('add_payment_method')}</Button>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-4">
                <Button variant="secondary" className="w-full">{t('upgrade_plan')}</Button>
                 <Button variant="link" className="p-0 h-auto text-sm text-destructive hover:text-red-400">{t('cancel_subscription')}</Button>
            </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  )
}
