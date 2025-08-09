import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { LucideLoader2, TriangleAlert } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SigninCard({
  validationError,
  isSuccess,
  error,
  onSigninFormSubmit,
  signinForm,
  setSigninForm,
  isPending,
}) {
  const navigate = useNavigate();
  return (
    <>
      <Card className="w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px] border border-border rounded-lg sm:p-10 shadow-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-imagegram-text text-2xl sm:text-3xl font-bold text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-imagegram-subtext text-center">
            Access your account securely
          </CardDescription>

          {validationError && (
            <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive">
              <TriangleAlert className="size-5" />
              <p>{validationError.message}</p>
            </div>
          )}

          {error && (
            <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive">
              <TriangleAlert className="size-5" />
              <p>{error.message}</p>
            </div>
          )}

          {isSuccess && (
            <div className="bg-primary/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-primary">
              <FaCheck className="size-5" />
              <p>
                Successfully signed in. Redirecting...
                <LucideLoader2 className="animate-spin inline ml-2" />
              </p>
            </div>
          )}
        </CardHeader>

        <CardContent className="mt-2">
          <form className="space-y-6" onSubmit={onSigninFormSubmit}>
            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-imagegram-subtext"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                onChange={(e) =>
                  setSigninForm({ ...signinForm, email: e.target.value })
                }
                value={signinForm?.email}
                disabled={isPending}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-imagegram-subtext"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                onChange={(e) =>
                  setSigninForm({ ...signinForm, password: e.target.value })
                }
                value={signinForm?.password}
                disabled={isPending}
              />
            </div>

            <Button
              className="w-full cursor-pointer bg-imagegram-primary text-white py-2 rounded hover:bg-accent hover:text-imagegram-text transition"
              size="lg"
              disabled={isPending}
              type="submit"
            >
              Sign In
            </Button>
          </form>

          <Separator className="my-6" />

          <p className="text-muted-foreground text-sm text-center">
            Don’t have an account?{" "}
            <span
              className="text-sky-600 hover:underline cursor-pointer"
              onClick={() => navigate("/auth/signup")}
            >
              Sign Up
            </span>
          </p>
        </CardContent>
      </Card>
    </>
  );
}

export default SigninCard;
