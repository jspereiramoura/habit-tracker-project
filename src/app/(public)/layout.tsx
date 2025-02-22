import Header from "../_components/header";

export default function PublicPagesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
