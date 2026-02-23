'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'recurly_subscriptions';

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSubscriptions(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load subscriptions:', error);
        setSubscriptions([]);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever subscriptions change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
    }
  }, [subscriptions, isLoading]);

  const addSubscription = useCallback((subscription) => {
    const newSubscription = {
      ...subscription,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setSubscriptions((prev) => [newSubscription, ...prev]);
    return newSubscription;
  }, []);

  const updateSubscription = useCallback((id, updates) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, ...updates } : sub))
    );
  }, []);

  const deleteSubscription = useCallback((id) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  }, []);

  const calculateMonthlyCost = useCallback(() => {
    return subscriptions.reduce((total, sub) => {
      const monthlyAmount =
        sub.billingCycle === 'monthly' ? sub.cost : sub.cost / 12;
      return total + monthlyAmount;
    }, 0);
  }, [subscriptions]);

  const calculateYearlyCost = useCallback(() => {
    return subscriptions.reduce((total, sub) => {
      const yearlyAmount =
        sub.billingCycle === 'yearly' ? sub.cost : sub.cost * 12;
      return total + yearlyAmount;
    }, 0);
  }, [subscriptions]);

  const getActiveSubscriptionsCount = useCallback(() => {
    return subscriptions.length;
  }, [subscriptions]);

  const getUpcomingRenewalsCount = useCallback(() => {
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return subscriptions.filter((sub) => {
      const renewalDate = new Date(sub.nextRenewal);
      return renewalDate >= now && renewalDate <= sevenDaysFromNow;
    }).length;
  }, [subscriptions]);

  const getUpcomingRenewals = useCallback(() => {
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return subscriptions
      .filter((sub) => {
        const renewalDate = new Date(sub.nextRenewal);
        return renewalDate >= now && renewalDate <= sevenDaysFromNow;
      })
      .sort(
        (a, b) =>
          new Date(a.nextRenewal).getTime() - new Date(b.nextRenewal).getTime()
      );
  }, [subscriptions]);

  const isRenewalDueSoon = useCallback((nextRenewalDate) => {
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const renewalDate = new Date(nextRenewalDate);

    return renewalDate >= now && renewalDate <= threeDaysFromNow;
  }, []);

  return {
    subscriptions,
    isLoading,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    calculateMonthlyCost,
    calculateYearlyCost,
    getActiveSubscriptionsCount,
    getUpcomingRenewalsCount,
    getUpcomingRenewals,
    isRenewalDueSoon,
  };
}
