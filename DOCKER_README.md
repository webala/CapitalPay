# CapitalPay Docker Setup

This guide will help you set up and run the CapitalPay application using Docker containers.

## 🏗️ Architecture

The application consists of three main services:
- **Frontend**: React application served by Nginx
- **Backend**: Node.js/Express API server
- **Database**: MongoDB with proper initialization

## 📋 Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 2.0+)
- At least 2GB of available RAM
- Ports 3000, 5000, and 27017 available

## 🚀 Quick Start

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd CapitalPay
```

### 2. Build and Run (Development)
```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **MongoDB**: localhost:27017

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for custom configuration:

```env
# Database
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=your-secure-password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Admin Configuration
ADMIN_EMAIL=admin@capitalpay.com
ADMIN_PASSWORD=your-admin-password

# API URL for frontend
VITE_API_URL=http://localhost:5000/api
```

## 📦 Available Commands

### Development
```bash
# Start all services
docker-compose up

# Start with rebuild
docker-compose up --build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes data)
docker-compose down -v
```

### Production
```bash
# Use production configuration
docker-compose -f docker-compose.prod.yml up -d --build

# View production logs
docker-compose -f docker-compose.prod.yml logs -f
```

## 🗄️ Database Management

### Initial Setup
The MongoDB container automatically:
- Creates the `capitalpay` database
- Sets up proper indexes for performance
- Creates collections for users, blog posts, and contact messages

### Backup Database
```bash
# Create backup
docker exec capitalpay-mongodb mongodump --host localhost --port 27017 --db capitalpay --out /backup

# Copy backup to host
docker cp capitalpay-mongodb:/backup ./mongodb-backup
```

### Restore Database
```bash
# Copy backup to container
docker cp ./mongodb-backup capitalpay-mongodb:/backup

# Restore from backup
docker exec capitalpay-mongodb mongorestore --host localhost --port 27017 --db capitalpay /backup/capitalpay
```

## 🔍 Health Checks

All services include health checks:
- **MongoDB**: Database connectivity test
- **Backend**: API health endpoint check
- **Frontend**: HTTP response check

Check service status:
```bash
docker-compose ps
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check what's using the port
   netstat -tulpn | grep :3000
   
   # Kill process using port
   sudo kill -9 $(lsof -t -i:3000)
   ```

2. **MongoDB Connection Issues**
   ```bash
   # Check MongoDB logs
   docker-compose logs mongodb
   
   # Restart MongoDB service
   docker-compose restart mongodb
   ```

3. **Frontend Build Failures**
   ```bash
   # Clear Docker build cache
   docker builder prune
   
   # Rebuild without cache
   docker-compose build --no-cache frontend
   ```

4. **Backend API Issues**
   ```bash
   # Check backend logs
   docker-compose logs backend
   
   # Test API health
   curl http://localhost:5000/api/health
   ```

### Clean Reset
```bash
# Stop everything and clean up
docker-compose down -v --rmi all
docker system prune -a

# Rebuild from scratch
docker-compose up --build
```

## 📊 Monitoring

### View Resource Usage
```bash
# Monitor container stats
docker stats

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Access Container Shell
```bash
# Backend container
docker exec -it capitalpay-backend sh

# MongoDB container
docker exec -it capitalpay-mongodb mongosh

# Frontend container
docker exec -it capitalpay-frontend sh
```

## 🔐 Security Considerations

### Production Deployment

1. **Change Default Passwords**
   - Update MongoDB root password
   - Change JWT secret
   - Update admin credentials

2. **Environment Variables**
   - Use Docker secrets for sensitive data
   - Never commit `.env` files with real credentials

3. **Network Security**
   - Use reverse proxy (nginx/traefik)
   - Enable HTTPS/TLS
   - Configure firewall rules

4. **Resource Limits**
   ```yaml
   # Add to docker-compose.yml
   deploy:
     resources:
       limits:
         cpus: '0.5'
         memory: 512M
   ```

## 📈 Performance Optimization

### Production Recommendations

1. **Use Multi-stage Builds** (already implemented)
2. **Enable Gzip Compression** (configured in nginx)
3. **Set up CDN** for static assets
4. **Configure MongoDB Replica Set** for high availability
5. **Use Redis** for session management and caching

## 🆘 Support

If you encounter issues:

1. Check the logs: `docker-compose logs [service-name]`
2. Verify all environment variables are set correctly
3. Ensure all required ports are available
4. Check Docker and Docker Compose versions

## 📝 Notes

- The frontend is built with Vite and served by Nginx
- The backend uses Node.js with Express framework
- MongoDB is configured with authentication enabled
- All services include proper health checks
- Volumes are used for data persistence
