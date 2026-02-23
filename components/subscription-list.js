'use client';

import { SubscriptionCard } from './subscription-card';
import { SubscriptionTable } from './subscription-table';
import { useIsMobile } from '@/hooks/use-mobile';

export function SubscriptionList({
  subscriptions,
  isRenewalDueSoon,
  onEdit,
  onDelete,
}) {
  const isMobile = useIsMobile();

  if (subscriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No subscriptions yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Add your first subscription to get started
        </p>
      </div>
    );
  }

  return (
    <div>
      {isMobile ? (
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              isRenewalDueSoon={isRenewalDueSoon}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <SubscriptionTable
          subscriptions={subscriptions}
          isRenewalDueSoon={isRenewalDueSoon}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
