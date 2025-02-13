
export const metadata = {
  title: "Trials",
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
