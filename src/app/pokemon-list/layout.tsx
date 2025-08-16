import ReactQueryProvider from 'providers/react-query.provider';

export default function PokemonListLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="page-green">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
