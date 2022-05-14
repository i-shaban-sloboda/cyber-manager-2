export const pagesPath = {
  "lobby": {
    $url: (url?: { hash?: string }) => ({ pathname: '/lobby' as const, hash: url?.hash })
  },
  "login": {
    $url: (url?: { hash?: string }) => ({ pathname: '/login' as const, hash: url?.hash })
  },
  "registration": {
    $url: (url?: { hash?: string }) => ({ pathname: '/registration' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
