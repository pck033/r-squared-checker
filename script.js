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
    const ssTot = yValues.reduce((acc, val) => acc + Math.pow(val - yMean, 2), 0);
    const ssRes = yValues.reduce((acc, val, i) => acc + Math.pow(val - a * Math.pow(xValues[i], b), 2), 0);
    const rSquared = 1 - (ssRes / ssTot);

    document.getElementById('equation').textContent = `Equation: y = ${a.toFixed(4)} * x^${b.toFixed(4)}`;
    document.getElementById('r-squared').textContent = `R-squared: ${rSquared.toFixed(4)}`;
});
