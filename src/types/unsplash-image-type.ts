export interface UnsplashImage {
  description: string;
  user: {
    username: string;
  };
  urls: {
    regular: string;
  };
  width: number;
  height: number;
}

export interface UnsplashSearchResponse {
  results: UnsplashImage[];
}
