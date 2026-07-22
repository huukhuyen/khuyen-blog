import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PageLoader } from './page-loader';
import { AppRoutes } from './routes';
import { ScrollToTop } from './scroll-to-top';

export function App(): JSX.Element {
  return <BrowserRouter><ScrollToTop /><Suspense fallback={<PageLoader />}><AppRoutes /></Suspense></BrowserRouter>;
}
