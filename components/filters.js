'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Download } from 'lucide-react';

const CATEGORIES = [
  'Streaming',
  'SaaS',
  'Utilities',
  'Fitness',
  'Other',
];

const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'upcoming', label: 'Upcoming' },
];

export function Filters({
  searchTerm,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  selectedCategory,
  onCategoryChange,
  onAddClick,
  onExportClick,
}) {
  return (
    <div className="space-y-4 mb-8">
      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Search subscriptions..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        />
        <Button
          onClick={onAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Subscription
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={selectedFilter} onValueChange={onFilterChange}>
          <SelectTrigger className="sm:w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            {FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCategory || 'all-categories'} onValueChange={(value) => {
          onCategoryChange(value === 'all-categories' ? '' : value);
        }}>
          <SelectTrigger className="sm:w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectItem value="all-categories">All Categories</SelectItem>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={onExportClick}
          variant="outline"
          className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}
