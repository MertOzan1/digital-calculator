
import calculate from "./calculator.js";

// HTML elemanlarını seçiyoruz.
const result = document.querySelector("#result");
const buttons = document.querySelectorAll("#buttons button");
const powerButton = document.querySelector("#power");

// Hesap makinesi başlangıçta kapalı.
let isOn = false;

// İşlem için gerekli değişkenler.
let firstNumber = null;
let operator = "";
let isNewNumber = true;
let hasError = false;

// Ekrana girilebilecek maksimum karakter sayısı.
const MAX_LENGTH = 12;

// Ekranı başlangıçta kapalı tut.
result.classList.add("off");

// Ekranı ve işlem durumunu sıfırlayan yardımcı fonksiyon.
function resetCalculator() {
    result.textContent = "0";
    firstNumber = null;
    operator = "";
    isNewNumber = true;
    hasError = false;
}

// Sonucu ekrana güvenli ve okunabilir şekilde yaz.
function displayResult(value) {
    if (!Number.isFinite(value)) {
        result.textContent = "WRONG ENTRY!";
        hasError = true;
        return;
    }

    const roundedValue = Number(value.toPrecision(10));
    result.textContent = String(roundedValue);
    isNewNumber = true;
}

// ON/OFF düğmesi.
powerButton.addEventListener("click", function () {
    isOn = !isOn;

    if (isOn) {
        resetCalculator();
        result.classList.remove("off");
    } else {
        resetCalculator();
        result.classList.add("off");
    }
});

// Hesap makinesi tuşları.
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const value = button.textContent.trim();

        // Güç düğmesi ayrı dinleyicide çalışıyor.
        if (button === powerButton) {
            return;
        }

        // Kapalıyken diğer tuşları çalıştırma.
        if (!isOn) {
            return;
        }

        // Hata oluştuysa C veya güç düğmesiyle sıfırlanabilir.
        if (hasError && value !== "C") {
            return;
        }

        // Temizle.
        if (value === "C") {
            resetCalculator();
            return;
        }

        // Son karakteri sil.
        if (value === "⌫") {
            if (isNewNumber || hasError) {
                resetCalculator();
                return;
            }

            if (result.textContent.length > 1) {
                result.textContent = result.textContent.slice(0, -1);

                if (result.textContent === "-") {
                    result.textContent = "0";
                }
            } else {
                result.textContent = "0";
            }

            return;
        }

        // Rakam gir.
        if (value >= "0" && value <= "9") {
            if (isNewNumber || result.textContent === "0") {
                result.textContent = value;
                isNewNumber = false;
            } else if (result.textContent.length < MAX_LENGTH) {
                result.textContent += value;
            }

            return;
        }

        // Ondalık nokta gir.
        if (value === ".") {
            if (isNewNumber) {
                result.textContent = "0.";
                isNewNumber = false;
            } else if (
                !result.textContent.includes(".") &&
                result.textContent.length < MAX_LENGTH
            ) {
                result.textContent += ".";
            }

            return;
        }

        // İşlem seç.
        if (["+", "-", "×", "÷"].includes(value)) {
            firstNumber = Number(result.textContent);
            operator = value;
            isNewNumber = true;
            return;
        }

        // Yüzde işlemi.
        if (value === "%") {
            const currentNumber = Number(result.textContent);
            displayResult(currentNumber / 100);
            return;
        }

        // Eşittir.
        if (value === "=") {
            if (firstNumber === null || operator === "") {
                return;
            }

            const secondNumber = Number(result.textContent);

            try {
                const answer = calculate(
                    firstNumber,
                    secondNumber,
                    operator
                );

                displayResult(answer);
                firstNumber = null;
                operator = "";
            } catch (error) {
                result.textContent = "WRONG ENTRY!";
                hasError = true;
                firstNumber = null;
                operator = "";
            }
        }
    });
});
