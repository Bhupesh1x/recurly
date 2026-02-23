# Recurly - Subscription Manager

A modern, production-ready web application for managing your subscriptions, tracking renewal dates, and monitoring monthly/yearly expenses.

## Features

- **Dashboard Overview**: See your total monthly cost, yearly cost, active subscriptions, and upcoming renewals at a glance
- **Add/Edit/Delete Subscriptions**: Manage your subscriptions with a simple, intuitive interface
- **Smart Filtering**: Filter by status (All, Monthly, Yearly, Upcoming), search by name, and filter by category
- **Renewal Alerts**: Visual highlighting for subscriptions renewing within 3 days
- **CSV Export**: Export your subscription data to CSV format for backup or analysis
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Full dark mode compatibility
- **Persistent Storage**: Your subscriptions are saved locally and persist between sessions

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.17.0 or later) - [Download](https://nodejs.org/)
- **npm** or **pnpm** (comes with Node.js) - We recommend pnpm for faster installation

## Installation

### Step 1: Clone or Download the Project

If you have the project files, navigate to the project directory:

```bash
cd recurly
```

### Step 2: Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

This will install all required dependencies including:
- Next.js
- React
- Tailwind CSS
- shadcn/ui components
- date-fns (for date formatting)
- lucide-react (for icons)

### Step 3: Run the Development Server

Using pnpm:
```bash
pnpm dev
```

Or using npm:
```bash
npm run dev
```

The application will start on `http://localhost:3000` by default.

Open your browser and navigate to `http://localhost:3000` to see your Recurly dashboard!

## Project Structure

```
recurly-subscription-manager/
├── app/
│   ├── page.js                    # Main dashboard page
│   ├── layout.tsx                 # Root layout with metadata
│   └── globals.css                # Global styles and Tailwind config
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── add-subscription-dialog.js # Form for adding/editing subscriptions
│   ├── dashboard-cards.js         # Summary cards (totals, active, upcoming)
│   ├── delete-dialog.js           # Confirmation dialog for deletion
│   ├── filters.js                 # Search, filter, and export controls
│   ├── subscription-card.js       # Mobile card view for subscriptions
│   ├── subscription-list.js       # Responsive wrapper (cards on mobile, table on desktop)
│   ├── subscription-table.js      # Desktop table view
│   └── use-toast.js               # Toast notification hook
├── hooks/
│   └── use-subscriptions.js       # Custom hook for subscription state management
├── lib/
│   ├── csv-export.js              # CSV export utility
│   └── utils.ts                   # Utility functions
├── public/                         # Static assets
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
└── next.config.mjs                 # Next.js configuration
```

## Usage Guide

### Adding a Subscription

1. Click the **"Add Subscription"** button in the top right
2. Fill in the subscription details:
   - **Name**: The service name (e.g., "Netflix", "Spotify")
   - **Price**: The cost per billing cycle
   - **Billing Cycle**: Choose Monthly or Yearly
   - **Category**: Select a category (Entertainment, Productivity, Utilities, etc.)
   - **Next Renewal Date**: When the subscription will renew
3. Click **"Add"** to save the subscription

### Editing a Subscription

1. Click the **edit icon** (pencil) on any subscription card or table row
2. Modify the details in the dialog
3. Click **"Update"** to save changes

### Deleting a Subscription

1. Click the **delete icon** (trash) on any subscription
2. Confirm the deletion in the dialog
3. The subscription will be removed immediately

### Filtering and Searching

- **Search**: Type in the search box to find subscriptions by name
- **Status Filter**: Use the dropdown to filter by All, Monthly, Yearly, or Upcoming (within 7 days)
- **Category Filter**: Filter subscriptions by category
- **Export**: Click the export button to download all filtered subscriptions as CSV

### Understanding the Dashboard

- **Monthly Cost**: Sum of all subscriptions with monthly billing cycles (+ yearly costs divided by 12)
- **Yearly Cost**: Sum of all subscriptions with yearly billing cycles (+ monthly costs multiplied by 12)
- **Active Subscriptions**: Total count of all subscriptions
- **Upcoming Renewals**: Count of subscriptions renewing within 7 days

## Data Storage

All subscription data is stored locally in your browser's localStorage. This means:
- Your data persists between sessions
- No data is sent to any server
- Your data remains private and on your device
- Clearing browser data will delete your subscriptions

**Backup Tip**: Regularly export your subscriptions to CSV as a backup.

## Available Scripts

In the project directory, you can run:

### `pnpm dev` or `npm run dev`
Runs the app in development mode with hot reload.

### `pnpm build` or `npm run build`
Builds the app for production.

### `pnpm start` or `npm start`
Runs the built app in production mode.

### `pnpm lint` or `npm run lint`
Runs the ESLint linter.

## Technologies Used

- **Next.js 16**: React framework for production
- **React 19**: UI library
- **TypeScript**: Type safety (optional, used in some files)
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **date-fns**: Date formatting and manipulation
- **lucide-react**: Icon library
- **Radix UI**: Accessible component primitives

## Browser Support

Recurly works on all modern browsers that support:
- ES6+ JavaScript
- localStorage API
- CSS Grid and Flexbox

Tested on:
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port 3000 is already in use

If port 3000 is in use, you can specify a different port:
```bash
pnpm dev -- -p 3001
```

### Dependencies not installing

Try clearing the cache and reinstalling:
```bash
# For pnpm
pnpm store prune
pnpm install

# For npm
npm cache clean --force
npm install
```

### Subscriptions not saving

Check your browser's localStorage settings:
- Ensure localStorage is enabled
- Check if your browser is in private/incognito mode (localStorage may be disabled)
- Try a different browser to isolate the issue

### Styling issues

If Tailwind CSS styles aren't applying:
1. Make sure you're running `pnpm dev` or `npm run dev`
2. Try a hard refresh (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)
3. Clear your browser cache

## Building for Production

To create an optimized production build:

```bash
pnpm build
pnpm start
```

Or with npm:
```bash
npm run build
npm start
```

The production build will be optimized for performance and ready to deploy.

---

**Happy tracking!** 🚀

Manage your subscriptions efficiently with Recurly.
