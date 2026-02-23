'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSubscriptions } from '@/hooks/use-subscriptions';
import { DashboardCards } from '@/components/dashboard-cards';
import { Filters } from '@/components/filters';
import { SubscriptionList } from '@/components/subscription-list';
import { AddSubscriptionDialog } from '@/components/add-subscription-dialog';
import { DeleteDialog } from '@/components/delete-dialog';
import { exportToCSV } from '@/lib/csv-export';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const { toast } = useToast();
  const {
    subscriptions,
    isLoading,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    calculateMonthlyCost,
    calculateYearlyCost,
    getActiveSubscriptionsCount,
    getUpcomingRenewalsCount,
    isRenewalDueSoon,
  } = useSubscriptions();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteTargetName, setDeleteTargetName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Prevent hydration errors
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditingSubscription(null);
    setDialogOpen(true);
  }, []);

  const handleEditClick = useCallback((subscription) => {
    setEditingSubscription(subscription);
    setDialogOpen(true);
  }, []);

  const handleDialogSubmit = useCallback(
    (formData) => {
      if (editingSubscription) {
        updateSubscription(editingSubscription.id, formData);
        toast({
          title: 'Success',
          description: `${formData.name} updated successfully`,
        });
      } else {
        addSubscription(formData);
        toast({
          title: 'Success',
          description: `${formData.name} added successfully`,
        });
      }
      setDialogOpen(false);
      setEditingSubscription(null);
    },
    [editingSubscription, addSubscription, updateSubscription, toast]
  );

  // Filter subscriptions - moved before handleExport to avoid initialization error
  const filteredSubscriptions = useMemo(() => {
    let result = subscriptions;

    // Search filter
    if (searchTerm) {
      result = result.filter((sub) =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((sub) => sub.category === selectedCategory);
    }

    // Status filter
    if (selectedFilter === 'monthly') {
      result = result.filter((sub) => sub.billingCycle === 'monthly');
    } else if (selectedFilter === 'yearly') {
      result = result.filter((sub) => sub.billingCycle === 'yearly');
    } else if (selectedFilter === 'upcoming') {
      const now = new Date();
      const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      result = result.filter((sub) => {
        const renewalDate = new Date(sub.nextRenewal);
        return renewalDate >= now && renewalDate <= sevenDaysFromNow;
      });
    }

    return result;
  }, [subscriptions, searchTerm, selectedFilter, selectedCategory]);

  const handleDeleteClick = useCallback((subscriptionId) => {
    const sub = subscriptions.find((s) => s.id === subscriptionId);
    if (sub) {
      setDeleteTargetId(subscriptionId);
      setDeleteTargetName(sub.name);
      setDeleteDialogOpen(true);
    }
  }, [subscriptions]);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteTargetId) {
      deleteSubscription(deleteTargetId);
      toast({
        title: 'Success',
        description: `${deleteTargetName} deleted successfully`,
      });
      setDeleteDialogOpen(false);
      setDeleteTargetId(null);
      setDeleteTargetName('');
    }
  }, [deleteTargetId, deleteTargetName, deleteSubscription, toast]);

  const handleExport = useCallback(() => {
    try {
      exportToCSV(filteredSubscriptions);
      toast({
        title: 'Success',
        description: 'Subscriptions exported to CSV',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to export CSV',
        variant: 'destructive',
      });
    }
  }, [filteredSubscriptions, toast]);

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-r-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const monthlyCost = calculateMonthlyCost();
  const yearlyCost = calculateYearlyCost();
  const activeCount = getActiveSubscriptionsCount();
  const upcomingCount = getUpcomingRenewalsCount();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Recurly
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all your subscriptions in one place
          </p>
        </div>

        {/* Dashboard Cards */}
        <DashboardCards
          monthlyCost={monthlyCost}
          yearlyCost={yearlyCost}
          activeCount={activeCount}
          upcomingCount={upcomingCount}
        />

        {/* Filters */}
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onAddClick={handleAddClick}
          onExportClick={handleExport}
        />

        {/* Subscription List */}
        <SubscriptionList
          subscriptions={filteredSubscriptions}
          isRenewalDueSoon={isRenewalDueSoon}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Add/Edit Dialog */}
      <AddSubscriptionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleDialogSubmit}
        initialData={editingSubscription}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        subscriptionName={deleteTargetName}
      />
    </main>
  );
}
