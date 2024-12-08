let badgeElement: HTMLElement | undefined;
const textMatcher = new RegExp(/[^\s]+/g);

export function initReadingTime() {
  const article = document.querySelector('article');
  if (article) {
    const wordCount = getWordCountFromArticle(article);
    const readingTime = calcReadingTime(wordCount);
    const insertTarget = getInsertTarget(article);
    if (badgeElement) {
      badgeElement.remove();
      badgeElement = undefined;
    } else {
      if (insertTarget) {
        badgeElement = createReadingTimeBadgeElement(readingTime);
        insertTarget.insertAdjacentElement('afterend', badgeElement);
      }
    }
  }
}
/////

function getWordCountFromArticle(element: HTMLElement) {
  const text = element.textContent ?? '';
  const words = Array.from(text.matchAll(textMatcher)) ?? [];
  return [...words].length;
}

function calcReadingTime(wordCount: number) {
  return Math.round(wordCount / 200);
}

function createReadingTimeBadgeElement(readingTime: number) {
  const badge = document.createElement('p');
  badge.classList.add('color-secondary-text', 'type--caption');
  badge.textContent = `${readingTime} min read`;

  return badge;
}

function getInsertTarget(articleEl: HTMLElement): HTMLElement | null {
  const heading = articleEl.querySelector('h1');
  const date = articleEl.querySelector('time')?.parentNode as unknown as HTMLElement | null;

  return date ?? heading ?? null;
}
