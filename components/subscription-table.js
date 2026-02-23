'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2 } from 'lucide-react';

const CATEGORY_COLORS = {
  Streaming: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
  SaaS: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  Utilities: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
  Fitness: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
  Other: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300',
};

export function SubscriptionTable({
  subscriptions,
  isRenewalDueSoon,
  onEdit,
  onDelete,
}) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-white">
              Name
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-white">
              Category
            </th>
            <th className="px-6 py-3 text-right font-semibold text-gray-900 dark:text-white">
              Cost
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-white">
              Cycle
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-white">
              Next Renewal
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-white">
              Status
            </th>
            <th className="px-6 py-3 text-right font-semibold text-gray-900 dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => {
            const dueSoon = isRenewalDueSoon(subscription.nextRenewal);
            return (
              <tr
                key={subscription.id}
                className={`border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                  dueSoon ? 'bg-red-50/50 dark:bg-red-950/20' : ''
                }`}
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {subscription.name}
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant="secondary"
                    className={CATEGORY_COLORS[subscription.category]}
                  >
                    {subscription.category}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(subscription.cost)}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 capitalize">
                  {subscription.billingCycle}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {formatDate(subscription.nextRenewal)}
                </td>
                <td className="px-6 py-4">
                  {dueSoon ? (
                    <Badge variant="destructive" className="bg-red-500 text-white">
                      Due Soon
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                    >
                      Active
                    </Badge>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(subscription)}
                      className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(subscription.id)}
                      className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
