export default function PokemonListLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="page-green">{children}</body>
    </html>
  );
}
