


import {
  FaGaugeHigh, FaUserGroup, FaChalkboardUser,
   FaGear,
  FaLayerGroup,
  FaSitemap,
  FaTags,
  FaBoxOpen,
  FaMapLocationDot, 
  FaCity, 
  FaMap
} from "react-icons/fa6";

export const MENU_CONFIG = [
  { id: 1, label: 'Dashboard', icon: FaGaugeHigh, type: 'link', path: '/dashboard', key: 'Dashboard' },

  // 🌍 COUNTRY
  {
    id: 50,
    label: 'Countries',
    icon: FaLayerGroup,
    type: 'dropdown',
    children: [
      { label: 'All Countries', key: 'COUNTRY_1', path: '/dashboard/countries' },
      { label: 'Add Country', key: 'COUNTRY_2', path: '/dashboard/countries/add' }
    ]
  },

  // 🏙 STATE
  {
    id: 51,
    label: 'States',
    icon: FaMapLocationDot,
    type: 'dropdown',
    children: [
      { label: 'All States', key: 'STATE_1', path: '/dashboard/states' },
      { label: 'Add State', key: 'STATE_2', path: '/dashboard/states/add' }
    ]
  },

  // 🌆 CITY
  {
    id: 52,
    label: 'Cities',
    icon: FaCity,
    type: 'dropdown',
    children: [
      { label: 'All Cities', key: 'CITY_1', path: '/dashboard/cities' },
      { label: 'Add City', key: 'CITY_2', path: '/dashboard/cities/add' }
    ]
  },

  // 📍 AREA
  {
    id: 53,
    label: 'Areas',
    icon: FaMap,
    type: 'dropdown',
    children: [
      { label: 'All Areas', key: 'AREA_1', path: '/dashboard/areas' },
      { label: 'Add Area', key: 'AREA_2', path: '/dashboard/areas/add' }
    ]
  },

  // --- CATEGORY MODULE ---
  {
    id: 54,
    label: 'Categories',
    icon: FaLayerGroup,
    type: 'dropdown',
    children: [
      { label: 'All Categories', key: 'C1', path: '/dashboard/categories' },
      { label: 'Add Category', key: 'C2', path: '/dashboard/categories/add' }
    ]
  },

  // --- UNITS MODULE ---
  {
    id: 56,
    label: 'Units',
    icon: FaLayerGroup,
    type: 'dropdown',
    children: [
      { label: 'All Units', key: 'U1', path: '/dashboard/units' },
      { label: 'Add Unit', key: 'U2', path: '/dashboard/units/add' }
    ]
  },

  // --- KEYWORD TAGS MODULE (Added) ---
  {
    id: 57,
    label: 'Keyword Tags',
    icon: FaTags,
    type: 'dropdown',
    children: [
      { label: 'All Keyword Tags', key: 'KT1', path: '/dashboard/keyword-tags' },
      { label: 'Add Keyword Tag', key: 'KT2', path: '/dashboard/keyword-tags/add' }
    ]
  },

  
  {
    id: 59,
    label: 'Products & Services',
    icon: FaBoxOpen,
    type: 'dropdown',
    children: [
      { label: 'All Products', key: 'P1', path: '/dashboard/products' },
      { label: 'Add Product', key: 'P2', path: '/dashboard/products/add' }
    ]
  },
  {
    id: 60,
    label: 'Pricing Plans',
    icon: FaTags, 
    type: 'dropdown',
    children: [
      { label: 'All Pricing Plans', key: 'PR1', path: '/dashboard/pricing' },
      { label: 'Add New Plan', key: 'PR2', path: '/dashboard/pricing/add' }
    ]
  },

  // --- SCHOOL / OTHER MODULES ---
  {
    id: 7,
    label: 'User',
    icon: FaUserGroup,
    type: 'dropdown',
    children: [
      { label: 'All Students', key: 'S1', path: '/dashboard/user-list' },
      { label: 'Add Student', key: 'S2', path: '/dashboard/add-user' },
      { label: 'Student Groups', key: 'S3', path: '/dashboard/student-groups' }
    ]
  },
  {
    id: 8, label: 'Teachers', icon: FaChalkboardUser, type: 'dropdown',
    children: [
      { label: 'All Teachers', key: 'T1', path: '/dashboard/teacher-list' },
      { label: 'Departments', key: 'T2', path: '/dashboard/departments' },
    ]
  },
  
  
  { id: 27, label: 'Settings', icon: FaGear, type: 'link', key: 'Settings', path: '/dashboard/settings' },
];