document.getElementById("add-product").addEventListener("click", function() {
    let table = document.getElementById("invoice-items");
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);

    row.innerHTML = `
        <td>${rowCount + 1}</td>
        <td><input type="text" placeholder="Product Details"></td>
        <td><input type="number" placeholder="Price" class="price"></td>
        <td><input type="number" placeholder="Qty" class="qty"></td>
        <td><input type="number" placeholder="GST %" class="gst"></td>
        <td class="subtotal">$0.00</td>
        <td class="total">$0.00</td>
    `;
});

document.getElementById("print-invoice").addEventListener("click", function() {
    window.print();
});

document.getElementById("invoice-date").textContent = new Date().toLocaleDateString();



document.addEventListener("input", function () {
    const rows = document.querySelectorAll("#invoice-items tr");
    let grandSubtotal = 0;
    let grandGstTotal = 0;
    let grandTotal = 0;

    rows.forEach(row => {
        const price = parseFloat(row.querySelector(".price").value) || 0;
        const qty = parseInt(row.querySelector(".qty").value) || 0;
        const gst = parseFloat(row.querySelector(".gst").value) || 0;

        const subtotal = price * qty; // Subtotal for each product
        const gstAmount = (subtotal * gst) / 100; // GST calculation
        const total = subtotal + gstAmount; // Total including GST

        row.querySelector(".subtotal").textContent = `$${subtotal.toFixed(2)}`;
        row.querySelector(".total").textContent = `$${total.toFixed(2)}`;

        // Update overall totals
        grandSubtotal += subtotal;
        grandGstTotal += gstAmount;
        grandTotal += total;
    });

    // Update the totals section
    document.getElementById("subtotal").textContent = `$${grandSubtotal.toFixed(2)}`;
    document.getElementById("gst-total").textContent = `$${grandGstTotal.toFixed(2)}`;
    document.getElementById("grand-total").textContent = `$${grandTotal.toFixed(2)}`;
});
