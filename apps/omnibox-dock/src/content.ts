(async () => {
  // Sends a message to the service worker and receives a tip in response
  const { tip } = await chrome.runtime.sendMessage({ greeting: 'tip' });

  const nav = document.querySelector('.upper-tabs > nav');

  const fontVarRef = '--devsite-primary-font-family';
  const tipWidget = createDomElement(`
    <button type="button" popovertarget="tip-popover" popovertargetaction="show" style="padding: 0 12px; height: 36px;">
      <span style="display: block; font: var(--devsite-link-font,500 14px/20px var(${fontVarRef}));">Tip</span>
    </button>
  `);

  const popover = createDomElement(`<div id='tip-popover' popover style="margin: auto;">${tip}</div>`);

  if (!nav || !popover || !tipWidget) {
    return;
  }

  document.body.append(popover);
  nav.append(tipWidget);
})();

function createDomElement(html: any) {
  const dom = new DOMParser().parseFromString(html, 'text/html');
  return dom.body.firstElementChild;
}
