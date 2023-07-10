interface ServiceReponse<TData> {
  error?: unknown;
  data: TData;
}

interface SiteInfo {
  name: string;
}

async function getSiteInfo(
  siteName: string
): Promise<ServiceReponse<SiteInfo>> {
  const pageMetaDataResponse = await fetch(`${siteName}/wp-json?_fields=name`);
  const pageMetaDataJson = (await pageMetaDataResponse.json()) as SiteInfo;

  return {
    data: pageMetaDataJson,
  };
}

interface PageData {
  siteInfo: SiteInfo;
  notFound: false;
}

export async function getPageData(
  siteName: string
): Promise<ServiceReponse<PageData>> {
  const siteInfoResponse = await getSiteInfo(siteName);

  return {
    data: {
      notFound: false,
      siteInfo: siteInfoResponse.data,
    },
  };
}
