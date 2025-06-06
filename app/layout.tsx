import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/auth-context';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Van On Road | Premium RV Solutions',
  description: 'Discover our range of luxury bespoke motorhomes, built to the highest specifications with unparalleled craftsmanship',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}