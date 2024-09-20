import { page } from "fresh";
import { getWorkTeasers } from "../domain/WorkTeaser.ts";
import { define } from "../utils.ts";
import WorkTeaserBox from "../components/WorkTeaser.tsx";
import { JSX } from "preact";

export const handler = define.handlers({
  GET: async function () {
    const teasers = await getWorkTeasers();
    return page({ teasers });
  },
});

export default define.page<typeof handler>(({ data }) => {
  return (
    <ul>
      {data.teasers.map((post): JSX.Element => {
        return <WorkTeaserBox {...post} />;
      })}
    </ul>
  );
});
