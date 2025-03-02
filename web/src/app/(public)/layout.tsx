import Header from "../_components/header";

export default function PublicPagesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <main className="flex grow items-center justify-center">{children}</main>
    </div>
  );
}
