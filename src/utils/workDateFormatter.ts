const dateFormatter = new Intl.DateTimeFormat('da-DK', {
  month: 'long',
  year: 'numeric',
});

export function formatDateString(date: string) {
  return dateFormatter.format(new Date(date));
}
