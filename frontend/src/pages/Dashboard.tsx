import LogoutButton from '@/components/LogoutButton';
import React from 'react';

export default function Dashboard() {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-4'>
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  );
}
