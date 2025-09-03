"use client";

import Container from "@/components/ui/container"
import CheckoutForm from "./components/checkout-form"
import { Suspense } from "react"
import CheckoutSummaryClient from "./CheckoutSummaryClient" 
import Button from "@/components/ui/button"
import { useRouter } from "next/navigation";

function SummaryRight() {
  // client wrapper for cart total in a server page
  return (
    <Suspense fallback={<div className="h-24 rounded-lg bg-gray-50" />}>
      {/* This small client component renders the total */}
      {/* We define it as a client component below */}
      <CheckoutSummaryClient />
    </Suspense>
  )
}

export default function CheckoutPage() {
    const router = useRouter();
  return (
    <div className="bg-white">
        <Container>
            <div className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-between">
                    <h3 className="text-3xl font-bold text-black text-balance">Checkout</h3>
                    <Button className="cursor-pointer" onClick={() => router.push("/cart")}>Back To Cart</Button>
                </div>

                <div className="mt-12 grid lg:grid-cols-12 lg:items-start gap-x-2 gap-y-8">
                    <div className="lg:col-span-7">
                        <div className="rounded-lg border border-gray-200 bg-white">
                            <div className="px-4 py-6 sm:p-6">
                                <h2 className="text-lg font-semibold text-gray-900">Contact & Address</h2>
                                <p className="mt-1 text-sm text-gray-500">We’ll use this information for delivery and receipt.</p>
                                <div className="mt-6">
                                    <CheckoutForm />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                            <p className="mt-1 text-sm text-gray-600">Review your total before proceeding to payment.</p>
                            <SummaryRight />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}
