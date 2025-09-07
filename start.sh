#!/bin/bash

# CapitalPay Docker Startup Script
# This script helps you start the CapitalPay application with Docker

set -e

echo "🚀 Starting CapitalPay Application with Docker"
echo "============================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file with default values..."
    cat > .env << EOF
# Database Configuration
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=capitalpayadmin123

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production-2024
JWT_EXPIRE=7d

# Admin Configuration
ADMIN_EMAIL=admin@capitalpay.com
ADMIN_PASSWORD=admin123

# API URL
VITE_API_URL=http://localhost:5000/api
EOF
    echo "✅ .env file created with default values"
fi

# Parse command line arguments
ENVIRONMENT="development"
BUILD_FLAG="--build"
DETACHED=""

while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--production)
            ENVIRONMENT="production"
            shift
            ;;
        -d|--detached)
            DETACHED="-d"
            shift
            ;;
        --no-build)
            BUILD_FLAG=""
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  -p, --production    Start in production mode"
            echo "  -d, --detached     Run in detached mode (background)"
            echo "  --no-build         Don't rebuild containers"
            echo "  -h, --help         Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option $1"
            exit 1
            ;;
    esac
done

# Set compose file based on environment
if [ "$ENVIRONMENT" = "production" ]; then
    COMPOSE_FILE="docker-compose.prod.yml"
    echo "🏭 Starting in PRODUCTION mode"
else
    COMPOSE_FILE="docker-compose.yml"
    echo "🛠️  Starting in DEVELOPMENT mode"
fi

echo "📦 Using compose file: $COMPOSE_FILE"

# Stop any running containers
echo "🛑 Stopping any running containers..."
docker-compose -f $COMPOSE_FILE down

# Start the services
echo "🚀 Starting services..."
if [ -n "$DETACHED" ]; then
    echo "🔄 Running in detached mode..."
    docker-compose -f $COMPOSE_FILE up $BUILD_FLAG $DETACHED
    
    echo ""
    echo "✅ CapitalPay is starting in the background!"
    echo "📊 Check status with: docker-compose -f $COMPOSE_FILE ps"
    echo "📋 View logs with: docker-compose -f $COMPOSE_FILE logs -f"
else
    docker-compose -f $COMPOSE_FILE up $BUILD_FLAG
fi

# Show access information
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000/api"
echo "   API Health: http://localhost:5000/api/health"
echo ""
echo "🗄️  Database:"
echo "   MongoDB: localhost:27017"
echo "   Database: capitalpay"
echo ""
echo "🔧 Management:"
echo "   Stop: docker-compose -f $COMPOSE_FILE down"
echo "   Logs: docker-compose -f $COMPOSE_FILE logs -f"
echo "   Status: docker-compose -f $COMPOSE_FILE ps"
