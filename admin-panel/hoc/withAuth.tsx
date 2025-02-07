"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {useAuth} from "@/contexts/AuthContexts";

const withAuth = (WrappedComponent: React.FC, allowedRoles: string[]) => {
    return (props: any) => {
        const { user:currentUser } = useAuth();
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            console.log("Testing")
           if (currentUser){
               const token = localStorage.getItem("token");
               const role = currentUser?.role;
               console.log("lol",token,role)

               if (!token) {
                   console.log("No token")
                   router.push("/");
               }
               else if (!allowedRoles.includes(role as string)) {
                   router.push("/unauthorized");
               } else {
                   setLoading(false);
               }
           }

        }, [currentUser]);

        if (loading) return <p>Loadinggg...</p>;

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
