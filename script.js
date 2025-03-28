document.addEventListener('DOMContentLoaded', () => {
    const years = Array.from({ length: 25 }, (_, i) => 2000 + i);
    const goldData = { high: [316.60, 292.85, 348.50, 417.25, 455.75, 537.50, 725.75, 841.75, 1023.50, 1218.25, 1426.00, 1896.50, 1790.00, 1692.50, 1379.00, 1298.00, 1372.60, 1351.20, 1360.25, 1542.60, 2058.40, 1954.40, 2043.30, 2115.10, 2785.87], low: [263.80, 256.70, 277.80, 319.75, 373.50, 411.50, 520.75, 608.30, 692.50, 813.00, 1052.25, 1316.00, 1537.50, 1192.75, 1144.50, 1049.60, 1073.60, 1162.00, 1176.70, 1270.05, 1472.35, 1678.00, 1626.65, 1811.27, 1992.06] };
    const silverData = { high: [5.45, 4.82, 5.10, 5.97, 8.29, 9.23, 14.94, 15.82, 20.92, 19.18, 30.70, 48.70, 37.23, 32.23, 22.05, 18.23, 20.70, 18.51, 17.62, 19.55, 29.26, 29.42, 26.90, 26.06, 34.75], low: [4.57, 4.07, 4.24, 4.37, 5.50, 6.39, 8.83, 11.67, 8.88, 10.51, 15.14, 26.16, 26.67, 18.61, 15.28, 13.70, 13.75, 15.43, 13.98, 14.32, 11.77, 21.49, 17.83, 20.01, 22.09] };
    const ratioData = { high: [64.5, 68.3, 76.1, 81.7, 67.9, 65.8, 62.4, 58.6, 81.9, 71.8, 69.7, 58.2, 60.3, 67.4, 74.6, 80.4, 80.9, 79.3, 86.7, 94.2, 125.8, 80.2, 92.1, 89.7, 91.4], low: [53.2, 58.9, 64.8, 68.4, 55.3, 54.7, 47.1, 49.8, 51.2, 58.6, 54.3, 35.7, 49.6, 55.8, 62.3, 70.1, 66.8, 70.5, 77.4, 82.6, 70.9, 65.4, 76.8, 78.3, 80.5] };

    const ctx = document.getElementById('priceChart')?.getContext('2d');
    if (ctx) {
        const isSmallScreen = () => window.innerWidth <= 600;

        const chartConfig = { 
            type: 'line', 
            data: { 
                labels: years, 
                datasets: [{ 
                    label: 'Gold High ($/oz)', 
                    data: goldData.high, 
                    borderColor: '#FFD700', 
                    fill: false, 
                    tension: 0.1 
                }, { 
                    label: 'Gold Low ($/oz)', 
                    data: goldData.low, 
                    borderColor: '#D8BFD8', 
                    fill: false, 
                    tension: 0.1 
                }] 
            }, 
            options: { 
                responsive: true,
                maintainAspectRatio: false, // Let the chart fill the container height
                scales: { 
                    x: { 
                        title: { 
                            display: true, 
                            text: 'Year',
                            font: { size: isSmallScreen() ? 12 : 14, family: 'Georgia' },
                            color: '#4B0082'
                        },
                        ticks: {
                            font: { size: isSmallScreen() ? 10 : 12 },
                            color: '#4B0082',
                            maxTicksLimit: isSmallScreen() ? 10 : 15
                        }
                    }, 
                    y: { 
                        title: { 
                            display: true, 
                            text: 'Price (USD per ounce)',
                            font: { size: isSmallScreen() ? 12 : 14, family: 'Georgia' },
                            color: '#4B0082'
                        },
                        ticks: {
                            font: { size: isSmallScreen() ? 10 : 12 },
                            color: '#4B0082'
                        },
                        beginAtZero: true 
                    } 
                }, 
                plugins: { 
                    legend: { 
                        position: isSmallScreen() ? 'bottom' : 'top',
                        labels: {
                            font: { size: isSmallScreen() ? 10 : 12, family: 'Georgia' },
                            color: '#4B0082'
                        }
                    }, 
                    title: { 
                        display: true, 
                        text: 'Gold Prices (2000-2024)',
                        font: { size: isSmallScreen() ? 14 : 16, family: 'Georgia' },
                        color: '#FFD700'
                    } 
                } 
            } 
        };

        let priceChart = new Chart(ctx, chartConfig);

        const updateChartOptions = () => {
            const smallScreen = isSmallScreen();
            priceChart.options.scales.x.title.font.size = smallScreen ? 12 : 14;
            priceChart.options.scales.x.ticks.font.size = smallScreen ? 10 : 12;
            priceChart.options.scales.x.ticks.maxTicksLimit = smallScreen ? 10 : 15;
            priceChart.options.scales.y.title.font.size = smallScreen ? 12 : 14;
            priceChart.options.scales.y.ticks.font.size = smallScreen ? 10 : 12;
            priceChart.options.plugins.legend.position = smallScreen ? 'bottom' : 'top';
            priceChart.options.plugins.legend.labels.font.size = smallScreen ? 10 : 12;
            priceChart.options.plugins.title.font.size = smallScreen ? 14 : 16;
            priceChart.update();
        };

        window.addEventListener('resize', updateChartOptions);

        const goldButton = document.getElementById('goldButton');
        const silverButton = document.getElementById('silverButton');
        const ratioButton = document.getElementById('ratioButton');

        function removeActiveClass() { 
            goldButton.classList.remove('active'); 
            silverButton.classList.remove('active'); 
            ratioButton.classList.remove('active'); 
        }

        goldButton.addEventListener('click', () => { 
            priceChart.data.datasets[0].label = 'Gold High ($/oz)'; 
            priceChart.data.datasets[0].data = goldData.high; 
            priceChart.data.datasets[0].borderColor = '#FFD700'; 
            priceChart.data.datasets[1].label = 'Gold Low ($/oz)'; 
            priceChart.data.datasets[1].data = goldData.low; 
            priceChart.data.datasets[1].borderColor = '#D8BFD8'; 
            priceChart.options.plugins.title.text = 'Gold Prices (2000-2024)'; 
            priceChart.options.scales.y.title.text = 'Price (USD per ounce)'; 
            priceChart.update(); 
            removeActiveClass(); 
            goldButton.classList.add('active'); 
        });

        silverButton.addEventListener('click', () => { 
            priceChart.data.datasets[0].label = 'Silver High ($/oz)'; 
            priceChart.data.datasets[0].data = silverData.high; 
            priceChart.data.datasets[0].borderColor = '#C0C0C0'; 
            priceChart.data.datasets[1].label = 'Silver Low ($/oz)'; 
            priceChart.data.datasets[1].data = silverData.low; 
            priceChart.data.datasets[1].borderColor = '#A9A9A9'; 
            priceChart.options.plugins.title.text = 'Silver Prices (2000-2024)'; 
            priceChart.options.scales.y.title.text = 'Price (USD per ounce)'; 
            priceChart.update(); 
            removeActiveClass(); 
            silverButton.classList.add('active'); 
        });

        ratioButton.addEventListener('click', () => { 
            priceChart.data.datasets[0].label = 'Ratio High'; 
            priceChart.data.datasets[0].data = ratioData.high; 
            priceChart.data.datasets[0].borderColor = '#FFD700'; 
            priceChart.data.datasets[1].label = 'Ratio Low'; 
            priceChart.data.datasets[1].data = ratioData.low; 
            priceChart.data.datasets[1].borderColor = '#C0C0C0'; 
            priceChart.options.plugins.title.text = 'Gold/Silver Ratio (2000-2024)'; 
            priceChart.options.scales.y.title.text = 'Ratio'; 
            priceChart.update(); 
            removeActiveClass(); 
            ratioButton.classList.add('active'); 
        });
    }
});