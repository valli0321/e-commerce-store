"use client"

import Currency from "@/components/ui/currency"
import { useCart } from "@/hooks/use-cart"

export default function CheckoutSummaryClient() {
  const cart = useCart()
  return (
    <div className="mt-6 space-y-4">
        {cart.items.map((item) => (
            <div key={item?.id} className="flex items-center justify-between border-t border-gray-300 pt-4">
                <div className="text-base font-medium text-gray-900">{item?.name}</div>
                <Currency value={item?.price} />
            </div>
        ))}
        <div className="flex items-center justify-between border-t border-gray-300 pt-4">
        <div className="text-base  text-gray-900 font-semibold">Order Total</div>
        <Currency value={cart?.totalPrice} />
      </div>
    </div>
  )
}
