# Docker Setup Guide

This guide explains how to run the Task Manager application using Docker.

## Prerequisites

- Docker installed on your system ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose (optional, but recommended)

## Quick Start with Docker Compose

The easiest way to run the application with all dependencies is using Docker Compose:

```bash
docker-compose up
```

This will start:
- The Task Manager web application on port 3000
- MongoDB database on port 27017

Access the application at [http://localhost:3000](http://localhost:3000)

To stop the services:
```bash
docker-compose down
```

To stop and remove volumes (deletes database data):
```bash
docker-compose down -v
```

## Manual Docker Setup

### Building the Docker Image

From the taskmanager directory, build the Docker image:

```bash
docker build -t taskmanager:latest .
```

### Running with Docker

#### Option 1: With External MongoDB

If you have MongoDB running elsewhere:

```bash
docker run -d \
  --name taskmanager \
  -p 3000:3000 \
  -e MONGODB_URI=mongodb://your-mongodb-host:27017/taskmanager \
  taskmanager:latest
```

#### Option 2: With Docker MongoDB Container

First, create a Docker network:
```bash
docker network create taskmanager-network
```

Start MongoDB:
```bash
docker run -d \
  --name mongodb \
  --network taskmanager-network \
  -v mongodb_data:/data/db \
  mongo:7
```

Start the Task Manager app:
```bash
docker run -d \
  --name taskmanager \
  --network taskmanager-network \
  -p 3000:3000 \
  -e MONGODB_URI=mongodb://mongodb:27017/taskmanager \
  taskmanager:latest
```

### Viewing Logs

```bash
docker logs taskmanager
```

To follow logs in real-time:
```bash
docker logs -f taskmanager
```

### Stopping and Removing Containers

```bash
docker stop taskmanager
docker rm taskmanager
```

## Environment Variables

The following environment variables can be configured:

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/taskmanager` |
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Application port | `3000` |

## Development with Docker

For development with hot-reload:

```bash
docker run -d \
  --name taskmanager-dev \
  -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/taskmanager \
  -e NODE_ENV=development \
  taskmanager:latest \
  npm run dev
```

## Troubleshooting

### Connection Issues

If you can't connect to MongoDB:
- Check that MongoDB is running: `docker ps`
- Verify the `MONGODB_URI` environment variable
- For local MongoDB on host machine, use `host.docker.internal` instead of `localhost`

### Port Already in Use

If port 3000 is already in use, map to a different port:
```bash
docker run -p 8080:3000 ...
```

Then access at [http://localhost:8080](http://localhost:8080)

### View Running Containers

```bash
docker ps
```

### Remove All Stopped Containers

```bash
docker container prune
```

## Production Considerations

For production deployment:

1. Use specific image tags instead of `latest`
2. Set appropriate environment variables
3. Use Docker secrets for sensitive data
4. Consider using orchestration tools like Kubernetes
5. Implement health checks
6. Set up proper logging and monitoring
7. Use a reverse proxy (nginx) for SSL/TLS termination

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
