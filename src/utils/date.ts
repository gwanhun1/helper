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
