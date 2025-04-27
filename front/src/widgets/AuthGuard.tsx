import { ReactNode } from "react";
import { MobileLayout } from "../features/MobileLayout";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/store";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  const publicRoutes = ['/login'];

  if (publicRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <MobileLayout>{children}</MobileLayout>;
}
