import "./globals.css";

import Header from "@/components/Header/Header";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>{children}</main>

        {modal}
      </body>
    </html>
  );
}
