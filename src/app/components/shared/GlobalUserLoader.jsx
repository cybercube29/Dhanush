'use client';

import { getLoggedInUserDetails } from '@/store/userDetails/thunk';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function GlobalUserLoader() {
    const dispatch = useDispatch();
    const { isLoaded } = useSelector(state => state.UserDetails);

    useEffect(() => {
        if (!isLoaded) {
            dispatch(getLoggedInUserDetails());
        }
    }, [dispatch, isLoaded]);

    return null;
}