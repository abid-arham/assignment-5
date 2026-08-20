"use client"

import React, { useActionState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { registerAction } from "../_actions/authActions"
import { toast } from "sonner"

const ROLES = [
  {
    value: "CUSTOMER",
  },
  {
    value: "TECHNICIAN",
  },
]

const RegisterForm = ()=> {
  const [state, action, pending] = useActionState(registerAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div>
      <form action={action}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href={"/login"}>Login</Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
            <div className="flex flex-col gap-6">

              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              {/* Role */}
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  name="role"
                  defaultValue=""
                  required
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <option value="" disabled>
                    I wanna be a...
                  </option>

                  {ROLES.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.value}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>

            </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating account..." : "Register"}
          </Button>


        </CardFooter>
      </Card>
      </form>
    </div>
  )
}

export default RegisterForm