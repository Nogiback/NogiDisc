// useLoginContext.ts
import { useContext } from 'react';
import { LoginContext } from '@/context/LoginContext';

export const useLoginContext = () => useContext(LoginContext);
