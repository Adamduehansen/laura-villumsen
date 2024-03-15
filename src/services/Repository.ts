import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export abstract class Repository {
  protected client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }
}
