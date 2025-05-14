document.addEventListener('DOMContentLoaded', function() {
    // Set chart defaults to match theme
    Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
    Chart.defaults.borderColor = 'rgba(128, 128, 128, 0.1)';
    Chart.defaults.font.family = "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    
    // Sample data for visualizations
    // In a real application, this data would be loaded from the actual dataset
    
    // Create age distribution chart
    const ageCtx = document.getElementById('age-distribution').getContext('2d');
    new Chart(ageCtx, {
        type: 'bar',
        data: {
            labels: ['18-20', '21-23', '24-26', '27-30', '31+'],
            datasets: [{
                label: 'Age Distribution',
                data: [120, 180, 90, 40, 20],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Age Distribution of Students',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 10,
                    cornerRadius: 4
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        drawBorder: false,
                        color: 'rgba(128, 128, 128, 0.1)'
                    },
                    ticks: {
                        padding: 10
                    },
                    title: {
                        display: true,
                        text: 'Number of Students',
                        padding: {
                            bottom: 10
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        padding: 10
                    },
                    title: {
                        display: true,
                        text: 'Age Group',
                        padding: {
                            top: 10
                        }
                    }
                }
            }
        }
    });

    // Create gender distribution chart
    const genderCtx = document.getElementById('gender-distribution').getContext('2d');
    new Chart(genderCtx, {
        type: 'doughnut',
        data: {
            labels: ['Male', 'Female', 'Other'],
            datasets: [{
                label: 'Gender Distribution',
                data: [210, 230, 10],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 206, 86, 0.8)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
                hoverOffset: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                title: {
                    display: true,
                    text: 'Gender Distribution',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 10,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.formattedValue;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.raw / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // Create depression factors correlation chart
    const factorsCtx = document.getElementById('depression-factors').getContext('2d');
    new Chart(factorsCtx, {
        type: 'bar',
        data: {
            labels: ['Academic Pressure', 'Sleep Duration', 'Financial Stress', 'Work Pressure', 'Family History'],
            datasets: [{
                label: 'Correlation with Depression',
                data: [0.65, 0.58, 0.72, 0.48, 0.53],
                backgroundColor: [
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Factors Correlated with Depression',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 10,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            return `Correlation: ${context.formattedValue}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 1,
                    grid: {
                        display: true,
                        drawBorder: false,
                        color: 'rgba(128, 128, 128, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1);
                        },
                        padding: 10
                    },
                    title: {
                        display: true,
                        text: 'Correlation Coefficient',
                        padding: {
                            top: 10
                        }
                    }
                },
                y: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        padding: 10
                    }
                }
            }
        }
    });

    // Handle horizontal scrolling for data table
    const tableContainer = document.querySelector('.table-responsive');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    const scrollTrack = document.querySelector('.scroll-track');
    const scrollThumb = document.querySelector('.scroll-thumb');
    
    if (tableContainer && scrollLeftBtn && scrollRightBtn && scrollTrack && scrollThumb) {
        // Scroll amount for buttons
        const scrollAmount = 200;
        
        // Update thumb position based on scroll position
        function updateThumbPosition() {
            const scrollPercentage = tableContainer.scrollLeft / (tableContainer.scrollWidth - tableContainer.clientWidth);
            const thumbPosition = scrollPercentage * (scrollTrack.clientWidth - scrollThumb.clientWidth);
            scrollThumb.style.left = `${thumbPosition}px`;
        }
        
        // Scroll left button click
        scrollLeftBtn.addEventListener('click', function() {
            tableContainer.scrollLeft -= scrollAmount;
            updateThumbPosition();
        });
        
        // Scroll right button click
        scrollRightBtn.addEventListener('click', function() {
            tableContainer.scrollLeft += scrollAmount;
            updateThumbPosition();
        });
        
        // Handle thumb drag
        let isDragging = false;
        let startX, startLeft;
        
        scrollThumb.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX;
            startLeft = parseFloat(getComputedStyle(scrollThumb).left) || 0;
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const dx = e.clientX - startX;
            const newLeft = startLeft + dx;
            const maxLeft = scrollTrack.clientWidth - scrollThumb.clientWidth;
            
            // Constrain thumb position within track
            const constrainedLeft = Math.max(0, Math.min(newLeft, maxLeft));
            scrollThumb.style.left = `${constrainedLeft}px`;
            
            // Set scroll position of table
            const scrollPercentage = constrainedLeft / maxLeft;
            tableContainer.scrollLeft = scrollPercentage * (tableContainer.scrollWidth - tableContainer.clientWidth);
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        // Update thumb position when scrolling the table directly
        tableContainer.addEventListener('scroll', function() {
            updateThumbPosition();
        });
        
        // Initial thumb position and setup
        function initializeScrolling() {
            // Check if the table is wider than its container
            const hasHorizontalScroll = tableContainer.scrollWidth > tableContainer.clientWidth;
            
            // Show/hide scroll controls based on whether scrolling is needed
            if (hasHorizontalScroll) {
                scrollTrack.parentElement.style.display = 'flex';
            } else {
                scrollTrack.parentElement.style.display = 'none';
            }
            
            updateThumbPosition();
            
            // Set thumb width based on visible portion
            const thumbWidthPercent = (tableContainer.clientWidth / tableContainer.scrollWidth) * 100;
            const thumbWidth = Math.max(10, Math.min(thumbWidthPercent, 100));
            scrollThumb.style.width = `${thumbWidth}%`;
        }
        
        // Initial setup
        window.addEventListener('load', initializeScrolling);
        
        // Update on window resize
        window.addEventListener('resize', initializeScrolling);
    }

    // Handle theme changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            setTimeout(() => {
                // Update chart colors when theme changes
                Chart.instances.forEach(chart => chart.update());
            }, 300);
        });
    }
}); 