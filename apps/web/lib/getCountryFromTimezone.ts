import * as ct from "countries-and-timezones";

export const getCountryFromTimeZone = (timezone?: string) => {
  if (!timezone) {
    return null;
  }

  const timezoneInfo = ct.getTimezone(timezone);
  if (!timezoneInfo?.countries?.length) {
    return null;
  }

  const countryCode = timezoneInfo.countries[0];
  const country = ct.getCountry(countryCode as string);

  return {
    code: countryCode,
    name: country?.name || countryCode,
  };
};

export function getCountryFlagUrl(contryCode: string) {
  return `https://flagcdn.com/w40/${contryCode.toLowerCase()}.png`;
}
