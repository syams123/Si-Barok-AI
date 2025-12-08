import './globals.css';

export const metadata = {
  title: 'Karo AI',
  description: 'Next.js App Router setup',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

