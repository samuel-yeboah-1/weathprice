const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
};

const getDaysAgo = (daysBack) => {
    const date = new Date();
    date.setDate(date.getDate() - daysBack);
    return date;
};

const formatPriceData = (data) => {
    const result = {};
    Object.entries(data).forEach(([coinId, priceData]) => {
        result[coinId] = {
            price: priceData.usd,
            priceChange24h: priceData.usd_24h_change,
            volume24h: priceData.usd_24h_vol,
            lastUpdate: new Date(priceData.last_updated_at * 1000)
        };
    });
    return result;
};

export {formatDate, getDaysAgo, formatPriceData}