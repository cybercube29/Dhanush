"use client";
import useUserDetails from "@/hooks/useUserDetails";
import { ThemeSettings } from "@/utils/theme/Theme";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import RTL from "./(DashboardLayout)/layout/customizer/RTL";

const MyApp = ({ children }) => {
    const theme = ThemeSettings();
    const customizer = useSelector((state) => state.customizer);

    const searchParams = useSearchParams();
    // const token = searchParams.get("token");
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZW1vYWRtaW4iLCJyb2xlcyI6IkNMSUVOVF9BRE1JTiIsImV4cCI6MTc2NDk1NzAxOCwiaWF0IjoxNzY0OTIxMDE4fQ.TSoJZ6DAEb_-jjE0adef6mW8qwEGU0Md-B09nKKAUXQ'
    if (token) {
        localStorage.setItem('token', token);
    }
    const { userDetails, loading } = useUserDetails();
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    useEffect(() => {
        if (!loading) {
            if (userDetails === null) {
                setTimeout(() => {
                    router.push(process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL);
                }, 5000);
            } else {
                setIsCheckingAuth(false);
            }
        }
    }, [loading, userDetails, router]);

    if (isCheckingAuth) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Toaster />
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <ThemeProvider theme={theme}>
                    <RTL direction={customizer.activeDir}>
                        <CssBaseline />
                        {children}
                    </RTL>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </>
    );
};

export default MyApp;