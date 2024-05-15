document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values and split them into arrays of numbers
    const xValues = document.getElementById('xValues').value.trim().split(/\s+/).map(Number);
    const yValues = document.getElementById('yValues').value.trim().split(/\s+/).map(Number);

    // Check if both arrays have the same length
    if (xValues.length !== yValues.length) {
        document.getElementById('rSquaredResult').textContent = 'The number of X and Y values must be the same.';
        return;
    }

    // Transform both data sets to their natural logarithms
    const logXValues = xValues.map(x => Math.log(x));
    const logYValues = yValues.map(y => Math.log(y));

    // Calculate the means of the logarithm values
    const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    const meanLogX = mean(logXValues);
    const meanLogY = mean(logYValues);

    let ssTotal = 0;
    let covariance = 0;
    let varianceLogX = 0;
    let varianceLogY = 0;

    for (let i = 0; i < logXValues.length; i++) {
        const xDiff = logXValues[i] - meanLogX;
        const yDiff = logYValues[i] - meanLogY;
        covariance += xDiff * yDiff;
        varianceLogX += xDiff * xDiff;
        varianceLogY += yDiff * yDiff;
        ssTotal += yDiff * yDiff;
    }

    // Calculate the correlation coefficient
    const correlation = covariance / Math.sqrt(varianceLogX * varianceLogY);
    // Calculate R-squared
    const rSquared = correlation * correlation;

    // Calculate the slope (b) and intercept (log(a)) of the linear regression on the log-transformed data
    const slope = covariance / varianceLogX;
    const intercept = meanLogY - slope * meanLogX;

    // Calculate a and b for the power regression equation y = ax^b
    const a = Math.exp(intercept);
    const b = slope;

    // Display the results
    document.getElementById('rSquaredResult').textContent = `R-Squared: ${rSquared.toFixed(4)}`;
    document.getElementById('powerEquationResult').textContent = `Power Regression Equation: y = ${a.toFixed(4)} * x^${b.toFixed(4)}`;
});
