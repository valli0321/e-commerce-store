"use client"

import axios from "axios"
import React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"

import { useCart } from "@/hooks/use-cart"

import Button from "@/components/ui/button"

const CheckoutSchema = z.object({
    // email: z.string().email("Enter a valid email"),
    phone: z
        .string()
        .trim()
        .min(10, "Phone must be at least 10 digits")
        .regex(/^[0-9+\-()\s]+$/, "Enter a valid phone number"),
    address: z.string().trim().min(10, "Please enter a complete address"),
})

type CheckoutValues = z.infer<typeof CheckoutSchema>

export default function CheckoutForm() {
  const router = useRouter()
  const cart = useCart()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutValues>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
        //   email: "",
        phone: "",
        address: "",
        },
        mode: "onSubmit",
    })

    React.useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const onSubmit = async (values: CheckoutValues) => {
        try {
            if (cart?.isEmpty) {
                toast.error("Your cart is empty.")
                return
            }

            // Persist contact for payment step if desired
            if (typeof window !== "undefined") {
                sessionStorage.setItem("checkout_contact", JSON.stringify(values))
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
                productIds: cart?.items?.map((item) => item?.id),
                ...values
            });
            console.log("RES_CHECKOUT",res)
            const { razorpayOrder, dbOrder } = res?.data?.data;
            console.log(razorpayOrder, dbOrder)
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: "Your Store Name",
                description: "Order Payment",
                order_id: razorpayOrder.id,
                handler: async function (response: any) {
                    try {
                        // 3. Verify payment with backend
                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            dbOrderId: dbOrder?.id,
                        });
                        toast.success("Payment successful!");
                        cart.clearCart();
                        router.push("/");
                    } catch (error) {
                        console.log(error)
                        toast.error("Payment verification failed");
                    }
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9876543210",
                },
                theme: {
                    color: "#3399cc",
                },
            };
            // @ts-ignore
            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error: any) {
            toast.error("Something went wrong. Please try again.", error?.response?.data?.message)
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      {/* <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
          Email
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          placeholder="you@example.com"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div> */}

        <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                Phone
            </label>
            <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="+1 555 555 5555"
                {...register("phone")}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                </p>
            )}
        </div>

        <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-900">
                Address
            </label>
            <textarea
                id="address"
                rows={4}
                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Street, City, State, ZIP / PIN"
                {...register("address")}
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? "address-error" : undefined}
            />
            {errors.address && (
                <p id="address-error" className="mt-1 text-sm text-red-600">
                    {errors.address.message}
                </p>
            )}
        </div>

        <div className="flex items-center justify-end">
            <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer sm:w-auto">
                {isSubmitting ? "Processing..." : "Continue to Payment"}
            </Button>
        </div>
    </form>
  )
}
