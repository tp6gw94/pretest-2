import { useEffect, useState } from 'react';
import liff from '@line/liff';

const liffId = import.meta.env.VITE_LIFF_ID;
liff.init({
  liffId
});

export const useLiff = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const liffReady = async () => {
      await liff.ready;
      setReady(true);
    };
    liffReady();
  }, []);

  return {
    ready,
    liff
  };
};
