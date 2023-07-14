import { ServiceResponse, WorkTeaser } from '@/utils/models';
import { query } from '@/utils/query';

interface WorkTeaserGraphQL {
  id: string;
  title: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  workData: {
    date: string;
  };
}

interface WorkTeaserWPGraphQLResponse {
  data: {
    posts: {
      nodes: WorkTeaserGraphQL[];
    };
  };
}

function toWorkTeaser({
  id,
  title,
  workData,
  featuredImage,
}: WorkTeaserGraphQL): WorkTeaser {
  return {
    id: id,
    title: title,
    date: workData.date,
    image: {
      src: featuredImage.node.sourceUrl,
      alt: featuredImage.node.altText,
    },
  };
}

export async function getWorkTeasers(): Promise<ServiceResponse<WorkTeaser[]>> {
  const worksResponse = await query(`
    query FrontpageData {
      posts {
        nodes {
          id
          title
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          workData {
            date
          }
        }
      }
    }
  `);
  const { data } = (await worksResponse.json()) as WorkTeaserWPGraphQLResponse;

  return {
    data: data.posts.nodes.map(toWorkTeaser),
  };
}
