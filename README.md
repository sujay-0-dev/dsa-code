# DSA API

A Node.js/Express API that provides implementations and examples of various Data Structures and Algorithms (DSA) concepts.

## Features

This API provides endpoints for learning and understanding various data structure implementations, including:

- **Single Linked List (SLL)** - Insert, delete, and traverse operations
- Additional data structure endpoints for common DSA concepts

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone or navigate to the project directory:
```bash
cd dsa-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and configure the port:
```env
PORT=3000
```

## Usage

### Starting the Server

```bash
node server.js
```

The server will start on the port specified in your `.env` file (default: 3000).

### API Endpoints

#### Single Linked List (SLL)
- **GET** `/sll` - Returns C code implementation of Single Linked List with all operations

## Project Structure

```
dsa-api/
├── server.js       # Main Express server
├── package.json    # Project dependencies and metadata
├── .env           # Environment variables
└── README.md      # This file
```

## Dependencies

- **express** (^5.2.1) - Web framework for Node.js
- **dotenv** (^17.3.1) - Environment variable manager

## Development

To modify the API or add new endpoints, edit `server.js` and add new route handlers using Express.

Example:
```javascript
app.get("/endpoint", (req, res) => {
  res.send("response");
});
```

## Configuration

The application uses environment variables for configuration:

- `PORT` - The port on which the server runs (default: 3000)

Configure these in the `.env` file in the project root.

## License

ISC

## Author

Sujay
