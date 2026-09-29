/**
 * Verified business facts, in one place.
 *
 * Everything here was confirmed by the business owner on 2026-08-11 or read
 * directly off the incumbent site. Nothing in this file may be embellished — see
 * PRODUCT.md. In particular:
 *
 *   - There is NO public phone number. The old site published +1 (800) 555-0199,
 *     which is a reserved fictional number left behind by a site builder. `phone`
 *     stays null until a real number exists; every template already handles null.
 *   - There are no testimonials, client names, ratings, or awards. Do not add any.
 *   - No vehicle make or model is verified. Describe capability, never a model.
 */

export const site = {
  name: 'Jetline',
  legalName: 'Jetline Executive Ground Transportation',
  url: 'https://jetlinetransport.ca',
  email: 'jetlinegroundtransport@gmail.com',
  /** Form submissions are delivered here. Not published as a contact address. */
  formInbox: 'admin@jetlinetransport.ca',
  /** Intentionally null. See the note above — never substitute a placeholder. */
  phone: null as string | null,
  areaServed: 'Greater Toronto Area',
  region: 'ON',
  country: 'CA',
  hours: '24 hours a day, 365 days a year',
} as const;

/** Confirmed operational claims. Each one is safe to publish verbatim. */
export const proof = [
  {
    figure: '25+',
    label: 'Years in executive ground transportation',
  },
  {
    figure: '6+',
    label: 'Years supporting airline crew operations',
  },
  {
    figure: '24/7',
    label: 'Dispatch, 365 days a year',
  },
] as const;

export type Service = {
  slug: string;
  name: string;
  /** One or two short sentences. No filler, no superlatives. */
  blurb: string;
  href: string;
};

/**
 * All nine services carried over from the incumbent site, split across two
 * treatments so nothing is stated twice: three lead the homepage as large image
 * panels, the remaining six run beneath as a ruled ledger. Between them every
 * verified service is covered exactly once.
 */
export const leadServices: Service[] = [
  {
    slug: 'crew',
    name: 'Airline crew',
    blurb: 'Hotel to aircraft on the schedule the flight sets.',
    href: '/aviation/',
  },
  {
    slug: 'airport',
    name: 'Airport transfers',
    blurb: 'We watch the flight and move the pickup with it.',
    href: '/airport-transfers/',
  },
  {
    slug: 'corporate',
    name: 'Corporate',
    blurb: 'Standing accounts, roadshows, and point-to-point travel.',
    href: '/corporate/',
  },
];

export const moreServices: Service[] = [
  {
    slug: 'fbo',
    name: 'Private aviation and FBO',
    blurb: 'Planeside pickup at fixed-base operators, clear of the terminal.',
    href: '/aviation/',
  },
  {
    slug: 'executive',
    name: 'Executive and VIP',
    blurb: 'Discreet travel where the passenger, the route, and the conversation stay private.',
    href: '/corporate/',
  },
  {
    slug: 'shuttle',
    name: 'Employee shuttles',
    blurb: 'Scheduled programmes between campuses, terminals, and transit.',
    href: '/corporate/',
  },
  {
    slug: 'group',
    name: 'Events and groups',
    blurb: 'Multi-vehicle movements for conferences and company events, run as one operation.',
    href: '/corporate/',
  },
  {
    slug: 'contract',
    name: 'Dedicated contracts',
    blurb: 'Long-term arrangements with vehicles and drivers assigned to your account.',
    href: '/corporate/',
  },
  {
    slug: 'ondemand',
    name: 'On-demand dispatch',
    blurb: 'Short-notice movements at any hour, including the ones nobody planned for.',
    href: '/request/',
  },
];

export const fleet = [
  {
    name: 'Executive sedan',
    blurb: 'One or two passengers, luggage, and a quiet run into the city.',
  },
  {
    name: 'Premium SUV',
    blurb: 'Luggage that actually fits. The default for airport work.',
  },
  {
    name: 'Sprinter van',
    blurb: 'A full crew or a group, moved as one.',
  },
] as const;

export const nav = [
  { label: 'Aviation', href: '/aviation/' },
  { label: 'Corporate', href: '/corporate/' },
  { label: 'Fleet', href: '/fleet/' },
  { label: 'About', href: '/about/' },
] as const;
