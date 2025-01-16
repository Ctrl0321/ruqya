'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/seperator"
import { toast } from "@/components/ui/use-toast"

const profileFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    country: z.string(),
    timezone: z.string(),
    languages: z.array(z.string()),
    mobileNumber: z.string(),
    yearOfExperience: z.number().min(0, { message: "Must be a valid number." }),
    description: z.string(),
    firstTimeLogin: z.boolean(),
    age: z.number().min(1, { message: "Age must be a valid number." }),
});


const passwordFormSchema = z.object({
    currentPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

type ProfileFormValues = z.infer<typeof profileFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
    name: "Aathiq Ahamed",
    email: "aathiqahamed333@gmail.com",
    country: "Srilanka",
    timezone: "+5.30",
    languages: ["English", "Sinhala", "Tamil"],
    mobileNumber: "+94 788080001",
    yearOfExperience: 3,
    description: "software engineer",
    firstTimeLogin: true,
    age: 24,
};


export default function SettingsPage() {
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
    })

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    function onSubmitProfileForm(data: ProfileFormValues) {
        setIsUpdatingProfile(true)
        // Simulate API call
        setTimeout(() => {
            setIsUpdatingProfile(false)
            console.log(data)
            toast({
                title: "Profile updated",
                description: "Your profile has been updated successfully.",
            })
        }, 1000)
    }

    function onSubmitPasswordForm(data: PasswordFormValues) {
        setIsUpdatingPassword(true)
        // Simulate API call
        setTimeout(() => {
            setIsUpdatingPassword(false)
            console.log(data)
            toast({
                title: "Password changed",
                description: "Your password has been changed successfully.",
            })
            passwordForm.reset()
        }, 1000)
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            Update your personal information here. Click save when youre done.
                        </CardDescription>
                    </CardHeader>
                    <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onSubmitProfileForm)}>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={profileForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="timezone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Timezone</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="languages"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Languages</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="mobileNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="yearOfExperience"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Years of Experience</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={profileForm.control}
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Age</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isUpdatingProfile}>
                                    {isUpdatingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isUpdatingProfile ? "Saving..." : "Save Changes"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
                <Separator className="my-6" />
                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>
                            Update your password here. Youll need to enter your current password first.
                        </CardDescription>
                    </CardHeader>
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onSubmitPasswordForm)}>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={passwordForm.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={passwordForm.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={passwordForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm New Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isUpdatingPassword}>
                                    {isUpdatingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isUpdatingPassword ? "Changing Password..." : "Change Password"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

