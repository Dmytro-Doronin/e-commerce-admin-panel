import {basePath} from '../app.routes';

export const userLinks = [
  {link: `${basePath}/users`, iconName: 'group', title: 'Users'},
  {link: `${basePath}/login`, iconName: 'logout', title: 'Logout'},
]

export const adminLinks = [
  {link: `${basePath}/products`, iconName: 'dataset', title: 'Products'},
  {link: `${basePath}/categories`, iconName: 'menu', title: 'Categories'},
]
