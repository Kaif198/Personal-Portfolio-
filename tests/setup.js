import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const html = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');
export const $ = cheerio.load(html);
