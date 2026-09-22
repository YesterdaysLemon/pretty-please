import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { server } from '../server.mjs';
let origin;
before(async () => { await new Promise(r => server.listen(0, '127.0.0.1', r)); origin = `http://127.0.0.1:${server.address().port}`; });
after(() => new Promise(r => server.close(r)));
test('health reports exact release and no request cache', async () => {
  process.env.RELEASE_SHA = 'test-sha'; const r = await fetch(origin + '/healthz');
  assert.equal(r.status, 200); assert.equal((await r.json()).sha, 'test-sha'); assert.equal(r.headers.get('cache-control'), 'no-store');
});
test('site and browser assets load with restrictive CSP', async () => {
  for (const path of ['/', '/style.css', '/app.js', '/favicon.svg', '/social.svg']) {
    const r = await fetch(origin + path); assert.equal(r.status, 200, path); assert.match(r.headers.get('content-security-policy'), /frame-ancestors 'none'/);
    assert.ok((await r.text()).length > 10);
  }
});
test('the artwork has no authority API and cannot serve local source', async () => {
  for (const path of ['/api/approve', '/server.mjs', '/..%5cserver.mjs', '/%2e%2e%2fserver.mjs', '/%00']) assert.equal((await fetch(origin + path)).status, 404, path);
  assert.equal((await fetch(origin + '/', { method: 'POST' })).status, 405);
});
test('all local asset links and chapter destinations resolve', async () => {
  const html = await (await fetch(origin)).text();
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#]+)"/g)) assert.equal((await fetch(origin + match[1])).status, 200, match[1]);
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${match[1]}"`), match[1]);
  assert.doesNotMatch(html, /PrettyPlease\.exe|Download for Windows|mcp_servers/);
});
