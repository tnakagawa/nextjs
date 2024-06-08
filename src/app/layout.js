import "./globals.css";

export const metadata = {
  title: "Nextjs Sample",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
