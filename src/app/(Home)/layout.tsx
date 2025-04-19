import { Toaster } from "react-hot-toast";
import "../globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>
          AgriScan AI | Empowering Farmers with Vision—Detect Leaf Diseases
          Instantly
        </title>
        <meta
          name="description"
          content="AgriScan AI is a smart leaf disease detection tool powered by deep learning. Using a ResNet-based model, it can identify over 35 diseases across multiple crops including tomatoes, grapes, apples, and corn. Built to support farmers and researchers, AgriScan AI offers real-time analysis through a user-friendly web interface. Detect leaf diseases in crops like tomato, apple, corn, and more using AI. AgriScan AI is a web-based tool powered by deep learning for accurate and fast plant disease detection."
        />
      </head>
      <body className="antialiased">
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
