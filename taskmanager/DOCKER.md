# Docker Setup Guide

This guide explains how to run the Task Manager application using Docker with MongoDB Atlas.

## Prerequisites

- Docker installed on your system ([Get Docker](https://docs.docker.com/get-docker/))
- MongoDB Atlas account and connection string ([Get MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## Setup

### 1. Get MongoDB Atlas Connection String

1. Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
2. Create a cluster
3. Create a database user
4. Whitelist your IP address in Network Access
   - For development: Add your current IP address
   - For production: Add specific server IP addresses
   - **Security Warning**: Using `0.0.0.0/0` (access from anywhere) is NOT recommended for production as it exposes your database to potential attacks
5. Get your connection string from the "Connect" button

### 2. Configure Environment Variables

Create a `.env` file in the `taskmanager` directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/taskmanager?retryWrites=true&w=majority
NODE_ENV=production
```

Replace `<username>`, `<password>`, and `<cluster>` with your actual MongoDB Atlas credentials.

## Quick Start with Docker Compose

Once you have your `.env` file configured, start the application:

```bash
docker-compose up
```

This will start the Task Manager web application on port 3000, connected to your MongoDB Atlas cluster.

Access the application at [http://localhost:3000](http://localhost:3000)

To stop the service:
```bash
docker-compose down
```

To rebuild after code changes:
```bash
docker-compose up --build
```

## Manual Docker Setup

### Building the Docker Image

From the taskmanager directory, build the Docker image:

```bash
docker build -t taskmanager:latest .
```

### Running with Docker

Run the container with your MongoDB Atlas connection string:

```bash
docker run -d \
  --name taskmanager \
  -p 3000:3000 \
  -e MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/taskmanager?retryWrites=true&w=majority" \
  -e NODE_ENV=production \
  taskmanager:latest
```

Or use an `.env` file:

```bash
docker run -d \
  --name taskmanager \
  -p 3000:3000 \
  --env-file .env \
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

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/taskmanager` |
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Application port | `3000` |

## Development with Docker

For development with hot-reload and MongoDB Atlas:

```bash
docker run -d \
  --name taskmanager-dev \
  -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -e MONGODB_URI="your-mongodb-atlas-connection-string" \
  -e NODE_ENV=development \
  taskmanager:latest \
  npm run dev
```

## Troubleshooting

### Connection Issues

If you can't connect to MongoDB Atlas:
- Verify your MongoDB Atlas connection string is correct
- Check that your IP address is whitelisted in MongoDB Atlas Network Access
- Ensure your database user credentials are correct
- Check the MongoDB Atlas cluster is running

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

For production deployment with MongoDB Atlas:

1. **Security**:
   - Store MongoDB Atlas credentials securely using Docker secrets or environment variables
   - Use strong passwords for MongoDB Atlas users
   - Restrict IP access in MongoDB Atlas Network Access settings
   - Enable MongoDB Atlas encryption at rest

2. **Docker Best Practices**:
   - Use specific image tags instead of `latest`
   - Implement health checks for the application
   - Set up proper logging and monitoring
   - Use a reverse proxy (nginx) for SSL/TLS termination

3. **MongoDB Atlas**:
   - Use dedicated clusters for production
   - Enable automated backups
   - Configure database alerts and monitoring
   - Review and optimize connection pool settings

4. **Scaling**:
   - Consider using orchestration tools like Kubernetes
   - Use MongoDB Atlas auto-scaling features
   - Implement horizontal pod autoscaling for the application

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Atlas Connection Strings](https://docs.mongodb.com/manual/reference/connection-string/)
