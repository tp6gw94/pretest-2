import { useLiff } from './useLiff.ts';
import { routerPaths } from '../app/routerPaths.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Profile } from '../types/Profile.ts';

export const useAuth = () => {
  const navigate = useNavigate();
  const { ready, liff } = useLiff();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const isLoggedIn = ready ? liff.isLoggedIn() : undefined;
  const login = async () => {
    liff.login();
  };
  const logout = async () => {
    liff.logout();
    navigate(routerPaths.login);
  };

  useEffect(() => {
    if (!ready || !isLoggedIn) {
      return;
    }
    liff.getProfile().then(profile => setProfile(() => profile as Profile)).catch(e => console.log('fetch profile failed', e));
  }, [ready, isLoggedIn, liff]);

  return {
    login,
    logout,
    isLoggedIn,
    profile,
    ready
  };
};
