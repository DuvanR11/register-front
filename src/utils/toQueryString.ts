export const toQueryString = (params: Record<string, any>): string => {
    const queryString = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value === null) {
            continue
        } else if (value === undefined) {
            continue;
        } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
                queryString.append(`${key}[${index}]`, String(item));
            });
        } else if (typeof value === 'object') {
            console.warn(`Skipping nested object for key: ${key}`);
        } else {
            queryString.append(key, String(value));
        }
    }

    return queryString.toString();
};
