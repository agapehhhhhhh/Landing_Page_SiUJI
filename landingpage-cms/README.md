# ⚡ SIUJI Backend - Payload CMS

Backend application untuk SIUJI Landing Page menggunakan Payload CMS 3 dan Next.js 15.

## 🛠️ **Tech Stack**

- **Payload CMS 3** - Modern headless CMS
- **Next.js 15** - React framework untuk backend
- **TypeScript** - Type-safe development
- **PostgreSQL** - Database relasional
- **PNPM** - Fast package manager

## 📁 **Project Structure**

```
src/
├── collections/          # Payload CMS collections schema
│   ├── HeroSection.ts   # Hero section collection
│   ├── Features.ts      # Features collection
│   ├── Products.ts      # Products collection
│   ├── Testimonials.ts  # Testimonials collection
│   ├── FAQ.ts          # FAQ collection
│   ├── Header.ts       # Header configuration
│   ├── Footer.ts       # Footer configuration
│   ├── Media.ts        # Media/file uploads
│   └── Users.ts        # Admin users
├── app/                 # Next.js app directory
│   ├── (frontend)/     # Frontend routes
│   ├── (payload)/      # Payload admin interface
│   └── api/            # API routes
├── payload.config.ts    # Payload CMS configuration
└── payload-types.ts     # Auto-generated TypeScript types
```

## 🚀 **Development**

### **Local Development**
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### **Environment Variables**
```bash
# Required environment variables
DATABASE_URI=postgresql://user:password@localhost:5432/siuji_db
PAYLOAD_SECRET=your-secret-key-64-chars-long
NODE_ENV=development

# Optional
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
CSRF_ORIGINS=http://localhost:5173
```

3. `pnpm install && pnpm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

#### Docker (Optional)

If you prefer to use Docker for local development instead of a local MongoDB instance, the provided docker-compose.yml file can be used.

To do so, follow these steps:

- Modify the `MONGODB_URI` in your `.env` file to `mongodb://127.0.0.1/<dbname>`
- Modify the `docker-compose.yml` file's `MONGODB_URI` to match the above `<dbname>`
- Run `docker-compose up` to start the database, optionally pass `-d` to run in the background.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
