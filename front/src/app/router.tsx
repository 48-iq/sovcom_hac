import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { AuthGuard } from "../widgets/AuthGuard";
import { RecommendationsPage } from "../pages/RecommendationsPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard> 
        <DashboardPage />
      </AuthGuard>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/recommendations',
    element: (
      <AuthGuard>
        <RecommendationsPage />
      </AuthGuard>
    )
  }
])