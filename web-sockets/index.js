const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
  res.send('WebSocket server is running!');
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  // When a message is received from a client
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);

    // Broadcasting the message to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`Broadcast: ${message}`);
      }
    });
  });

  // Send a welcome message to the newly connected client
  ws.send('Welcome to the WebSocket server!');
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
