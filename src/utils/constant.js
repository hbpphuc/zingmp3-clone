export const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
        y: {
            ticks: {
                display: false,
                autoSkip: true,
                maxTicksLimit: 5,
            },
            grid: { color: 'gray', drawTicks: false },
            border: { dash: [2, 4] },
        },
        x: {
            ticks: { color: '#a0a0a0' },
            grid: { color: 'transparent' },
        },
    },
    plugins: {
        legend: false,
    },
    hover: {
        mode: 'dataset',
        intersect: false,
    },
}
