import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#2e2e2e] text-white">
        <header>
          <nav className="flex items-center justify-center p-4 gap-4 h-20 bg-[#1c1f24] shadow-lg bg-opacity-65">
            <h1>PlayStation2 Cheat Code Library</h1>
          </nav>
        </header>
        {children}
        <div>
          <footer className="w-full ml-6 text-center relative bottom-0 py-4">
            Copyright 2025
          </footer>
        </div>
      </body>
    </html>
  );
}
