import { ServiceResponse, WorkTeaser } from '@/utils/models';
import { query } from '@/utils/query';

interface WorkTeaserGraphQL {
  id: string;
  title: string;
  uri: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        height: number;
        width: number;
      };
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
  uri,
}: WorkTeaserGraphQL): WorkTeaser {
  return {
    id: id,
    title: title,
    path: uri,
    date: workData.date,
    image: {
      src: featuredImage.node.sourceUrl,
      alt: featuredImage.node.altText,
      width: featuredImage.node.mediaDetails.width,
      height: featuredImage.node.mediaDetails.height,
    },
  };
}

function byDescendingDate(
  workTeaserA: WorkTeaser,
  workTeaserB: WorkTeaser
): number {
  if (workTeaserA.date > workTeaserB.date) {
    return -1;
  } else if (workTeaserA.date < workTeaserB.date) {
    return 1;
  } else {
    return 0;
  }
}

export async function getWorkTeasers(): Promise<ServiceResponse<WorkTeaser[]>> {
  const worksResponse = await query(`
    query FrontpageData {
      posts {
        nodes {
          id
          title
          uri
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                height
                width
              }
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
    data: data.posts.nodes.map(toWorkTeaser).sort(byDescendingDate),
  };
}
