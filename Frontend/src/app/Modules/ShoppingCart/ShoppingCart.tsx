"use client";

import React, { useEffect, useMemo, useState } from "react";

// ---- Types ----
export type CartItem = {
  id: number; // product id
  name: string;
  price: number; // unit price
  qty: number; // quantity selected
  image?: string;
};
/**
 * dfdhsdkdfhjksdhfkshdf
 * 
 */
export type CartValidationRequest = {
  items: Array<{ id: number; qty: number }>;
};

export type CartValidationResponse = {
  ok: boolean; // request succeeded
  items: Array<{
    id: string;
    isValid: boolean;
    // Provide optional fields from your API, these are read defensively
    availableQty?: number;
    message?: string;
  }>;
};

// ---- LocalStorage helpers ----
const LS_KEY = "sysmarket.cart.v1";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }55
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

// ---- Utility helpers ----
function currency(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}

function clampQty(qty: number) {
  const n = Number.isFinite(qty) ? Math.trunc(qty) : 1;
  return Math.max(1, Math.min(9999, n));
}

// ---- Component ----
export default function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persist to localStorage whenever items change
  useEffect(() => {
    saveCart(items);
  }, [items]);

  // Validate quantities with your backend on mount (and when items change significantly)
  useEffect(() => {
    if (items.length === 0) return;
    validateCart(items).then((res) => {
      if (!res.ok) return; // network or server issue handled inside validateCart
      const invalid = res.items.filter((i) => !i.isValid);
      if (invalid.length > 0) {
        const lines = invalid.map((i) => {
          const meta = items.find((x) => x.id === Number(i.id));
          const name = meta?.name ?? i.id;
          const suffix = i.message ? ` — ${i.message}` : i.availableQty != null ? ` — disponible: ${i.availableQty}` : "";
          return `• ${name}${suffix}`;
        });
        alert(`Algunas cantidades no son válidas:\n\n${lines.join("\n")}\n\nPuedes continuar normalmente.`);
      }
    });
  }, []); // run at page init only, per requirement

  const total = useMemo(() => items.reduce((acc, it) => acc + it.price * it.qty, 0), [items]);

  function updateQty(id: string, qty: number) {
    setItems((prev) => prev.map((it) => (it.id === Number(id) ? { ...it, qty: clampQty(qty) } : it)));
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== Number(id)));
  }

  // Demo: Add an example product (this would normally come from a product page)
  function addDemoItem() {
    const demo: CartItem = {
      id: Math.floor(Math.random() * 10000000),
      name: `Producto ${items.length + 1}`,
      price: Number((10 + Math.random() * 90).toFixed(2)),
      qty: 1,
      image: `https://picsum.photos/seed/${Date.now()}/200/200`,
    };
    setItems((prev) => [...prev, demo]);
  }

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      // Example: send cart to your backend
      const res = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) throw new Error("Checkout failed");
      alert("¡Pedido realizado con éxito!");
      setItems([]);
    } catch (e: any) {
      setError(e?.message ?? "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Carrito de compras</h1>
          <button
            onClick={addDemoItem}
            className="px-4 py-2 rounded-2xl bg-neutral-800 hover:bg-neutral-700 transition shadow"
          >
            + Agregar demo
          </button>
        </header>

        {items.length === 0 ? (
          <div className="text-center py-20 border border-neutral-800 rounded-2xl">
            <p className="text-lg opacity-80">Tu carrito está vacío.</p>
            <p className="opacity-60 mt-2">Agrega productos para comenzar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 space-y-3">
              {items.map((it) => (
                <article
                  key={it.id}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-800 bg-neutral-900/40"
                >
                  <img
                    src={it.image || `https://picsum.photos/seed/${it.id}/100/100`}
                    alt={it.name}
                    className="w-20 h-20 rounded-xl object-cover border border-neutral-800"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{it.name}</h3>
                    <p className="opacity-70 text-sm">{currency(it.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-24 bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 focus:outline-none"
                      min={1}
                      max={9999}
                      value={it.qty}
                      onChange={(e) => updateQty(String(it.id), Number(e.target.value))}
                    />
                    <button
                      onClick={() => removeItem(String(it.id))}
                      className="px-3 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 transition"
                      aria-label={`Quitar ${it.name}`}
                    >
                      Quitar
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="rounded-2xl border border-neutral-800 p-4 h-fit bg-neutral-900/40">
              <h2 className="text-xl font-semibold mb-4">Resumen</h2>
              <div className="flex items-center justify-between py-2">
                <span className="opacity-70">Subtotal</span>
                <span>{currency(total)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="opacity-70">Envío</span>
                <span>{total > 0 ? currency(0) : currency(0)}</span>
              </div>
              <div className="border-t border-neutral-800 my-3" />
              <div className="flex items-center justify-between py-2 text-lg font-semibold">
                <span>Total</span>
                <span>{currency(total)}</span>
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
              <button
                onClick={checkout}
                disabled={loading}
                className="mt-4 w-full px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed transition shadow"
              >
                {loading ? "Procesando…" : "Finalizar compra"}
              </button>
              <p className="text-xs opacity-60 mt-3">
                Accesible para todos (sin autenticación). El carrito se guarda en <code>localStorage</code>.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- API integration ----
// Replace VALIDATION_URL with your real endpoint. The module continues normally even if invalid quantities are found.
const VALIDATION_URL = "/api/products/validate"; // POST expects { items: [{id, qty}] }

async function validateCart(items: CartItem[]): Promise<CartValidationResponse> {
  const payload: CartValidationRequest = { items: items.map((i) => ({ id: i.id, qty: i.qty })) };

  try {
    const res = await fetch(VALIDATION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Network error");
    const data = (await res.json()) as CartValidationResponse;
    // Defensive shape-guarding
    if (!data || !Array.isArray(data.items)) throw new Error("Bad response");
    return { ok: true, items: data.items };
  } catch {
    // Non-blocking per requirement — fall back to optimistic valid state
    return { ok: false, items: items.map((i) => ({ id: String(i.id), isValid: true })) };
  }
}
