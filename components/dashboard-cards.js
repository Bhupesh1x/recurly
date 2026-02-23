'use client';

import { Card } from '@/components/ui/card';

export function DashboardCards({
  monthlyCost,
  yearlyCost,
  activeCount,
  upcomingCount,
}) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const cards = [
    {
      title: 'Total Monthly Cost',
      value: formatCurrency(monthlyCost),
      icon: '📊',
    },
    {
      title: 'Total Yearly Cost',
      value: formatCurrency(yearlyCost),
      icon: '📈',
    },
    {
      title: 'Active Subscriptions',
      value: activeCount.toString(),
      icon: '✓',
    },
    {
      title: 'Upcoming Renewals',
      value: upcomingCount.toString(),
      icon: '🔔',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                {card.title}
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {card.value}
              </p>
            </div>
            <div className="text-3xl">{card.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
