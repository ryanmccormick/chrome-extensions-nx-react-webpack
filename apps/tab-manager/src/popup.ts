async function init() {
  await initTabs();
  await initGroupButton();
}

init();
////////

async function initGroupButton() {
  const tabs = await getTabs();
  const button = document.querySelector('button');
  if (!button || !tabs) {
    return;
  }

  button.addEventListener('click', async () => {
    const tabIds = (tabs ?? []).map((tab) => tab.id).filter((tabId) => tabId) as Array<number>;

    if (tabIds.length > 0) {
      // @ts-ignore
      const group = await chrome.tabs.group({ tabIds });
      // @ts-ignore
      await chrome.tabGroups.update(group, { title: 'DOCS' });
    }
  });
}

async function initTabs() {
  const tabEntryList = document.querySelector('ul');

  if (!tabEntryList) {
    return;
  }

  const tabs = await getTabs();
  const tabElements = getTabElements(tabs);

  tabEntryList.append(...tabElements);
}

async function getTabs() {
  const collator = new Intl.Collator();
  const tabs = await chrome.tabs.query({
    url: ['https://developer.chrome.com/docs/webstore/*', 'https://developer.chrome.com/docs/extensions/*'],
  });

  return (tabs ?? []).sort((a, b) => collator.compare(a.title!, b.title!));
}

function getTabElements(tabList: Array<chrome.tabs.Tab>) {
  return (tabList ?? []).map(generateTabEntry);
}

function generateTabEntry(tab: chrome.tabs.Tab) {
  const titleStr = (tab.title ?? '').split('-')[0].trim();
  const pathnameStr = new URL(tab.url ?? '').pathname.slice('/docs'.length);

  const listEl = document.createElement('li');
  const linkEl = document.createElement('a');

  const titleEl = document.createElement('h3');
  titleEl.classList.add('title');
  titleEl.textContent = titleStr;

  const paragraphEl = document.createElement('p');
  paragraphEl.classList.add('pathname');
  paragraphEl.textContent = pathnameStr;

  linkEl.addEventListener('click', async () => {
    await chrome.tabs.update(tab.id!, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  });

  linkEl.appendChild(titleEl);
  linkEl.appendChild(paragraphEl);
  listEl.appendChild(linkEl);

  return listEl;
}
