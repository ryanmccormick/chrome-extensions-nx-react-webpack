export async function getBrowserTabs() {
  const collator = new Intl.Collator();
  const tabs = await chrome.tabs.query({
    url: ['https://developer.chrome.com/docs/webstore/*', 'https://developer.chrome.com/docs/extensions/*'],
  });

  return (tabs ?? []).sort((a, b) => collator.compare(a.title!, b.title!));
}
