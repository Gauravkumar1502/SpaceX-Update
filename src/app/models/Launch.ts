import { Links } from './Links';

export interface Launch {
  links: Links;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean;
  failures: any[];
  details: string;
  launchpad: string;
  name: string;
  date_utc: string;
  upcoming: boolean;
  id: string;
}
