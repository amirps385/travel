// app/composables/useCountries.ts
export interface CountryEntry {
  name: string
  iso2: string
  iso3?: string
  dial_code: string
  timezones: string[]
  emoji?: string
}

export const COUNTRIES: CountryEntry[] = [
  { name: 'United States', iso2: 'US', iso3: 'USA', dial_code: '+1', timezones: ['America/New_York','America/Chicago','America/Denver','America/Los_Angeles'], emoji: '🇺🇸' },
  { name: 'United Kingdom', iso2: 'GB', iso3: 'GBR', dial_code: '+44', timezones: ['Europe/London'], emoji: '🇬🇧' },
  { name: 'India', iso2: 'IN', iso3: 'IND', dial_code: '+91', timezones: ['Asia/Kolkata'], emoji: '🇮🇳' },
  { name: 'Tanzania', iso2: 'TZ', iso3: 'TZA', dial_code: '+255', timezones: ['Africa/Dar_es_Salaam'], emoji: '🇹🇿' },
  { name: 'Kenya', iso2: 'KE', iso3: 'KEN', dial_code: '+254', timezones: ['Africa/Nairobi'], emoji: '🇰🇪' },
  { name: 'South Africa', iso2: 'ZA', iso3: 'ZAF', dial_code: '+27', timezones: ['Africa/Johannesburg'], emoji: '🇿🇦' },
  { name: 'Australia', iso2: 'AU', iso3: 'AUS', dial_code: '+61', timezones: ['Australia/Sydney','Australia/Perth','Australia/Adelaide'], emoji: '🇦🇺' },
  { name: 'Canada', iso2: 'CA', iso3: 'CAN', dial_code: '+1', timezones: ['America/Toronto','America/Vancouver'], emoji: '🇨🇦' },
  { name: 'Germany', iso2: 'DE', iso3: 'DEU', dial_code: '+49', timezones: ['Europe/Berlin'], emoji: '🇩🇪' },
  { name: 'France', iso2: 'FR', iso3: 'FRA', dial_code: '+33', timezones: ['Europe/Paris'], emoji: '🇫🇷' },
  { name: 'Italy', iso2: 'IT', iso3: 'ITA', dial_code: '+39', timezones: ['Europe/Rome'], emoji: '🇮🇹' },
  { name: 'Spain', iso2: 'ES', iso3: 'ESP', dial_code: '+34', timezones: ['Europe/Madrid'], emoji: '🇪🇸' },
  { name: 'Netherlands', iso2: 'NL', iso3: 'NLD', dial_code: '+31', timezones: ['Europe/Amsterdam'], emoji: '🇳🇱' },
  { name: 'Sweden', iso2: 'SE', iso3: 'SWE', dial_code: '+46', timezones: ['Europe/Stockholm'], emoji: '🇸🇪' },
  { name: 'Norway', iso2: 'NO', iso3: 'NOR', dial_code: '+47', timezones: ['Europe/Oslo'], emoji: '🇳🇴' },
  { name: 'Brazil', iso2: 'BR', iso3: 'BRA', dial_code: '+55', timezones: ['America/Sao_Paulo'], emoji: '🇧🇷' },
  { name: 'Argentina', iso2: 'AR', iso3: 'ARG', dial_code: '+54', timezones: ['America/Argentina/Buenos_Aires'], emoji: '🇦🇷' },
  { name: 'Mexico', iso2: 'MX', iso3: 'MEX', dial_code: '+52', timezones: ['America/Mexico_City'], emoji: '🇲🇽' },
  { name: 'Japan', iso2: 'JP', iso3: 'JPN', dial_code: '+81', timezones: ['Asia/Tokyo'], emoji: '🇯🇵' },
  { name: 'China', iso2: 'CN', iso3: 'CHN', dial_code: '+86', timezones: ['Asia/Shanghai'], emoji: '🇨🇳' },
  { name: 'Indonesia', iso2: 'ID', iso3: 'IDN', dial_code: '+62', timezones: ['Asia/Jakarta'], emoji: '🇮🇩' },
  { name: 'Thailand', iso2: 'TH', iso3: 'THA', dial_code: '+66', timezones: ['Asia/Bangkok'], emoji: '🇹🇭' },
  { name: 'Vietnam', iso2: 'VN', iso3: 'VNM', dial_code: '+84', timezones: ['Asia/Ho_Chi_Minh'], emoji: '🇻🇳' },
  { name: 'Philippines', iso2: 'PH', iso3: 'PHL', dial_code: '+63', timezones: ['Asia/Manila'], emoji: '🇵🇭' },
  { name: 'Singapore', iso2: 'SG', iso3: 'SGP', dial_code: '+65', timezones: ['Asia/Singapore'], emoji: '🇸🇬' },
  { name: 'United Arab Emirates', iso2: 'AE', iso3: 'ARE', dial_code: '+971', timezones: ['Asia/Dubai'], emoji: '🇦🇪' },
  { name: 'Saudi Arabia', iso2: 'SA', iso3: 'SAU', dial_code: '+966', timezones: ['Asia/Riyadh'], emoji: '🇸🇦' },
  { name: 'Turkey', iso2: 'TR', iso3: 'TUR', dial_code: '+90', timezones: ['Europe/Istanbul'], emoji: '🇹🇷' },
  { name: 'Egypt', iso2: 'EG', iso3: 'EGY', dial_code: '+20', timezones: ['Africa/Cairo'], emoji: '🇪🇬' },
  { name: 'Morocco', iso2: 'MA', iso3: 'MAR', dial_code: '+212', timezones: ['Africa/Casablanca'], emoji: '🇲🇦' },
  { name: 'Nigeria', iso2: 'NG', iso3: 'NGA', dial_code: '+234', timezones: ['Africa/Lagos'], emoji: '🇳🇬' },
  { name: 'Ghana', iso2: 'GH', iso3: 'GHA', dial_code: '+233', timezones: ['Africa/Accra'], emoji: '🇬🇭' },
  { name: 'Uganda', iso2: 'UG', iso3: 'UGA', dial_code: '+256', timezones: ['Africa/Kampala'], emoji: '🇺🇬' },
  { name: 'Rwanda', iso2: 'RW', iso3: 'RWA', dial_code: '+250', timezones: ['Africa/Kigali'], emoji: '🇷🇼' },
  { name: 'Malawi', iso2: 'MW', iso3: 'MWI', dial_code: '+265', timezones: ['Africa/Blantyre'], emoji: '🇲🇼' },
  { name: 'Zambia', iso2: 'ZM', iso3: 'ZMB', dial_code: '+260', timezones: ['Africa/Lusaka'], emoji: '🇿🇲' },
  { name: 'Mozambique', iso2: 'MZ', iso3: 'MOZ', dial_code: '+258', timezones: ['Africa/Maputo'], emoji: '🇲🇿' },
  { name: 'Portugal', iso2: 'PT', iso3: 'PRT', dial_code: '+351', timezones: ['Europe/Lisbon'], emoji: '🇵🇹' },
  { name: 'Switzerland', iso2: 'CH', iso3: 'CHE', dial_code: '+41', timezones: ['Europe/Zurich'], emoji: '🇨🇭' },
  { name: 'Belgium', iso2: 'BE', iso3: 'BEL', dial_code: '+32', timezones: ['Europe/Brussels'], emoji: '🇧🇪' },
  { name: 'Poland', iso2: 'PL', iso3: 'POL', dial_code: '+48', timezones: ['Europe/Warsaw'], emoji: '🇵🇱' },
  { name: 'Austria', iso2: 'AT', iso3: 'AUT', dial_code: '+43', timezones: ['Europe/Vienna'], emoji: '🇦🇹' },
  { name: 'Ireland', iso2: 'IE', iso3: 'IRL', dial_code: '+353', timezones: ['Europe/Dublin'], emoji: '🇮🇪' },
  { name: 'Greece', iso2: 'GR', iso3: 'GRC', dial_code: '+30', timezones: ['Europe/Athens'], emoji: '🇬🇷' },
  { name: 'Czech Republic', iso2: 'CZ', iso3: 'CZE', dial_code: '+420', timezones: ['Europe/Prague'], emoji: '🇨🇿' }
]

