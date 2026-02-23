'use client';

import { Card } from '@/components/ui/card';
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

export function SubscriptionCard({
  subscription,
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

  const dueSoon = isRenewalDueSoon(subscription.nextRenewal);
  const borderClass = dueSoon ? 'border-red-300 dark:border-red-800' : '';

  return (
    <Card
      className={`p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all ${borderClass}`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {subscription.name}
            </h3>
            <Badge
              variant="secondary"
              className={`mt-2 ${CATEGORY_COLORS[subscription.category]}`}
            >
              {subscription.category}
            </Badge>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(subscription.cost)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              /{subscription.billingCycle}
            </p>
          </div>
        </div>

        {/* Renewal Info */}
        <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-800">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Next Renewal
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {formatDate(subscription.nextRenewal)}
            </p>
          </div>
          {dueSoon && (
            <Badge variant="destructive" className="bg-red-500 text-white">
              Due Soon
            </Badge>
          )}
        </div>

        {/* Notes */}
        {subscription.notes && (
          <div className="py-3 border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Notes
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {subscription.notes}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(subscription)}
            className="flex-1 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer!"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(subscription.id)}
            className="flex-1 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
