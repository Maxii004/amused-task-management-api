# Amused Task Management API

## Overview

The Amused Task Management API is a RESTful API built with Node.js, Express, and TypeScript. It provides endpoints for managing tasks and users, with features such as rate limiting, error handling, and integration with AWS services like S3 and DynamoDB.

## Features

- Task management (CRUD operations)
- User management (fetching users from an external API)
- Rate limiting
- Error handling
- Logging with Winston
- AWS S3 integration for file uploads
- DynamoDB for data storage
- Caching with DynamoDB
- Dockerized for containerized deployment
- Kubernetes deployment configuration

## Prerequisites

- Node.js (v16 or higher)
- Docker
- Kubernetes (Minikube or any other local Kubernetes cluster)
- AWS account with necessary credentials

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/amused-task-management-api.git
    cd amused-task-management-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    ```sh
    cp .env.example .env
    # Update the .env file with your AWS credentials and other configurations
    ```

## Running the Application

### Locally

1. Start the development server:
    ```sh
    npm run dev
    ```

2. The server will be running on `http://localhost:3000`.

### Docker

1. Build the Docker image:
    ```sh
    docker build -t amused-task-management-api .
    ```

2. Run the Docker container:
    ```sh
    docker run -p 3000:3000 amused-task-management-api
    ```

3. The server will be running on `http://localhost:3000`.

### Kubernetes

1. Start Minikube (or your local Kubernetes cluster):
    ```sh
    minikube start
    ```

2. Deploy the application:
    ```sh
    kubectl apply -f k8s/deployment.yaml
    kubectl apply -f k8s/service.yaml
    ```

3. Access the application:
    ```sh
    minikube service task-management-api
    ```

## Testing

1. Run tests:
    ```sh
    npm test
    ```

## Deployment

The application is configured to be deployed to an EKS cluster using GitHub Actions. The deployment workflow is defined in `.github/workflows/deploy.yml`.

### Steps in the Deployment Workflow

1. Checkout the code.
2. Configure AWS credentials.
3. Login to Amazon ECR.
4. Build, tag, and push the Docker image to Amazon ECR.
5. Install `kubectl`.
6. Configure `kubectl` for EKS.
7. Deploy to EKS.

## Best Practices

- Use environment variables to manage sensitive information.
- Implement proper error handling and logging.
- Use rate limiting to prevent abuse.
- Write comprehensive tests to cover various scenarios.

## Additional Test Cases

- **Test for invalid input data**: Create test cases that send requests with missing required fields or invalid values to ensure the API returns appropriate validation errors.
- **Test for rate limiting**: Simulate multiple requests in a short period to verify that the rate limiting middleware correctly limits the number of requests and returns a 429 status code when the limit is exceeded.
- **Test for error handling**: Mock server errors and other failure scenarios to ensure the API handles them gracefully and returns meaningful error messages to the client.
- **Test for caching behavior**: Create scenarios where data is requested multiple times to verify that the caching mechanism works correctly, ensuring cache hits return cached data and cache misses fetch fresh data from the database.

These additional test cases help ensure the robustness and reliability of the API by covering various edge cases and potential failure scenarios.


## Conclusion

This README provides a comprehensive overview of the Amused Task Management API, including installation, running the application, testing, deployment, and best practices. For more details, refer to the source code and configuration files in the repository.