export const formateLastActivityDate = (date: string): string => {
    return new Date(date).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
};