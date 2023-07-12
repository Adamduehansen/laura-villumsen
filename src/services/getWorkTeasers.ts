import { ServiceResponse, WorkTeaser } from '@/utils/models';
import { query } from '@/utils/query';

interface WorkTeaserGraphQL {
  id: string;
  title: string;
  workData: {
    date: string;
  };
}

interface GetWorkTeaserData {
  data: {
    posts: {
      nodes: WorkTeaserGraphQL[];
    };
  };
}

function toWorkTeaser({ id, title, workData }: WorkTeaserGraphQL): WorkTeaser {
  return {
    id: id,
    title: title,
    date: workData.date,
  };
}

export async function getWorkTeasers(): Promise<ServiceResponse<WorkTeaser[]>> {
  const workTeasersQuery = `
    query FrontpageData {
      posts {
        nodes {
          id
          title
          workData {
            date
          }
        }
      }
    }
  `;

  const worksResponse = await query(workTeasersQuery);
  const { data } = (await worksResponse.json()) as GetWorkTeaserData;

  return {
    data: data.posts.nodes.map(toWorkTeaser),
  };
}
