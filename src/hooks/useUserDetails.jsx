import { GetLoggedInUserAPI } from '@/axios/apis';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const loginRedirectURL = process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await GetLoggedInUserAPI();
        if (response.status === 200) {
          setUserDetails(response.data);
        } else {
          toast.error('Unauthorized Access!');
          router.push(loginRedirectURL);
        }
      } catch (err) {
        setError(err);
        toast.error('Session Expired! Redirecting...');
        router.push(loginRedirectURL);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [router, loginRedirectURL]);

  const CLIENT_ID = userDetails?.clientCompanyId || null;
  return { CLIENT_ID, userDetails, loading, error };
};

export default useUserDetails;