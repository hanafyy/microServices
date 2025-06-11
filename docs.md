# Microservices E-commerce Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Services](#services)
4. [API Documentation](#api-documentation)
5. [Setup Guide](#setup-guide)
6. [Development Guide](#development-guide)
7. [Deployment](#deployment)
8. [Security](#security)
9. [Troubleshooting](#troubleshooting)

## Project Overview

This is a microservices-based e-commerce application consisting of three main services:

- User Service: Handles user authentication and management
- Product Service: Manages product inventory and details
- Order Service: Processes and manages orders

### Tech Stack

- Node.js & Express.js
- MongoDB
- Docker
- JWT Authentication

## Architecture

### System Components

```
├── User Service (Port 5000)
├── Product Service (Port 5001)
├── Order Service (Port 5002)
└── MongoDB Databases
    ├── mongo-user (Port 27018)
    ├── mongo-product (Port 27019)
    └── mongo-order (Port 27020)
```

### Docker Network

All services communicate through a Docker bridge network named `micro-net`.

## Services

### 1. User Service

- **Port**: 5000
- **Database**: mongo-user (27018)
- **Features**:
  - User registration and authentication
  - JWT token generation
  - User profile management

### 2. Product Service

- **Port**: 5001
- **Database**: mongo-product (27019)
- **Features**:
  - Product CRUD operations
  - Stock management
  - Inventory tracking

### 3. Order Service

- **Port**: 5002
- **Database**: mongo-order (27020)
- **Features**:
  - Order creation and management
  - Stock verification
  - Order history

## API Documentation

### User Service Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

### Product Service Endpoints

#### Get All Products

```http
GET /api/products
```

#### Get Product by ID

```http
GET /api/products/:id
```

#### Create Product

```http
POST /api/products
Content-Type: application/json

{
    "name": "Product Name",
    "price": 99.99,
    "stock": 10
}
```

#### Update Stock

```http
PATCH /api/products/:id/decrease
Content-Type: application/json

{
    "quantity": 2
}
```

### Order Service Endpoints

#### Create Order

```http
POST /api/orders
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
    "products": [
        {
            "productId": "product_id",
            "quantity": 2
        }
    ]
}
```

#### Get User Orders

```http
GET /api/orders
Authorization: Bearer <jwt_token>
```

## Setup Guide

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- MongoDB (if running locally)

### Environment Setup

1. Clone the repository

```bash
git clone <repository-url>
cd microservices
```

2. Create environment files
   Create `.env` files in each service directory:

**userService/.env**

```
PORT=5000
MONGO_URI=mongodb://localhost:27018/user-service
JWT_SECRET=your_jwt_secret
```

**productService/.env**

```
PORT=5001
MONGO_URI=mongodb://localhost:27019/product-service
```

**orderService/.env**

```
PORT=5002
MONGO_URI=mongodb://localhost:27020/order-service
JWT_SECRET=your_jwt_secret
```

3. Install dependencies

```bash
cd userService && npm install
cd ../productService && npm install
cd ../orderService && npm install
```

### Running the Application

#### Using Docker

```bash
# Start all services
docker-compose up

# Start specific service
docker-compose up user-service
```

#### Running Locally

```bash
# Start MongoDB containers
docker-compose up mongo-user mongo-product mongo-order

# Start services
cd userService && node app.js
cd ../productService && node app.js
cd ../orderService && node app.js
```

## Development Guide

### Code Structure

Each service follows a similar structure:

```
service/
├── controllers/
├── models/
├── routes/
├── middleware/
├── app.js
└── package.json
```

### Adding New Features

1. Create feature branch
2. Implement changes
3. Write tests
4. Create pull request

### Testing

```bash
# Run tests for a service
cd userService && npm test
```

## Deployment

### Production Environment

1. Update environment variables
2. Build Docker images
3. Deploy using docker-compose

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Security

### Environment Variables

- Never commit `.env` files
- Use `.env.example` for documentation
- Rotate secrets regularly

### Authentication

- JWT tokens expire after 24 hours
- Passwords are hashed using bcrypt
- All sensitive routes require authentication

## Troubleshooting

### Common Issues

1. **MongoDB Connection Issues**

   - Check if MongoDB is running
   - Verify connection string
   - Check network connectivity

2. **Service Communication Issues**

   - Verify service names in Docker network
   - Check if all services are running
   - Verify ports are not in use

3. **Authentication Issues**
   - Check JWT token expiration
   - Verify JWT_SECRET is set
   - Check token format in Authorization header

### Logs

```bash
# View service logs
docker-compose logs user-service
docker-compose logs product-service
docker-compose logs order-service
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request
