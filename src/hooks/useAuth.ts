import { useLiff } from './useLiff.ts';
import { routerPaths } from '../app/routerPaths.ts';
import { useNavigate } from 'react-router-dom';
import { Profile } from '../types/Profile.ts';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const navigate = useNavigate();
  const { ready, liff } = useLiff();
  const isLoggedIn = ready ? liff.isLoggedIn() : undefined;
  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  const login = async () => {
    liff.login();
  };
  const logout = async () => {
    liff.logout();
    navigate(routerPaths.login);
  };


  useEffect(() => {
    const getProfile = async () => {
      if (!isLoggedIn) return;
      const p = await liff.getProfile() as Profile;
      setProfile(p);
    };

    getProfile();
  }, [isLoggedIn, liff, ready]);

  return {
    login,
    logout,
    isLoggedIn,
    ready,
    profile
  };
};
