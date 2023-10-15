import axios, { AxiosRequestConfig } from "axios"
import { useRouter } from "next/navigation"

interface AuthFetchProps {
    endpoint: string
    redirectRouter: string
    formData: any
    options?: AxiosRequestConfig<any>
}

export function useAuthFetch() {
    const router = useRouter()
    const authRouter = async ({
        endpoint,
        formData,
        redirectRouter,
        options
    }: AuthFetchProps) => {
        try {   
            const { data } = await axios.post(`/api/auth/${endpoint}`, formData, options)
            if (redirectRouter) { router.push(redirectRouter) }
        } catch (error) {
            router.push("/")
        }
    }

    return authRouter
}