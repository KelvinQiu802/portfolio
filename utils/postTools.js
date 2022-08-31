import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';

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
    return timeA.getTime() - timeB.getTime();
  });
};
