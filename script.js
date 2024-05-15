document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const xValues = document.getElementById('x-values').value.split(',').map(Number);
    const yValues = document.getElementById('y-values').value.split(',').map(Number);

    const n = xValues.length;

    if (n !== yValues.length) {
        alert('X and Y values must have the same number of elements.');
        return;
    }

    // Convert values to their natural logarithms
    const lnXValues = xValues.map(val => Math.log(val));
    const lnYValues = yValues.map(val => Math.log(val));

    // Calculate sums and intermediate values
    const sumLogX = lnXValues.reduce((acc, val) => acc + val, 0);
    const sumLogY = lnYValues.reduce((acc, val) => acc + val, 0);
    const sumLogXLogY = lnXValues.reduce((acc, val, i) => acc + val * lnYValues[i], 0);
    const sumLogX2 = lnXValues.reduce((acc, val) => acc + val * val, 0);

    // Calculate the coefficients for the regression line
    const b = (n * sumLogXLogY - sumLogX * sumLogY) / (n * sumLogX2 - sumLogX * sumLogX);
    const a = Math.exp((sumLogY - b * sumLogX) / n);

    // Calculate the mean of the logarithm of y-values
    const logYMean = sumLogY / n;

    // Calculate the total sum of squares (SStot)
    const ssTot = lnYValues.reduce((acc, val) => acc + Math.pow(val - logYMean, 2), 0);

    // Calculate the residual sum of squares (SSres)
    const ssRes = lnYValues.reduce((acc, val, i) => acc + Math.pow(val - (Math.log(a) + b * lnXValues[i]), 2), 0);

    // Calculate the R-squared value
    const rSquared = 1 - (ssRes / ssTot);

    // Display the results
    document.getElementById('x-values-display').textContent = `X Values: ${xValues.join(', ')}`;
    document.getElementById('y-values-display').textContent = `Y Values: ${yValues.join(', ')}`;
    document.getElementById('equation').textContent = `Equation: y = ${a.toFixed(4)} * x^${b.toFixed(4)}`;
    document.getElementById('r-squared').textContent = `R-squared: ${rSquared.toFixed(4)}`;
});
