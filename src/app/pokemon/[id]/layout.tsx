export default function PokemonLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="page-pink">{children}</body>
    </html>
  );
}
