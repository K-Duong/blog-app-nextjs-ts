export default function BlogsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {

  return (
    <div>
      
      {children}
      {/* Modal slot */}
      {modal}
    </div>
  );
}
