import { Suspense } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import LoadingPage from '@/pages/loading/loading-page';
import NotFoundPage from '@/pages/not-found/not-found-page';
import HomePage from '@/pages/home/home-page';
import MenuPage from '@/pages/menu/menu-page';
import ProductPage from '@/pages/product/product-page';
import OrdersPage from '@/pages/orders/orders-page';
import OrderDetailPage from '@/pages/orders/order-detail-page';
import ProductsPage from '@/pages/products/products-page';
import DemoPage from '@/pages/demo/demo-page';
import HomeLayout from '@/layouts/home-layout';

/**
 * Application route configuration
 * @type {RouteObject[]}
 */
const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingPage />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'demo',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <DemoPage />
          </Suspense>
        ),
      },
      {
        path: 'menu',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <MenuPage />
          </Suspense>
        ),
      },
      {
        path: 'explore',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <MenuPage />
          </Suspense>
        ),
      },
      {
        path: 'product/:id',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: 'orders',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <OrdersPage />
          </Suspense>
        ),
      },
      {
        path: 'orders/:id',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <OrderDetailPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingPage />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
];

/**
 * Router instance for the application
 * @type {ReturnType<typeof createBrowserRouter>}
 */
export const router = createBrowserRouter(routes);

/**
 * Creates a URL with parameters replaced by their values
 *
 * @param {string} route - The route pattern with parameter placeholders (e.g., "/users/:id")
 * @param {Record<string, string>} params - Object containing parameter keys and values
 * @returns {string} The URL with parameters replaced by their values
 *
 * @example
 * // Returns "/users/123"
 * createUrl("/users/:id", { id: "123" })
 */
export function createUrl(
  route: string,
  params: Record<string, string> = {}
): string {
  let url = route;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value);
  });
  return url;
}
