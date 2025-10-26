import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div>
          <h1 className="w-full text-center text-4xl relative top-4 underline">
            PlayStation2 Cheat Code Library
          </h1>
        </div>
        {children}
        <div>
          <footer className="w-full text-center relative bottom-0 py-4">
            Copyright 2025
          </footer>
        </div>
      </body>
    </html>
  );
}
