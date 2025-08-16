const getIdFromUrl = (url: string) => Number(url.match(/\/pokemon\/(\d+)\/?$/)?.[1] ?? 0);

export default getIdFromUrl;
