'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {storage} from "@/lib/storage";

export function useAuthRedirect(redirectTo = '/login') {
    const router = useRouter()

    useEffect(() => {
        const token = storage.getToken()
        if (!token) {
            router.replace(redirectTo)
        }
    }, [router, redirectTo])
}
