import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';

export const getSortedPostData = async () => {
  const postPath = path.join(process.cwd(), 'public', 'posts');
  const postNames = await fsPromises.readdir(postPath);
  const allPostsData = postNames
    .filter((name) => name !== '.DS_Store') // remove /DS_Store
    .map((name) => {
      // remove the extension name .md
      const id = name.replace('.md', '');
      const mdContent = fs.readFileSync(path.join(postPath, name), {
        encoding: 'utf-8',
      });
      // use gray-matter to parse the post metadata section
      const matterData = matter(mdContent);
      return {
        id,
        ...matterData.data,
        date: format(matterData.data.date, 'LLLL d, yyyy'),
      };
    });
  // sort
  return allPostsData.sort(({ date: a }, { date: b }) => {
    const timeA = new Date(a);
    const timeB = new Date(b);
    return timeB.getTime() - timeA.getTime();
  });
};

export const getAllIds = async () => {
  const postPath = path.join(process.cwd(), 'public', 'posts');
  const postNames = await fsPromises.readdir(postPath);
  return postNames
    .filter((name) => name != '.DS_Store')
    .map((name) => ({
      params: {
        id: name.replace('.md', ''),
      },
    }));
};

export const getPostById = async (id) => {
  const postPath = path.join(process.cwd(), 'public', 'posts', `${id}.md`);
  const mdContent = await fsPromises.readFile(path.join(postPath), {
    encoding: 'utf-8',
  });
  // use gray-matter to parse the post metadata section
  const matterData = matter(mdContent);
  // md --> html and highlight codeblock
  const content = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(matterData.content);
  const htmlContent = content.value;
  return {
    id,
    date: format(matterData.data.date, 'LLLL d, yyyy'),
    title: matterData.data.title,
    htmlContent,
  };
};
