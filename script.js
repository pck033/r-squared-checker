document.getElementById('calculate').addEventListener('click', function () {
    const textarea = document.getElementById('excel-data');
    const tableBody = document.querySelector('#data-table tbody');
    const resultsDiv = document.getElementById('results');

    // Clear previous table and results
    tableBody.innerHTML = '';
    resultsDiv.querySelector('#equation').textContent = '';
    resultsDiv.querySelector('#r-squared').textContent = '';

    // Get the pasted data from the textarea
    const rawData = textarea.value.trim();

    if (!rawData) {
        alert('Please paste data from Excel before processing.');
        return;
    }

    // Split rows by newlines
    const rows = rawData.split('\n');
    const xValues = [];
    const yValues = [];

    rows.forEach(row => {
        // Split columns by tabs (Excel data is tab-separated)
        const cols = row.split('\t');

        if (cols.length === 2) { // Ensure there are two columns (X and Y values)
            const x = parseFloat(cols[0]);
            const y = parseFloat(cols[1]);

            if (!isNaN(x) && !isNaN(y)) {
                xValues.push(x);
                yValues.push(y);

                const newRow = document.createElement('tr');
                newRow.innerHTML = `<td>${x}</td><td>${y}</td>`;
                tableBody.appendChild(newRow);
            }
        }
    });

    const n = xValues.length;

    if (n === 0 || n !== yValues.length) {
        alert('Invalid data. Please ensure X and Y values are correctly formatted and have the same number of elements.');
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
    document.getElementById('equation').textContent = `Equation: y = ${a.toFixed(4)} * x^${b.toFixed(4)}`;
    document.getElementById('r-squared').textContent = `R-squared: ${rSquared.toFixed(4)}`;
});
