"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import SideNav from "./SideNav";
import { AuthProvider, useAuth } from "@/context/AuthProvider";
import Script from "next/script";

const Component = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { setUser } = useAuth();
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };
    const fetchUser = async () => {
      const response = await axios.get("/api/auth/verifytoken");
      if (response.data) {
        setUser(response.data.user);
      }
    };
    fetchUser();
  }, []);
  return (
    <html lang="en">
      <head>
        <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></Script>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.gstatic.com/_/translate_http/_/ss/k=translate_http.tr.26tY-h6gH9w.L.W.O/am=CAM/d=0/rs=AN8SPfpIXxhebB2A47D9J-MACsXmFF6Vew/m=el_main_css"
        />
        <title>
          AgriScan AI | Empowering Farmers with Vision—Detect Leaf Diseases
          Instantly
        </title>
        <meta
          name="description"
          content="AgriScan AI is a smart leaf disease detection tool powered by deep learning. Using a ResNet-based model, it can identify over 35 diseases across multiple crops including tomatoes, grapes, apples, and corn. Built to support farmers and researchers, AgriScan AI offers real-time analysis through a user-friendly web interface. Detect leaf diseases in crops like tomato, apple, corn, and more using AI. AgriScan AI is a web-based tool powered by deep learning for accurate and fast plant disease detection."
        />
      </head>
      <body className={`antialiased`}>
        <div
          id="google_translate_element"
          className="fixed right-44 top-1.5 z-50 py-2 rounded-lg bg-base-300 text-base-content h-14 overflow-hidden"
        ></div>
        <Toaster />
        <SideNav>{children}</SideNav>
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Component>{children}</Component>
    </AuthProvider>
  );
}
