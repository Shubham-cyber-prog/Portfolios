const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalExpense = document.getElementById("total-expense");

let expenses = [];
const budgetLimit = 1000;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const expenseName = document.getElementById("expense-name").value.trim();
    const expenseAmount = parseFloat(
        document.getElementById("expense-amount").value
    );

    if (expenseName !== "" && !isNaN(expenseAmount) && expenseAmount > 0) {
        expenses.push({
            name: expenseName,
            amount: expenseAmount,
        });

        updateExpenseList();
        updateTotalExpense();
        form.reset();
    } else {
        alert("Please enter a valid expense name and amount.");
    }
});


function updateExpenseList() {
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");

        li.textContent = `${expense.name}: $${expense.amount.toFixed(2)} `;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            expenses.splice(index, 1);
            updateExpenseList();
            updateTotalExpense();
        });

        li.appendChild(deleteButton);
        expenseList.appendChild(li);
    });
}


function updateTotalExpense() {
    const total = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    totalExpense.textContent = `Total Expense: $${total.toFixed(2)}`;

    if (total > budgetLimit) {
        totalExpense.style.color = "red";
    } else {
        totalExpense.style.color = "green";
    }
}