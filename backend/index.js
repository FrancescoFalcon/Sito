const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 10000;

// --- Connessione a MongoDB Atlas ---
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB connesso a MongoDB Atlas'))
  .catch(err => console.error('Errore DB:', err));

// --- Server HTTP ---
const server = http.createServer((req, res) => {
  // --- Gestione API ---
  if (req.url.startsWith('/api')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'API funzionante!' }));
    return;
  }

  // --- Servire file statici frontend Vue ---
  let filePath = path.join(__dirname, '../frontend/dist', req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = ext === '.js' ? 'text/javascript' :
                      ext === '.css' ? 'text/css' :
                      ext === '.html' ? 'text/html' :
                      ext === '.json' ? 'application/json' :
                      'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // se il file non esiste, serve index.html per SPA routing
      if (req.url !== '/' && req.url !== '/index.html') {
        fs.readFile(path.join(__dirname, '../frontend/dist/index.html'), (e, c) => {
          if (e) {
            res.writeHead(500);
            res.end('Errore server');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(c);
          }
        });
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

// --- Avvio server ---
server.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server in ascolto su porta ${PORT}`);
});
