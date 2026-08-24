export type NavItem = {
  key: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'matches', href: '/matches' },
  { key: 'squad', href: '/squad' },
  { key: 'standings', href: '/standings' },
  { key: 'news', href: '/news' },
  { key: 'club', href: '/club' },
];
