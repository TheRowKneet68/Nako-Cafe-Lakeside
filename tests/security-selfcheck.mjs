// Self-check for the HTML-escaping used in email HTML. Run:
//   node tests/security-selfcheck.mjs
import assert from 'node:assert/strict'
import { escapeHtml } from '../src/lib/escape.js'

const payloads = [
  '<script>alert("x")</script>',
  "' OR '1'='1 --",
  '<img src=x onerror=alert(1)>',
  `Tom & Jerry's "quotes"`,
  '../../../../../etc/passwd',
  '{{template}}',
  '${process.env}',
  '`<svg onload=alert(1)>`',
  '<b>bold <i>italic</i></b>'
]

for (const payload of payloads) {
  const out = escapeHtml(payload)
  assert.ok(!/[<>"']/.test(out), `raw markup survived escaping for: ${payload}`)
  assert.ok(!/&(?!amp;|lt;|gt;|quot;|#39;)/.test(out), `raw ampersand survived escaping for: ${payload}`)
}

assert.equal(escapeHtml(null), '')
assert.equal(escapeHtml(undefined), '')
assert.equal(escapeHtml(123), '123')
assert.equal(escapeHtml('2 < 3 & 4 > 1'), '2 &lt; 3 &amp; 4 &gt; 1')

// Regression guard: the data modules must import without errors. A TDZ
// "can't access lexical declaration before initialization" crash here used to
// take down the whole deployed site (defaultSettings referenced images /
// defaultSections before they were declared).
const { defaultSettings } = await import('../src/data/siteData.js')
assert.ok(defaultSettings.heroImage?.startsWith('https://'), 'defaultSettings.heroImage missing')
assert.ok(defaultSettings.sections?.stats?.length > 0, 'defaultSettings.sections.stats missing')
assert.ok(defaultSettings.sections?.pageHeaders?.contact, 'defaultSettings.sections.pageHeaders missing')

console.log(`escapeHtml passed ${payloads.length + 4} assertions; data modules import cleanly`)