export interface WatchProvidersResponse {
    id: number;
    results: { [key: string]: WatchProviders };
}

export interface WatchProviders {
    link?: string;
    flatrate?: InfoWatchProvider[];
    buy?: InfoWatchProvider[];
    rent?: InfoWatchProvider[];
}

export interface InfoWatchProvider {
    logo_path?: string;
    provider_id?: number;
    provider_name?: string;
    display_priority?: number;
}