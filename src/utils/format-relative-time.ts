const faNumber = (num: number) => new Intl.NumberFormat("fa-IR").format(num);

export function formatRelativeTime(date: Date | string | number): string {
  const targetDate = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - targetDate.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return "همین حالا";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${faNumber(diffInMinutes)} دقیقه پیش`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${faNumber(diffInHours)} ساعت پیش`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${faNumber(diffInDays)} روز پیش`;
}
