// Layout.jsx
export default function Layout({ children, sidebar }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '24px',
      padding: '24px'
    }}>
      <main>{children}</main>
      <aside>{sidebar}</aside>
    </div>
  );
}