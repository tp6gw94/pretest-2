import Layout from '../components/Layout.tsx';
import { useAuth } from '../hooks/useAuth.ts';
import Spinners from '../components/Spinners.tsx';
import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  const { profile } = useAuth();

  if (!profile) {
    return <Spinners fullpage />;
  }

  return (
    <Layout>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="d-flex flex-column align-items-center">
        <img src={profile.pictureUrl} alt="user picture" className="avatar mt-4" />
        <h4 className="mt-4">{profile.displayName}</h4>
      </div>
    </Layout>
  );

}
