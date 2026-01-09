import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (client) {
    return client
  }

  const originalFetch = globalThis.fetch
  globalThis.fetch = async (...args) => {
    try {
      return await originalFetch(...args)
    } catch (error: any) {
      // Suppress errors from browser extensions
      if (error?.message?.includes("extension://")) {
        return new Response(JSON.stringify({}), { status: 200 })
      }
      throw error
    }
  }

  client = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  return client
}
