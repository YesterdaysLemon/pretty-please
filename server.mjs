import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { extname, resolve, sep } from 'node:path';

const root = fileURLToPath(new URL('./public/', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
export const server = createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end(); }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://local').pathname); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  if (pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': types['.json'], 'Cache-Control': 'no-store' });
    return res.end(req.method === 'HEAD' ? undefined : JSON.stringify({ status: 'ok', app: 'pretty-please', version: '0.1.0', sha: process.env.RELEASE_SHA || 'local' }));
  }
  const target = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!target.startsWith(root.endsWith(sep) ? root : root + sep) || pathname.includes('\\') || pathname.includes('\0')) { res.writeHead(404); return res.end('Not found'); }
  try {
    const body = await readFile(target);
    res.writeHead(200, { 'Content-Type': types[extname(target)] || 'application/octet-stream', 'Cache-Control': 'public, max-age=300', 'Content-Length': body.length });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(404, { 'Content-Type': types['.txt'] }); res.end(req.method === 'HEAD' ? undefined : 'Nothing here. Return to / for Pretty Please.'); }
});
if (process.argv[1] === fileURLToPath(import.meta.url)) server.listen(Number(process.env.PORT || 8080), process.env.HOST || '0.0.0.0', () => console.log('Pretty Please is listening.'));
