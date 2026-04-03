# Super Ecom — E-Commerce Frontend

A basic e-commerce web application built with React, TypeScript, and React Router v6. Users can browse products, filter by category, view product details, and manage a shopping cart.

## Deployment

**Live URL:** [Paste your deployment link here]

## Setup & Run

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run end-to-end tests (requires Playwright browsers installed)
npx playwright install chromium
npm run test:e2e
```

The app runs at **http://localhost:3000** by default.

## Features

- **Product Listing** — Grid of products fetched from the API with multi-category filtering.
- **Category Filter** — Multi-select category chips that persist in the URL via search params. Works across refresh, back button, and shared links.
- **Product Detail** — Full product info fetched dynamically from the API by product ID (`/product/:id`).
- **Cart** — Add items from the detail page, remove items from the cart page. Cart count displayed in the navbar with a badge.
- **Cart Persistence** — Cart state is saved to localStorage and survives page refreshes.
- **Navigation** — Navbar with links to Home and Cart. Back-to-Home link on product detail page.
- **Responsive** — Fluid flexbox layout that adapts to all screen sizes.
- **Animations** — Fade-in on product detail page, hover effects on product cards, Add-to-Cart button feedback.
- **Accessibility** — Semantic HTML (`<nav>`, `<main>`, `<article>`, `<header>`), `aria-label` attributes, and proper link/button roles.

## Tech Stack

| Concern            | Choice                              |
|--------------------|-------------------------------------|
| Framework          | React 19 (functional components)    |
| Language           | TypeScript                          |
| Routing            | React Router v6 (useSearchParams)   |
| State Management   | React Context API + useReducer      |
| API                | Platzi Fake Store API               |
| Styling            | Inline CSS                          |
| Testing            | Playwright                          |
| Scaffolding        | Create React App (CRA)              |

## Architecture

```
src/
  api/apiClient.ts          — Fetch-based API client
  context/CartContext.tsx    — Cart state via Context + useReducer + localStorage
  types/index.ts            — TypeScript interfaces (Product, Category, CartItem)
  utils/imageHelper.ts      — Image URL cleaning (handles bad API data)
  components/
    Navbar.tsx              — Top navigation bar with Home & Cart links
    ProductCard.tsx         — Product thumbnail card (links to detail page)
    ProductGrid.tsx         — Responsive flex grid of ProductCards
    CategoryFilter.tsx      — Multi-select category filter chips
  pages/
    HomePage.tsx            — Product listing + category filter + URL sync
    ProductDetailPage.tsx   — Product detail fetched by ID + Add to Cart
    CartPage.tsx            — Cart items list + remove + totals
  App.tsx                   — Routes + CartProvider + Navbar
  index.tsx                 — Entry point
```

## Assumptions & Limitations

### Multiple Category Filtering
The Platzi API supports filtering by a single `categoryId` per request. To support multi-category selection, the app fires **parallel API calls** (one per selected category) via `Promise.all` and deduplicates the merged results by product ID.

### API Data Quality
The Platzi Fake Store API is public — anyone can create products and categories. User-created entries often have junk names or placeholder images from dead services (placeimg.com, dummyimage.com). The app filters categories to the original 5 (IDs 1–5) and handles bad image URLs gracefully with a fallback.

### Sorting
The API does not expose a sort parameter. Since the assignment requires server-side filtering only, sorting is not implemented to stay within that constraint.

## Bonus Features Implemented

- **localStorage Cart Persistence** — Cart survives page refreshes.
- **CSS Transitions** — Fade-in on product detail page, hover lift on product cards, button state feedback.
- **Accessibility** — Semantic HTML elements, ARIA labels, keyboard-navigable links.
