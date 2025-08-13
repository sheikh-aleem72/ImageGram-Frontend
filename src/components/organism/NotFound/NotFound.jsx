import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Frown } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 p-4">
      {/* soft gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-200/50 blur-3xl" />

      <div className="relative mx-auto flex max-w-2xl items-center justify-center">
        <Card className="w-full border-none bg-white/80 backdrop-blur-md shadow-xl rounded-2xl">
          <CardHeader className=" flex flex-col items-center text-center space-y-3 p-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
              <Frown
                className="h-10 w-10 text-indigo-600 animate-bounce"
                aria-hidden="true"
              />
            </div>

            <CardTitle className="text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                404
              </span>
            </CardTitle>

            <p className="max-w-md text-balance text-gray-600">
              Oops! The page you’re looking for doesn’t exist or may have moved.
            </p>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-3 pb-8">
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 cursor-pointer"
              onClick={() => navigate("/home")}
            >
              Go to Home
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
