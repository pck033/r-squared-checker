document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const xValues = document.getElementById('xValues').value.split(',').map(Number);
    const yValues = document.getElementById('yValues').value.split(',').map(Number);

    if (xValues.length !== yValues.length) {
        document.getElementById('result').textContent = 'The number of X and Y values must be the same.';
        return;
    }

    const n = xValues.length;

    const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    const meanX = mean(xValues);
    const meanY = mean(yValues);

    let ssTotal = 0;
    let ssReg = 0;
    let covariance = 0;
    let varianceX = 0;
    let varianceY = 0;

    for (let i = 0; i < n; i++) {
        const xDiff = xValues[i] - meanX;
        const yDiff = yValues[i] - meanY;
        covariance += xDiff * yDiff;
        varianceX += xDiff * xDiff;
        varianceY += yDiff * yDiff;
        ssTotal += yDiff * yDiff;
    }

    const correlation = covariance / Math.sqrt(varianceX * varianceY);
    const rSquared = correlation * correlation;

    document.getElementById('result').textContent = `R-Squared: ${rSquared.toFixed(4)}`;
});
