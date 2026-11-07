const search = document.getElementById("search");
const cards = document.querySelectorAll(".tool-card");

search.addEventListener("input", () => {
    const value = search.value.toLowerCase();

    cards.forEach(card => {
        card.style.display = card.dataset.name.includes(value)
            ? "block" : "none";
    });
});

function openTool(type) {
    const workspace = document.getElementById("workspace");
    const title = document.getElementById("toolTitle");
    const content = document.getElementById("toolContent");

    workspace.style.display = "block";
    content.innerHTML = "";

    const tools = {
        calculator: {
            title: "🧮 Calculator",
            html: `
                <input type="number" id="n1" placeholder="First number">
                <select id="operator">
                    <option value="+">Addition (+)</option>
                    <option value="-">Subtraction (-)</option>
                    <option value="">Multiplication ()</option>
                    <option value="/">Division (/)</option>
                </select>
                <input type="number" id="n2" placeholder="Second number">
                <button onclick="calculate()">Calculate</button>
                <p id="result"></p>`
        },
        age: {
            title: "🎂 Age Calculator",
            html: `
                <label>Date of birth</label>
                <input type="date" id="birth">
                <button onclick="calculateAge()">Calculate Age</button>
                <p id="result"></p>`
        },
        percentage: {
            title: "📊 Percentage Calculator",
            html: `
                <input type="number" id="obtained" placeholder="Obtained marks">
                <input type="number" id="total" placeholder="Total marks">
                <button onclick="calculatePercentage()">Calculate</button>
                <p id="result"></p>`
        },
        word: {
            title: "📝 Word Counter",
            html: `
                <textarea id="text" placeholder="Enter your text..."></textarea>
                <p id="result">Words: 0 | Characters: 0</p>`
        },
        unit: {
            title: "📏 KM to Miles Converter",
            html: `
                <input type="number" id="km" placeholder="Enter kilometres">
                <button onclick="convertUnit()">Convert</button>
                <p id="result"></p>`
        },
        qr: {
            title: "📱 QR Code Generator",
            html: `
                <input type="text" id="qrText" placeholder="Enter text or URL">
                <button onclick="generateQR()">Generate QR</button>
                <div id="qrResult"></div>`
        }
    };

    title.textContent = tools[type].title;
    content.innerHTML = tools[type].html;

    if (type === "word") {
        document.getElementById("text").addEventListener("input", countWords);
    }

    workspace.scrollIntoView({ behavior: "smooth" });
}

function calculate() {
    const a = document.getElementById("n1").value;
    const b = document.getElementById("n2").value;
    const op = document.getElementById("operator").value;
    const result = document.getElementById("result");

    if (a.trim() === "" || b.trim() === "") {
        result.textContent = "Please enter both numbers.";
        return;
    }

    const x = Number(a);
    const y = Number(b);
    let answer;

    if (op === "+") answer = x + y;
    if (op === "-") answer = x - y;
    if (op === "*") answer = x * y;
    if (op === "/") {
        if (y === 0) {
            result.textContent = "Cannot divide by zero.";
            return;
        }
        answer = x / y;
    }

    result.textContent = "Result: " + answer;
}

function calculateAge() {
    const birthValue = document.getElementById("birth").value;
    const result = document.getElementById("result");

    if (!birthValue) {
        result.textContent = "Please select your birth date.";
        return;
    }

    const birth = new Date(birthValue + "T00:00:00");
    const today = new Date();

    if (birth > today) {
        result.textContent = "Birth date cannot be in the future.";
        return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    result.textContent = `Your age: ${years} years, ${months} months, ${days} days`;
}

function calculatePercentage() {
    const obtained = document.getElementById("obtained").value;
    const total = document.getElementById("total").value;
    const result = document.getElementById("result");

    if (obtained.trim() === "" || total.trim() === "") {
        result.textContent = "Please enter both values.";
        return;
    }

    const a = Number(obtained);
    const b = Number(total);

    if (a < 0 || b <= 0 || a > b) {
        result.textContent = "Enter valid marks (obtained cannot exceed total).";
        return;
    }

    result.textContent = "Percentage: " + (a / b * 100).toFixed(2) + "%";
}

function countWords() {
    const text = document.getElementById("text").value;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const characters = text.length;

   document.getElementById("result").textContent =
    `Words: ${words} | Characters: ${characters}`;
}

function convertUnit() {
    const km = document.getElementById("km").value;
    const result = document.getElementById("result");

    if (km.trim() === "" || Number(km) < 0) {
        result.textContent = "Please enter a valid distance.";
        return;
    }

    result.textContent = `${Number(km) * 0.621371} miles`;
}

function generateQR() {
    const text = document.getElementById("qrText").value.trim();
    const result = document.getElementById("qrResult");

    if (!text) {
        result.textContent = "Please enter text or a URL.";
        return;
    }

    const img = document.createElement("img");
    img.alt = "Generated QR code";
    img.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
        encodeURIComponent(text);

    result.replaceChildren(img);
}