// Helper functions
export const findCountryByIso2 = (iso2: string) => {
  if (!iso2) return null
  return COUNTRIES.find(c => c.iso2.toUpperCase() === iso2.toUpperCase()) || null
}

export const findCountryByName = (name: string) => {
  if (!name) return null
  const q = name.toLowerCase()
  return COUNTRIES.find(c => c.name.toLowerCase() === q || c.name.toLowerCase().includes(q)) || null
}

export const searchCountries = (q: string) => {
  if (!q) return COUNTRIES
  const s = q.toLowerCase()
  return COUNTRIES.filter(c => c.name.toLowerCase().includes(s) || c.iso2.toLowerCase() === s || (c.dial_code && c.dial_code.includes(q)))
}

export const getDialCode = (iso2OrName: string) => {
  if (!iso2OrName) return ''
  const byIso = findCountryByIso2(iso2OrName)
  if (byIso) return byIso.dial_code
  const byName = findCountryByName(iso2OrName)
  if (byName) return byName.dial_code
  return ''
}

export const getPrimaryTimezone = (iso2OrName: string) => {
  const c = findCountryByIso2(iso2OrName) || findCountryByName(iso2OrName)
  return c ? (c.timezones && c.timezones.length ? c.timezones[0] : '') : ''
}

// Composable function
export function useCountries() {
  return {
    COUNTRIES,
    findCountryByIso2,
    findCountryByName,
    searchCountries,
    getDialCode,
    getPrimaryTimezone
  }
}

// Default export
export default useCountries