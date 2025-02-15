import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getLimits } from '../service/limits.service';

export interface Limits {
  min: number;
  max: number;
  currency?: string;
}

export const LimitsContext = createContext<Limits | null>(null);

export const LimitsProvider = ({ children }: { children: ReactNode }) => {
  const [limits, setLimits] = useState<Limits>({ min: 0, max: 0, currency: '' });

  useEffect(() => {
    getLimits().then((data: Limits) => setLimits(data));
  }, []);

  return <LimitsContext.Provider value={{ ...limits }}>{children}</LimitsContext.Provider>;
};

export const useLimits = (): Limits => {
  const context = useContext(LimitsContext);
  if (!context) {
    throw new Error('useLimits must be used within a LimitsProvider');
  }
  return context;
};
