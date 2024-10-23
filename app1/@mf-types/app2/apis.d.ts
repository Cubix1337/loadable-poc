
    export type RemoteKeys = 'app2/Content';
    type PackageType<T> = T extends 'app2/Content' ? typeof import('app2/Content') :any;