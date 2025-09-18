export default function BlogsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {

  return (
    <div>
      
      <main>{children}</main>
      {/* Modal slot */}
      {modal}
    </div>
  );
}
