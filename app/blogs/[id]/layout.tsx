import styles from './layout.module.css'

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.blogLayout}>{children}</div>;
}
