import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LucideLoader2, TriangleAlert } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignupCard = ({
  isPending,
  isSuccess,
  error,
  signupForm,
  setSignupForm,
  onSignupFormSubmit,
  validationError,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px] border border-border rounded-lg p-8 sm:p-10 shadow-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-imagegram-text text-2xl sm:text-3xl font-bold text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-imagegram-subtext text-center">
            Create a new account to get started
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
                Successfully signed up. Redirecting...
                <LucideLoader2 className="animate-spin inline ml-2" />
              </p>
            </div>
          )}
        </CardHeader>

        <CardContent className="mt-2">
          <form onSubmit={onSignupFormSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="username"
                className="text-sm font-medium text-imagegram-subtext"
              >
                Username
              </label>
              <Input
                id="username"
                required
                placeholder="Enter your username"
                type="text"
                onChange={(e) =>
                  setSignupForm({ ...signupForm, username: e.target.value })
                }
                value={signupForm.username}
                disabled={isPending}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-imagegram-subtext"
              >
                Email Address
              </label>
              <Input
                id="email"
                required
                placeholder="you@example.com"
                type="email"
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
                value={signupForm.email}
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
                required
                placeholder="Enter your password"
                type="password"
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
                value={signupForm.password}
                disabled={isPending}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-imagegram-subtext"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                required
                placeholder="Re-enter your password"
                type="password"
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    confirmPassword: e.target.value,
                  })
                }
                value={signupForm.confirmPassword}
                disabled={isPending}
              />
            </div>

            <Button
              size="lg"
              className="w-full bg-imagegram-primary text-white py-2 rounded hover:bg-accent hover:text-imagegram-text transition"
              type="submit"
              disabled={isPending}
            >
              Continue
            </Button>
          </form>

          <Separator className="my-6" />

          <p className="text-muted-foreground text-sm text-center">
            Already have an account?{" "}
            <span
              className="text-sky-600 hover:underline cursor-pointer"
              onClick={() => navigate("/auth/signin")}
            >
              Sign In
            </span>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default SignupCard;
