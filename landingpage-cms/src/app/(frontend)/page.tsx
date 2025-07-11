import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1>Welcome to Feezy School CMS.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <p className="project-description">
          Content Management System untuk Feezy School Landing Page. 
          Kelola semua konten website dengan mudah melalui admin panel.
        </p>
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            🔧 Go to Admin Panel
          </a>
          <a
            className="docs"
            href="/docs"
            rel="noopener noreferrer"
          >
            📚 CMS Documentation
          </a>
          <a
            className="frontend"
            href="http://localhost:5173"
            rel="noopener noreferrer"
            target="_blank"
          >
            🌐 View Frontend
          </a>
        </div>
      </div>
      <div className="footer">
        <p>🏫 Feezy School CMS - Update content by editing collections</p>
      </div>
    </div>
  )
}
