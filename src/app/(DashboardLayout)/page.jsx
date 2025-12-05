'use client';
import PageContainer from '@/app/components/shared/PageContainer';
import WelcomeCard from '../components/dashboard/WelcomeCard';

export default function Dashboard() {

  return (
    <PageContainer title={'Dashboard'} description={"This is dashboard page"}>
      <WelcomeCard />
    </PageContainer>
  );
}