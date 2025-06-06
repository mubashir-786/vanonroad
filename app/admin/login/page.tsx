import { AuthGuard } from '@/components/admin/auth-guard';

export default function AdminLoginPage() {
  return <AuthGuard><div /></AuthGuard>;
}