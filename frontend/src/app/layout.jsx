export const metadata = {
  title: "IELTsTP",
  description: "IELTs trial app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
