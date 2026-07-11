import { Suspense } from "react";
import { AdminLoginForm } from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="relative flex min-h-screen items-center justify-center">
        <p className="text-text-secondary">Загрузка...</p>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
