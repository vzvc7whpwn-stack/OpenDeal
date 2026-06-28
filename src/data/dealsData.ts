/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Deal } from '../types';

export const DEALS_DATA: Deal[] = [
  {
    id: 'deal-01',
    title: 'Apple iPad Pro 11" M4 (256GB, Wi-Fi)',
    description: 'Open box item in pristine condition. Unopened accessories, standard Apple warranty applies. Box has minor label scuffs.',
    category: 'Electronics',
    price: 749,
    originalPrice: 999,
    discountPercent: 25,
    condition: 'Open Box - Pristine',
    storeName: 'Best Buy Outlet',
    storeLocation: {
      lat: 34.0522 + 0.015,
      lng: -118.2437 - 0.022,
      city: 'Los Angeles',
      state: 'CA',
      address: '11301 Pico Blvd, Los Angeles, CA 90064',
      storeName: 'Best Buy Outlet #188'
    },
    shippingAvailable: true,
    onlineReferralRate: 4,
    referralEarningType: 'percentage',
    referralEarningValue: 30,
    originalProductUrl: 'https://www.bestbuy.com/ipad-pro-m4',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    popularityScore: 94,
    comps: [
      {
        id: 'comp-01a',
        title: 'iPad Pro 11" M4 (256GB) - Open Box',
        storeName: 'Target Liquidators',
        price: 729,
        originalPrice: 999,
        condition: 'Box Damaged - New',
        distanceMiles: 3.2,
        driveTimeMins: 8,
        lat: 34.0522 + 0.028,
        lng: -118.2437 - 0.012,
        address: '8985 Venice Blvd, Los Angeles, CA 90034',
        savingsMessage: 'Saves $20 extra, but 8 mins further drive.'
      },
      {
        id: 'comp-01b',
        title: 'iPad Pro 11" M4 (256GB) - Grade A',
        storeName: 'Micro Center Clearance',
        price: 760,
        originalPrice: 999,
        condition: 'Refurbished',
        distanceMiles: 1.8,
        driveTimeMins: 4,
        lat: 34.0522 + 0.005,
        lng: -118.2437 - 0.015,
        address: '1100 S Westmoreland Ave, Los Angeles, CA 90006',
        savingsMessage: '4 mins closer but costs $11 more.'
      }
    ]
  },
  {
    id: 'deal-02',
    title: 'DeWalt 20V MAX XR Brushless 6-Tool Combo Kit',
    description: 'Excess contractor stock liquidation. Complete heavy-duty tool kit. Packaging has tear-throughs, but all tools are brand new with full manufacturer seals.',
    category: 'Tools & Home',
    price: 389,
    originalPrice: 649,
    discountPercent: 40,
    condition: 'Box Damaged - New',
    storeName: 'Home Depot Liquidation Center',
    storeLocation: {
      lat: 41.8781 - 0.025,
      lng: -87.6298 + 0.035,
      city: 'Chicago',
      state: 'IL',
      address: '1300 S Clinton St, Chicago, IL 60607',
      storeName: 'Home Depot Liquidation #094'
    },
    shippingAvailable: false,
    onlineReferralRate: 6,
    referralEarningType: 'percentage',
    referralEarningValue: 23.34,
    originalProductUrl: 'https://www.homedepot.com/dewalt-combo-kit',
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80',
    popularityScore: 88,
    comps: [
      {
        id: 'comp-02a',
        title: 'DeWalt 20V Brushless Combo Kit',
        storeName: 'Lowe\'s Outlet Depot',
        price: 369,
        originalPrice: 649,
        condition: 'Open Box - Excellent',
        distanceMiles: 2.1,
        driveTimeMins: 5,
        lat: 41.8781 - 0.012,
        lng: -87.6298 + 0.018,
        address: '2639 N Elston Ave, Chicago, IL 60647',
        savingsMessage: 'Saves $20 and is 5 mins away! Highly recommended.'
      },
      {
        id: 'comp-02b',
        title: 'DeWalt 20V 5-Tool Kit (No bag)',
        storeName: 'Harbor Freight Salvage',
        price: 310,
        originalPrice: 549,
        condition: 'Clearance Pallet',
        distanceMiles: 6.4,
        driveTimeMins: 14,
        lat: 41.8781 - 0.045,
        lng: -87.6298 + 0.055,
        address: '3200 S Kedzie Ave, Chicago, IL 60623',
        savingsMessage: 'Cheaper, but missing 1 tool and 14 mins away.'
      }
    ]
  },
  {
    id: 'deal-03',
    title: 'Samsung Bespoke 4-Door French Door Refrigerator',
    description: 'High-end smart refrigerator with beverage center. Floor model clearance. Minor hairline scratch on left steel panel (less than 1 inch). Completely tested and fully functional.',
    category: 'Appliances',
    price: 1499,
    originalPrice: 3199,
    discountPercent: 53,
    condition: 'Open Box - Excellent',
    storeName: 'Sears Hometown Outlet',
    storeLocation: {
      lat: 29.7604 + 0.032,
      lng: -95.3698 - 0.015,
      city: 'Houston',
      state: 'TX',
      address: '10900 Gulf Fwy, Houston, TX 77034',
      storeName: 'Sears Liquidation Houston'
    },
    shippingAvailable: false,
    onlineReferralRate: 5,
    referralEarningType: 'flat',
    referralEarningValue: 75.00,
    originalProductUrl: 'https://www.samsung.com/bespoke-refrigerator',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
    popularityScore: 97,
    comps: [
      {
        id: 'comp-03a',
        title: 'Samsung French Door Fridge - Blemished',
        storeName: 'Appliance Direct Outlet',
        price: 1399,
        originalPrice: 3199,
        condition: 'Box Damaged - New',
        distanceMiles: 4.8,
        driveTimeMins: 11,
        lat: 29.7604 + 0.015,
        lng: -95.3698 - 0.038,
        address: '4112 Old Spanish Trail, Houston, TX 77021',
        savingsMessage: 'Save an extra $100! 11 mins drive.'
      },
      {
        id: 'comp-03b',
        title: 'Samsung Bespoke Smart Fridge',
        storeName: 'Best Buy Warehouse Outlet',
        price: 1650,
        originalPrice: 3199,
        condition: 'Open Box - Pristine',
        distanceMiles: 1.2,
        driveTimeMins: 3,
        lat: 29.7604 + 0.038,
        lng: -95.3698 - 0.005,
        address: '5130 Richmond Ave, Houston, TX 77056',
        savingsMessage: 'Pristine condition and 3 mins away, but costs $151 more.'
      }
    ]
  },
  {
    id: 'deal-04',
    title: 'Sony WH-1000XM5 Noise Canceling Headphones',
    description: 'Slightly worn retail display unit. Fully cleaned, sanitized, and tested. Sounds incredible. Comes in standard hard-shell travel case. USB-C charging cord included.',
    category: 'Electronics',
    price: 219,
    originalPrice: 399,
    discountPercent: 45,
    condition: 'Refurbished',
    storeName: 'Sony Outlet Store',
    storeLocation: {
      lat: 32.7767 - 0.012,
      lng: -96.7970 - 0.018,
      city: 'Dallas',
      state: 'TX',
      address: '2200 N Central Expy, Dallas, TX 75204',
      storeName: 'Sony Refurbish Dallas'
    },
    shippingAvailable: true,
    onlineReferralRate: 8,
    referralEarningType: 'percentage',
    referralEarningValue: 17.52,
    originalProductUrl: 'https://www.sony.com/wh1000xm5',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    popularityScore: 91,
    comps: [
      {
        id: 'comp-04a',
        title: 'Sony WH-1000XM5 Headphones - Clean',
        storeName: 'Micro Center Clearance',
        price: 239,
        originalPrice: 399,
        condition: 'Open Box - Excellent',
        distanceMiles: 1.5,
        driveTimeMins: 3,
        lat: 32.7767 - 0.005,
        lng: -96.7970 - 0.011,
        address: '13929 N Central Expy, Dallas, TX 75243',
        savingsMessage: 'Excellent open box grade, 3 mins drive, costs $20 more.'
      },
      {
        id: 'comp-04b',
        title: 'Sony WH-1000XM5 - Box Only Damaged',
        storeName: 'Liquidators Depot',
        price: 199,
        originalPrice: 399,
        condition: 'Box Damaged - New',
        distanceMiles: 5.1,
        driveTimeMins: 12,
        lat: 32.7767 - 0.035,
        lng: -96.7970 - 0.025,
        address: '4220 LBJ Freeway, Dallas, TX 75244',
        savingsMessage: 'Saves $20, but 12 mins further out.'
      }
    ]
  },
  {
    id: 'deal-05',
    title: 'Mega Liquidation Pallet: Mixed Home Goods & Kitchen Tools',
    description: 'Premium Amazon overstock liquidation pallet. Packed with estimated 45-60 items including air fryers, instant pots, cookware sets, and smart scales. Perfect for resellers.',
    category: 'Liquidation Pallets',
    price: 499,
    originalPrice: 1850,
    discountPercent: 73,
    condition: 'Clearance Pallet',
    storeName: 'USA Pallet Liquidation Corp',
    storeLocation: {
      lat: 33.7490 + 0.024,
      lng: -84.3880 - 0.018,
      city: 'Atlanta',
      state: 'GA',
      address: '1420 Marietta Blvd NW, Atlanta, GA 30318',
      storeName: 'USA Pallet Depot Atlanta'
    },
    shippingAvailable: false,
    onlineReferralRate: 10,
    referralEarningType: 'flat',
    referralEarningValue: 50.00,
    originalProductUrl: 'https://www.palletbid.com/amazon-home-pallet',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
    popularityScore: 96,
    comps: [
      {
        id: 'comp-05a',
        title: 'Tier 1 Amazon Kitchen Pallet',
        storeName: 'ATL Wholesale Pallets',
        price: 450,
        originalPrice: 1600,
        condition: 'Clearance Pallet',
        distanceMiles: 4.5,
        driveTimeMins: 9,
        lat: 33.7490 + 0.012,
        lng: -84.3880 - 0.045,
        address: '500 Fulton Industrial Blvd SW, Atlanta, GA 30336',
        savingsMessage: 'Saves $49. 9 mins drive, slightly smaller box density.'
      },
      {
        id: 'comp-05b',
        title: 'Premium Electronics Liquidation Pallet',
        storeName: 'Bulq Atlanta Depot',
        price: 650,
        originalPrice: 2400,
        condition: 'Clearance Pallet',
        distanceMiles: 3.1,
        driveTimeMins: 6,
        lat: 33.7490 + 0.045,
        lng: -84.3880 - 0.012,
        address: '1200 Lake Mirror Rd, Atlanta, GA 30349',
        savingsMessage: 'Higher-value electronics items. 6 mins away, costs $151 more.'
      }
    ]
  },
  {
    id: 'deal-06',
    title: 'Crate & Barrel Wells Leather Swivel Chair',
    description: 'Floor inventory model in Chestnut brown top-grain leather. Rotates 360 degrees. Frame is structurally flawless. Extremely light rubbing wear on the lower back piping.',
    category: 'Furniture',
    price: 520,
    originalPrice: 1199,
    discountPercent: 57,
    condition: 'Open Box - Excellent',
    storeName: 'Crate & Barrel Clearance Hub',
    storeLocation: {
      lat: 25.7617 - 0.015,
      lng: -80.1918 + 0.022,
      city: 'Miami',
      state: 'FL',
      address: '7300 SW 57th Ave, Miami, FL 33143',
      storeName: 'Crate & Barrel Outlet #405'
    },
    shippingAvailable: false,
    onlineReferralRate: 7,
    referralEarningType: 'percentage',
    referralEarningValue: 36.40,
    originalProductUrl: 'https://www.crateandbarrel.com/wells-leather-chair',
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&auto=format&fit=crop&q=80',
    popularityScore: 84,
    comps: [
      {
        id: 'comp-06a',
        title: 'Crate & Barrel Wells Chair (Camel)',
        storeName: 'West Elm Clearance Depot',
        price: 490,
        originalPrice: 1199,
        condition: 'Box Damaged - New',
        distanceMiles: 1.4,
        driveTimeMins: 3,
        lat: 25.7617 - 0.018,
        lng: -80.1918 + 0.008,
        address: '3201 Buena Vista Blvd, Miami, FL 33127',
        savingsMessage: 'Saves $30 and only 3 mins away. camel leather instead of chestnut.'
      }
    ]
  },
  {
    id: 'deal-07',
    title: 'LG UltraGear 34" OLED Curved Gaming Monitor',
    description: 'Box-damaged stock item. Outer cardboard had forklift puncture, but screen panel, electronic boards, and calibration tests are completely unaffected. Brand new accessory box.',
    category: 'Electronics',
    price: 649,
    originalPrice: 1199,
    discountPercent: 46,
    condition: 'Box Damaged - New',
    storeName: 'Best Buy Liquidation Store',
    storeLocation: {
      lat: 40.7128 + 0.018,
      lng: -74.0060 - 0.015,
      city: 'New York',
      state: 'NY',
      address: '529 5th Ave, New York, NY 10017',
      storeName: 'Best Buy Midtown Liquidation'
    },
    shippingAvailable: true,
    onlineReferralRate: 5,
    referralEarningType: 'percentage',
    referralEarningValue: 32.45,
    originalProductUrl: 'https://www.bestbuy.com/lg-ultragear-34-oled',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
    popularityScore: 95,
    comps: [
      {
        id: 'comp-07a',
        title: 'LG 34" Curved OLED Monitor',
        storeName: 'B&H Photo Video Used Dept',
        price: 680,
        originalPrice: 1199,
        condition: 'Open Box - Excellent',
        distanceMiles: 1.1,
        driveTimeMins: 4,
        lat: 40.7128 + 0.024,
        lng: -74.0060 - 0.005,
        address: '420 9th Ave, New York, NY 10001',
        savingsMessage: 'No cardboard damage but costs $31 more.'
      },
      {
        id: 'comp-07b',
        title: 'LG UltraGear 34" OLED - Mint',
        storeName: 'Adorama Used Store',
        price: 630,
        originalPrice: 1199,
        condition: 'Refurbished',
        distanceMiles: 2.3,
        driveTimeMins: 8,
        lat: 40.7128 + 0.005,
        lng: -74.0060 - 0.025,
        address: '42 W 18th St, New York, NY 10011',
        savingsMessage: 'Saves $19 but is 8 mins away in heavy Manhattan traffic.'
      }
    ]
  },
  {
    id: 'deal-08',
    title: 'Breville Barista Touch Espresso Machine',
    description: 'Customer return open box item. Disassembled, fully steam-cleaned, scale removed, and fully detailed. 100% operation rate. Comes with milk pitcher, portafilter, and starter cleaning tablets.',
    category: 'Appliances',
    price: 599,
    originalPrice: 999,
    discountPercent: 40,
    condition: 'Open Box - Excellent',
    storeName: 'Seattle Coffee Outlet',
    storeLocation: {
      lat: 47.6062 - 0.012,
      lng: -122.3321 + 0.015,
      city: 'Seattle',
      state: 'WA',
      address: '2700 Duwamish Ave S, Seattle, WA 98134',
      storeName: 'Seattle Liquidation Coffee Depot'
    },
    shippingAvailable: true,
    onlineReferralRate: 6,
    referralEarningType: 'percentage',
    referralEarningValue: 35.94,
    originalProductUrl: 'https://www.breville.com/barista-touch',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    popularityScore: 92,
    comps: [
      {
        id: 'comp-08a',
        title: 'Breville Barista Touch (Black Truffle)',
        storeName: 'Williams Sonoma Outlet',
        price: 649,
        originalPrice: 999,
        condition: 'Open Box - Pristine',
        distanceMiles: 3.5,
        driveTimeMins: 8,
        lat: 47.6062 - 0.025,
        lng: -122.3321 + 0.035,
        address: 'University Village, Seattle, WA 98105',
        savingsMessage: 'Costs $50 more but has original premium black finish.'
      },
      {
        id: 'comp-08b',
        title: 'Breville Barista Touch Espresso - Box Wear',
        storeName: 'Sur La Table Clearance',
        price: 579,
        originalPrice: 999,
        condition: 'Box Damaged - New',
        distanceMiles: 1.1,
        driveTimeMins: 3,
        lat: 47.6062 - 0.005,
        lng: -122.3321 + 0.011,
        address: '84 Pine St, Seattle, WA 98101',
        savingsMessage: 'Saves $20 and is 3 mins closer! Highly recommended.'
      }
    ]
  },
  {
    id: 'deal-09',
    title: 'DeWalt 12" Double Bevel Compound Miter Saw',
    description: 'Open-box item in pristine condition. Never used to cut wood. Display piece. Blade, instructions, dust collection bag, and material clamp included.',
    category: 'Tools & Home',
    price: 299,
    originalPrice: 599,
    discountPercent: 50,
    condition: 'Open Box - Pristine',
    storeName: 'Home Depot Outlet Store',
    storeLocation: {
      lat: 34.0522 - 0.025,
      lng: -118.2437 + 0.032,
      city: 'Los Angeles',
      state: 'CA',
      address: '5600 Sunset Blvd, Los Angeles, CA 90028',
      storeName: 'Home Depot Sunset Outlet'
    },
    shippingAvailable: false,
    onlineReferralRate: 5,
    referralEarningType: 'flat',
    referralEarningValue: 20.00,
    originalProductUrl: 'https://www.homedepot.com/dewalt-miter-saw',
    imageUrl: 'https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=600&auto=format&fit=crop&q=80',
    popularityScore: 89,
    comps: [
      {
        id: 'comp-09a',
        title: 'DeWalt 12" Miter Saw - Damaged Box',
        storeName: 'Lowe\'s Liquidation Depot',
        price: 285,
        originalPrice: 599,
        condition: 'Box Damaged - New',
        distanceMiles: 2.5,
        driveTimeMins: 6,
        lat: 34.0522 - 0.015,
        lng: -118.2437 + 0.015,
        address: '12148 Burbank Blvd, Los Angeles, CA 91607',
        savingsMessage: 'Saves $14 and only 6 mins away.'
      }
    ]
  },
  {
    id: 'deal-10',
    title: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    description: 'Refurbished vacuum directly by Dyson technicians. Completely checked and working at full suction. Replaced with clean filter, multi-surface brush roll, and mini motorized brush.',
    category: 'Appliances',
    price: 349,
    originalPrice: 749,
    discountPercent: 53,
    condition: 'Refurbished',
    storeName: 'Dyson Direct Refurb Hub',
    storeLocation: {
      lat: 41.8781 + 0.028,
      lng: -87.6298 - 0.018,
      city: 'Chicago',
      state: 'IL',
      address: '640 N La Salle Dr, Chicago, IL 60654',
      storeName: 'Dyson Center Chicago'
    },
    shippingAvailable: true,
    onlineReferralRate: 8,
    referralEarningType: 'percentage',
    referralEarningValue: 27.92,
    originalProductUrl: 'https://www.dyson.com/v15-detect',
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80',
    popularityScore: 93,
    comps: [
      {
        id: 'comp-10a',
        title: 'Dyson V15 Detect - Open Box',
        storeName: 'Target Liquidation Store',
        price: 380,
        originalPrice: 749,
        condition: 'Open Box - Excellent',
        distanceMiles: 1.4,
        driveTimeMins: 3,
        lat: 41.8781 + 0.015,
        lng: -87.6298 - 0.005,
        address: '1154 S Clark St, Chicago, IL 60605',
        savingsMessage: 'Slightly higher price ($31 more) but original pristine box.'
      }
    ]
  }
];

export const REGIONS_LIST = [
  { city: 'All Regions', state: 'USA' },
  { city: 'Los Angeles', state: 'CA' },
  { city: 'Chicago', state: 'IL' },
  { city: 'Houston', state: 'TX' },
  { city: 'Dallas', state: 'TX' },
  { city: 'Atlanta', state: 'GA' },
  { city: 'Miami', state: 'FL' },
  { city: 'New York', state: 'NY' },
  { city: 'Seattle', state: 'WA' }
];
