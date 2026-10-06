export const formatDate = (date: Date | string | null, locale: string, includeTime: boolean = false): string => {
  if (!date) return "Unknown";

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const localeString = locale === 'es' ? 'es-ES' : 'en-US';

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (includeTime) {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit'
    };
    return dateObj.toLocaleDateString(localeString, dateOptions) + ' ' +
           dateObj.toLocaleTimeString(localeString, timeOptions);
  }

  return dateObj.toLocaleDateString(localeString, dateOptions);
};

export function formatExperiencePeriod(startDate: Date, endDate: Date | null, locale: string): string {
  const localeString = locale === 'es' ? 'es-ES' : 'en-US';
  const monthYearFormat: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit' };
  const end = endDate ?? new Date();

  const startStr = startDate.toLocaleDateString(localeString, monthYearFormat);
  const endStr = endDate
    ? endDate.toLocaleDateString(localeString, monthYearFormat)
    : locale === 'es' ? 'actualidad' : 'Present';

  let totalMonths = (end.getFullYear() - startDate.getFullYear()) * 12
    + (end.getMonth() - startDate.getMonth());
  if (totalMonths < 1) totalMonths = 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let duration: string;
  if (locale === 'es') {
    const parts: string[] = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? 'año' : 'años'}`);
    if (months > 0 || years === 0) parts.push(`${months} ${months === 1 ? 'mes' : 'meses'}`);
    duration = parts.join(' ');
  } else {
    const parts: string[] = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
    if (months > 0 || years === 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
    duration = parts.join(' ');
  }

  return `${startStr} - ${endStr} (${duration})`;
}
