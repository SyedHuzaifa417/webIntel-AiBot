"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { LinkIcon, Loader2 } from "lucide-react";

export default function LandingPage() {
  // Use state to track client-side rendering and loading
  const [isClient, setIsClient] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Ensure this only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setIsLoading(true);
      try {
        const encodedUrl = url.split("/").map(encodeURIComponent).join("/");
        // Simulate a slight delay to show loading state
        await new Promise((resolve) => setTimeout(resolve, 500));
        router.push(`/${encodedUrl}`);
      } catch (error) {
        console.error("Failed to process URL", error);
        setIsLoading(false);
      }
    }
  };

  // If not client-side, return null or a placeholder
  if (!isClient) {
    return (
      <div className="min-h-screen text-4xl flex flex-col items-center justify-center bg-zonc-700 text-white">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
        <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Your adventure is about to begin
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <Card className="max-w-2xl w-full shadow-2xl bg-gray-800 border-none">
        <CardHeader className="flex flex-col space-y-4 text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-md">
            InsightBot
          </h1>
          <p className="text-gray-300 max-w-xl text-lg">
            Unlock deep insights from any webpage with our cutting-edge AI
            analysis tool
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter a webpage URL to analyze"
              startContent={<LinkIcon className="text-gray-500" />}
              size="lg"
              variant="bordered"
              className="w-full"
              type="url"
              required
              classNames={{
                input: "text-white",
                inputWrapper:
                  "bg-gray-700 border-gray-600 hover:border-blue-500",
              }}
            />
            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full"
              startContent={
                isLoading ? <Loader2 className="animate-spin" /> : <LinkIcon />
              }
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Analyze Webpage"}
            </Button>
          </form>

          <div className="mt-8 space-y-4 text-center">
            <h2 className="text-xl font-semibold text-white">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "1. Input URL",
                  description: "Paste any webpage URL you want to analyze",
                },
                {
                  title: "2. AI Indexing",
                  description: "Our AI processes and understands the content",
                },
                {
                  title: "3. Get Insights",
                  description: "Receive comprehensive AI-generated insights",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-all duration-300"
                >
                  <h3 className="font-bold text-white">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="mt-8 max-w-2xl text-center">
        <p className="text-gray-400">
          InsightBot leverages advanced AI to provide deep, contextual analysis
          of web content. Simply paste a URL, and our intelligent system will
          break down the page, extract key information, and generate meaningful
          insights.
        </p>
      </div>
    </div>
  );
}
