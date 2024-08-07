function calculate() {
    const c = math.evaluate(document.getElementById('constant').value);
    const n = math.evaluate(document.getElementById('exponent').value);

    if (isNaN(c) || isNaN(n)) {
        alert('Por favor, ingrese valores válidos.');
        return;
    }

    const functionData = [];
    const derivativeData = [];

    for (let x = -50; x <= 50; x += 0.1) {
        const fx = math.evaluate(`${c} * ${x} ^ ${n}`);
        const dfx = math.evaluate(`${c} * ${n} * ${x} ^ (${n} - 1)`);

        functionData.push({ x: x, y: fx });
        derivativeData.push({ x: x, y: dfx });
    }

    let derivativeText = `d/dx (${c}x^${n}) = `;
    if (n === 0) {
        derivativeText += '0';
    } else if (n === 1) {
        derivativeText += c;
    } else {
        derivativeText += `${math.evaluate(c * n)}x^${n - 1}`;
    }

    document.getElementById('derivativeResult').textContent = derivativeText;

    const functionCtx = document.getElementById('functionChart').getContext('2d');
    new Chart(functionCtx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'f(x) = c * x^n',
                data: functionData,
                borderColor: 'blue',
                fill: false,
                showLine: true,
                parsing: {
                    xAxisKey: 'x',
                    yAxisKey: 'y'
                }
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: -50,
                    max: 50,
                    ticks: {
                        stepSize: 10
                    }
                },
                y: {
                    beginAtZero: false,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });

    const derivativeCtx = document.getElementById('derivativeChart').getContext('2d');
    new Chart(derivativeCtx, {
        type: 'line',
        data: {
            datasets: [{
                label: "f'(x) = c * n * x^(n-1)",
                data: derivativeData,
                borderColor: 'red',
                fill: false,
                showLine: true,
                parsing: {
                    xAxisKey: 'x',
                    yAxisKey: 'y'
                }
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: -50,
                    max: 50,
                    ticks: {
                        stepSize: 10
                    }
                },
                y: {
                    beginAtZero: false,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
}

function clearInputs() {
    document.getElementById('constant').value = '';
    document.getElementById('exponent').value = '';
    document.getElementById('derivativeResult').textContent = '';

    const functionCtx = document.getElementById('functionChart').getContext('2d');
    const derivativeCtx = document.getElementById('derivativeChart').getContext('2d');

    functionCtx.clearRect(0, 0, functionCtx.canvas.width, functionCtx.canvas.height);
    derivativeCtx.clearRect(0, 0, derivativeCtx.canvas.width, derivativeCtx.canvas.height);
}

