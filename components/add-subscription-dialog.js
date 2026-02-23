'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from 'lucide-react';

const CATEGORIES = [
  'Streaming',
  'SaaS',
  'Utilities',
  'Fitness',
  'Other',
];

const BILLING_CYCLES = ['monthly', 'yearly'];

export function AddSubscriptionDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      cost: '',
      billingCycle: 'monthly',
      category: 'SaaS',
      nextRenewal: '',
      notes: '',
    }
  );

  useEffect(() =>  {
    if(!initialData) return;

    setFormData(initialData);
  }, [initialData])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'cost' ? parseFloat(value) || '' : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a subscription name',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.cost || formData.cost <= 0) {
      toast({
        title: 'Error',
        description: 'Please enter a valid cost',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.nextRenewal) {
      toast({
        title: 'Error',
        description: 'Please select a renewal date',
        variant: 'destructive',
      });
      return;
    }

    onSubmit(formData);
    setFormData({
      name: '',
      cost: '',
      billingCycle: 'monthly',
      category: 'SaaS',
      nextRenewal: '',
      notes: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {initialData ? 'Edit Subscription' : 'Add Subscription'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Subscription Name
            </label>
            <Input
              type="text"
              name="name"
              placeholder="e.g., Netflix, Spotify"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Cost */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Cost ($)
            </label>
            <Input
              type="number"
              name="cost"
              placeholder="0.00"
              value={formData.cost}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Billing Cycle */}
          <div className="space-y-2 w-full">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Billing Cycle
            </label>
            <Select
              value={formData.billingCycle}
              onValueChange={(value) =>
                handleSelectChange('billingCycle', value)
              }
            >
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                {BILLING_CYCLES.map((cycle) => (
                  <SelectItem key={cycle} value={cycle}>
                    {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2 w-full">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Next Renewal */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Next Renewal Date
            </label>
            <div className="relative">
              <Input
                type="date"
                name="nextRenewal"
                value={formData.nextRenewal}
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Notes (optional)
            </label>
            <textarea
              name="notes"
              placeholder="Add any notes about this subscription..."
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-200 dark:border-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {initialData ? 'Update' : 'Add'} Subscription
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
