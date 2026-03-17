# Starostwo Frontend App

Next.js frontend application for the Starostwo project.

## Prerequisites

- Node.js 18+
- Docker (for containerized deployment)

## Development

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

## Docker Deployment

### Development Build

Build and run development image:

```bash
docker build --target development -t antost360/starostwo-frontend-dev .

docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules antost360/starostwo-frontend-dev
```

### Production Build

Build production image for deployment:

```bash
docker build --target production --platform linux/amd64 -t antost360/starostwo-frontend-prod .
```

### Push to DockerHub

Push the production image to DockerHub:

```bash
docker push antost360/starostwo-frontend-prod
```

### Run Production Container

Run the production container locally:

```bash
docker run -p 3000:3000 antost360/starostwo-frontend-prod
```

## Environment Variables

Create a `.env.local` file in the root directory for local development. For production, ensure all necessary environment variables are set in your deployment environment.

## Docker Targets

The Dockerfile defines multiple build targets:

- **production**: Optimized production build with standalone output
- **development**: Development build with hot reloading support

## Architecture

This is a Next.js application configured with:
- Standalone output for optimized Docker images
- Static asset handling
- Production-ready configuration

## Building for Different Platforms

When building for deployment on different architectures, specify the platform:

```bash
# For AMD64 (most cloud servers)
docker build --target production --platform linux/amd64 -t antost360/starostwo-frontend-prod .

# For ARM64 (e.g., Apple Silicon, ARM servers)
docker build --target production --platform linux/arm64 -t antost360/starostwo-frontend-prod .
```

## Production Deployment Checklist

1. Build the production image with correct platform
2. Push to your container registry (DockerHub, GHCR, etc.)
3. Deploy to your orchestration platform (Kubernetes, Docker Swarm, etc.)
4. Ensure environment variables are properly configured
5. Verify health checks and monitoring are in place