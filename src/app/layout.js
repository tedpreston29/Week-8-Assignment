import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <h1>PlayStation2 Cheat Code Library</h1>
        </div>
        {children}
        <div>
          <footer>Copyright 2025</footer>
        </div>
      </body>
    </html>
  );
}
