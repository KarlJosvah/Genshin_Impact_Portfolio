export const MenuType = {
  Attributes: 'Attributes',
  Weapons: 'Weapons',
  Artifacts: 'Artifacts',
  Constellation: 'Constellation',
  Talents: 'Talents',
  Profile: 'Profile',
} as const;

export type MenuType = typeof MenuType[keyof typeof MenuType];


export interface MenuItem {
  id: MenuType;
  label: string;
  description: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { id: MenuType.Attributes, label: 'Attributes', description: 'Overview / Bio' },
  { id: MenuType.Weapons, label: 'Weapons', description: 'Tech Stack' },
  { id: MenuType.Artifacts, label: 'Artifacts', description: 'Skills & Specs' },
  { id: MenuType.Constellation, label: 'Constellation', description: 'Milestones' },
  { id: MenuType.Talents, label: 'Talents', description: 'Key Projects' },
  { id: MenuType.Profile, label: 'Profile', description: 'Contact & Links' },
];
