// import { GetStaticPropsContext } from 'next';
// import { raise } from './raise';
// import { query } from './query';

// interface WPGraphQLPageDataResponse {
//   data: {
//     page: {
//       title: string;
//       content: string;
//     } | null;
//     menu: {
//       menuItems: {
//         nodes: {
//           id: string;
//           label: string;
//           path: string;
//         }[];
//       };
//     };
//     generalSettings: {
//       title: string;
//     };
//   };
// }

// interface NavigationItem {
//   id: string;
//   text: string;
//   url: string;
// }

// export interface PageData {
//   siteName: string;
//   title: string;
//   navigationItems: NavigationItem[];
// }

// function getRequestBody(context: GetStaticPropsContext): string | null {
//   if (context.params === undefined) {
//     console.log('context.params is undefined!');
//     return null;
//   }

//   const { path } = context.params;

//   let finalPath: string;
//   if (path === undefined) {
//     finalPath = '/';
//   } else if (Array.isArray(path)) {
//     finalPath = path.join('');
//   } else {
//     finalPath = path;
//   }

//   const query = `
//     query pageData {
//       page(id: "${finalPath}", idType: URI) {
//         title
//         content
//       },
//       menu(id: "dGVybToz") {
//         id,
//         menuItems {
//           nodes {
//             id
//             label
//             path
//           }
//         }
//       },
//       generalSettings {
//         title
//       }
//     }
//   `;

//   const requestBody = JSON.stringify({
//     query: query,
//     variables: null,
//     operationName: 'pageData',
//   });

//   return requestBody;
// }

// function getRequestUrl(): string {
//   const siteUrl =
//     process.env.SITE_URL ??
//     raise('Environment variable SITE_URL was not defined');

//   return `${siteUrl}/index.php?graphql`;
// }

// async function query(requestUrl: string, requestBody: string | null) {
//   return await fetch(requestUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: requestBody,
//   });
// }

// export interface GetPageDataResponse {
//   notFound: boolean;
//   data?: PageData;
// }

// export async function getPageData(
//   context: GetStaticPropsContext
// ): Promise<GetPageDataResponse> {
//   const requestUrl = getRequestUrl();
//   const requestBody = getRequestBody(context);
//   const pageDataResponse = await query(requestUrl, requestBody);
//   const { data } = (await pageDataResponse.json()) as WPGraphQLPageDataResponse;

//   console.log(data);

//   if (data.page === null) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     data: {
//       siteName: data.generalSettings.title,
//       title: data.page.title,
//       navigationItems: data.menu.menuItems.nodes.map((node): NavigationItem => {
//         return {
//           id: node.id,
//           text: node.label,
//           url: node.path,
//         };
//       }),
//     },
//     notFound: false,
//   };
// }

// type FrontpageData = PageData & {
//   workTeasers: {
//     id: string;
//     title: string;
//     date: string;
//   }[];
// };
