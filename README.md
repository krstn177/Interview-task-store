- # Interview Task Store

- A small React + Vite sample application showcasing a product catalog and a simple shopping cart.

- ## Summary Structure (supporting points to write a project summary)

- ### What has been implemented
- Product catalog UI showing a list of products
- `ProductCard` component for individual product display
- `CatalogPage` to aggregate and render product listings
- Filtering and Sorting dynamic categories implemented in the `CatalogPage` component
- Shopping cart UI with add/remove functionality (`Cart` component)
- Global cart state using `CartContext` (add, remove, increment, decrement counts)
- Basic responsive layout and styling via CSS Modules
- Local data source: `data/products.json` used as product feed

- ### Which technologies were used
- React (component-based UI)
- Vite (dev server + build tooling)
- CSS Modules for component-scoped styles
- React Context API for global state (`CartContext.jsx`)
- Node.js / npm for package management and scripts
- Additional packages used: react-transition-group(for cart transition), react-toastify(for the notifications) and react-router-dom(routing)

- ### How the solution was achieved
- Project structured into `src/components` and `src/context` for separation of concerns
- Catalog and product card components composed to keep components small and reusable
- Cart state implemented in `CartContext.jsx` and provided at app root for easy access
- Components consume context to update cart and compute totals
- Styling scoped per-component using `*.module.css` to avoid global CSS conflicts
- Product data loaded from `data/products.json` and mapped into UI components

- ### Challenges encountered during development
- Managing shared cart state without prop drilling — solved with React Context
- Computing available filters and filter criteria without unnecessary operations and only when the relevant set of dependencies changes - solved with the useMemo hook
- Ensuring styles are isolated while keeping a consistent layout across components
- Small accessibility and responsive layout adjustments to ensure usable UI on various viewports

- ---

