import { page } from "fresh";
import { getWorkTeasers } from "../domain/WorkTeaser.ts";
import { define } from "../utils.ts";

export const handler = define.handlers({
  GET: async function () {
    const teasers = await getWorkTeasers();
    return page({ teasers });
  },
});

export default define.page<typeof handler>(({ data }) => {
  return (
    <ul>
      {data.teasers.map((post) => {
        return (
          <li>
            <a href={post.path}>
              <figure>
                <img src={post.imageUrl} alt="" />
                <figcaption>
                  <span>{post.client}</span>
                  <span>{post.types}</span>
                </figcaption>
              </figure>
            </a>
          </li>
        );
      })}
    </ul>
  );
});
