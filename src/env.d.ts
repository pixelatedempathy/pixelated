/// <reference types="astro/client" />

import '../.astro/types.d.ts'

declare namespace App {
  interface Locals {
    requestId: string
    timestamp: string
    user: {
      id: string
      email: string
<<<<<<< HEAD
      role: string
      fullName?: string
      avatarUrl?: string
=======
<<<<<<< HEAD
      role: string
      fullName?: string
      avatarUrl?: string
=======
      emailVerified: boolean
      role: string
      fullName?: string
      avatarUrl?: string
      createdAt?: string
      updatedAt?: string
      lastLogin?: string
      appMetadata?: Record<string, unknown>
      userMetadata?: Record<string, unknown>
>>>>>>> origin/master
>>>>>>> origin/master
    } | null
    session: {
      id: string
      userId: string
      expiresAt: Date
    } | null
    vercelEdge?: {
      country: string
      region: string
      ip: string
      isAuthPage: boolean
      userAgent: string
    }
    cspNonce?: string
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_AUTH0_DOMAIN: string;
  readonly PUBLIC_AUTH0_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
