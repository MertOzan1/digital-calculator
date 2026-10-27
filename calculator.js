
import { topla, cikar, carp, bol } from "./math.js";

export default function calculate(a, b, operator) {
    switch (operator) {
        case "+":
            return topla(a, b);

        case "-":
            return cikar(a, b);

        case "×":
            return carp(a, b);

        case "÷":
            return bol(a, b);

        default:
            throw new Error("Unsupported operator.");
    }
}
