export function exportToCSV(subscriptions, filename = 'recurly-subscriptions.csv') {
  if (!subscriptions || subscriptions.length === 0) {
    return;
  }

  // Define CSV headers
  const headers = [
    'Name',
    'Cost',
    'Billing Cycle',
    'Category',
    'Next Renewal',
    'Notes',
    'Created At',
  ];

  // Convert subscriptions to CSV rows
  const rows = subscriptions.map((sub) => [
    `"${sub.name}"`,
    sub.cost,
    sub.billingCycle,
    sub.category,
    sub.nextRenewal,
    `"${sub.notes || ''}"`,
    sub.createdAt,
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object
  URL.revokeObjectURL(url);
}
