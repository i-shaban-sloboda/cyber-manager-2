export const pagesPath = {
  "heroes": {
    $url: (url?: { hash?: string }) => ({ pathname: '/heroes' as const, hash: url?.hash })
  },
  "library": {
    $url: (url?: { hash?: string }) => ({ pathname: '/library' as const, hash: url?.hash })
  },
  "lobby": {
    $url: (url?: { hash?: string }) => ({ pathname: '/lobby' as const, hash: url?.hash })
  },
  "login": {
    $url: (url?: { hash?: string }) => ({ pathname: '/login' as const, hash: url?.hash })
  },
  "profile": {
    $url: (url?: { hash?: string }) => ({ pathname: '/profile' as const, hash: url?.hash })
  },
  "registration": {
    $url: (url?: { hash?: string }) => ({ pathname: '/registration' as const, hash: url?.hash })
  },
  "settings": {
    $url: (url?: { hash?: string }) => ({ pathname: '/settings' as const, hash: url?.hash })
  },
  "store": {
    $url: (url?: { hash?: string }) => ({ pathname: '/store' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
