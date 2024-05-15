document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const xValues = document.getElementById('x-values').value.split(',').map(Number);
    const yValues = document.getElementById('y-values').value.split(',').map(Number);

    const n = xValues.length;

    if (n !== yValues.length) {
        alert('X and Y values must have the same number of elements.');
        return;
    }

    const sumLogX = xValues.reduce((acc, val) => acc + Math.log(val), 0);
    const sumLogY = yValues.reduce((acc, val) => acc + Math.log(val), 0);
    const sumLogXLogY = xValues.reduce((acc, val, i) => acc + Math.log(val) * Math.log(yValues[i]), 0);
    const sumLogX2 = xValues.reduce((acc, val) => acc + Math.log(val) * Math.log(val), 0);

    const b = (n * sumLogXLogY - sumLogX * sumLogY) / (n * sumLogX2 - sumLogX * sumLogX);
    const a = Math.exp((sumLogY - b * sumLogX) / n);

    const yMean = yValues.reduce((acc, val) => acc + val, 0) / n;

    // Calculate SSres and SStot using natural logarithms
    const ssTot = yValues.reduce((acc, val) => acc + Math.pow(Math.log(val) - Math.log(yMean), 2), 0);
    const ssRes = yValues.reduce((acc, val, i) => acc + Math.pow(Math.log(val) - Math.log(a) - b * Math.log(xValues[i]), 2), 0);
    const rSquared = 1 - (ssRes / ssTot);

    document.getElementById('equation').textContent = `Equation: y = ${a.toFixed(4)} * ln(x)^${b.toFixed(4)}`;
    document.getElementById('r-squared').textContent = `R-squared: ${rSquared.toFixed(4)}`;
});
