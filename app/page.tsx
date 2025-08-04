import React from 'react'
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 text-center">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome to Converso
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Real-time AI Teaching Platform - Learn with personalized AI companions
        </p>
      </div>
      
      <SignedOut>
        <div className="space-y-4">
          <p className="text-lg">Get started by signing in to access your AI companions</p>
          <Button size="lg" asChild>
            <Link href="/sign-in">
              Get Started
            </Link>
          </Button>
        </div>
      </SignedOut>
      
      <SignedIn>
        <div className="space-y-4">
          <p className="text-lg">Ready to start learning?</p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/companions">
                Browse Companions
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/companions/new">
                Create New Companion
              </Link>
            </Button>
          </div>
        </div>
      </SignedIn>
    </div>
  )
}

export default Page