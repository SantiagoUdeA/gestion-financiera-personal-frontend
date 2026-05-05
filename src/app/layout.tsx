import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FinanzasPro - Gestión Financiera Personal',
  description: 'Controla tus finanzas personales con FinanzasPro',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark">
      <body className="font-sans bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
