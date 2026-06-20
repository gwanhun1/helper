export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return {
    date: date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric'
    }),
    time: date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  };
};

export const formatRelativeDate = (dateStr: string | undefined): string => {
  if (!dateStr) return "";
  try {
    let date = new Date(dateStr);
    if (isNaN(date.getTime()) && dateStr.includes("/")) {
      const [month, day, year] = dateStr.split("/");
      date = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    }
    if (isNaN(date.getTime())) return dateStr;

    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMs / 3600000);
    const diffDay = Math.floor(diffMs / 86400000);

    if (diffMin < 1) return "방금 전";
    if (diffMin < 60) return `${diffMin}분 전`;
    if (diffHour < 24) return `${diffHour}시간 전`;
    if (diffDay === 1) return "어제";
    if (diffDay < 7) return `${diffDay}일 전`;
    return date.toISOString().split("T")[0];
  } catch {
    return dateStr ?? "";
  }
};
