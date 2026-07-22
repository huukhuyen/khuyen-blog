import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const root = process.cwd();
const categories = ['coding', 'nhung-dieu-dang-nho', 'suu-tam'];
const selectedPostFiles = new Map([
  ['suu-tam', new Set(['gia-tri-cua-ban-la-gi.html'])],
]);
const legacyAliases = new Map([
  [
    'coding/mot-vai-kinh-nghiem-lam-viec-voi-react.html',
    ['/coding/mot-vai-kinh-nghiem-lam-viec-voi-react'],
  ],
]);

const normalizeDate = (value) => {
  const parsed = value.replace('Posted at ', '').match(/([A-Za-z]+) (\d+), (\d{4})/);
  if (!parsed) throw new Error(`Invalid date: ${value}`);
  const months = {
    January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
    July: '07', August: '08', September: '09', October: '10', November: '11', December: '12',
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', Jun: '06', Jul: '07', Aug: '08',
    Sep: '09', Sept: '09', Oct: '10', Nov: '11', Dec: '12',
  };
  const month = months[parsed[1]];
  if (!month) throw new Error(`Unknown month: ${value}`);
  return `${parsed[3]}-${month}-${parsed[2].padStart(2, '0')}`;
};

const quote = (value) => JSON.stringify(value ?? '');

const toFrontmatter = (post) => `---
title: ${quote(post.title)}
slug: ${quote(post.slug)}
category: ${quote(post.category)}
publishedAt: ${quote(post.publishedAt)}
summary: ${quote(post.summary)}
featuredImage: ${quote(post.featuredImage)}
featuredImageAlt: ${quote(post.featuredImageAlt)}
legacyPath: ${quote(post.legacyPath)}
legacyAliases: ${JSON.stringify(post.legacyAliases)}
source: ${quote(post.source)}
embeds: ${JSON.stringify(post.embeds)}
---`;

const convertPost = async (category, file) => {
  const legacyPath = `${category}/${file}`;
  const html = await fs.readFile(path.join(root, legacyPath), 'utf8');
  const $ = load(html);
  const article = $('#main .post').first();
  const content = article.find('.description-post').first();
  const title = article.find('h2').first().text().trim();
  const publishedAt = normalizeDate(article.find('.timePost').text().trim());
  const slug = file.replace(/\.html$/, '');
  const embeds = [];
  content.find('iframe').each((index, frame) => {
    const src = $(frame).attr('src');
    if (!src) return;
    embeds.push(src);
    $(frame).replaceWith(`\n\n{{embed:${index}}}\n\n`);
  });
  const featured = content.find('img').first();
  const turndown = new TurndownService({ codeBlockStyle: 'fenced' });
  turndown.use(gfm);
  const markdown = turndown.turndown(content.html() ?? '').trim();
  const summaryElement = content.find('p').first().clone();
  summaryElement.find('br').replaceWith('\n');
  const summary = summaryElement.text()
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const post = {
    title,
    slug,
    category,
    publishedAt,
    summary,
    featuredImage: featured.attr('src') ?? '',
    featuredImageAlt: featured.attr('alt') ?? title,
    legacyPath: `/${legacyPath}`,
    legacyAliases: legacyAliases.get(legacyPath) ?? [],
    source: category === 'suu-tam' ? 'curated' : 'original',
    embeds,
  };
  const outputDir = path.join(root, 'src/content/posts', category);
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, `${slug}.md`), `${toFrontmatter(post)}\n\n${markdown}\n`);
};

for (const category of categories) {
  const files = await fs.readdir(path.join(root, category));
  const allowedFiles = selectedPostFiles.get(category);
  const posts = files.filter((file) => (
    file.endsWith('.html') &&
    !['index.html', 'page-2.html'].includes(file) &&
    (!allowedFiles || allowedFiles.has(file))
  ));
  await Promise.all(posts.map((file) => convertPost(category, file)));
}
