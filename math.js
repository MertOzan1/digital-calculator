
export function topla(a, b) {
    return a + b;
}

export function cikar(a, b) {
    return a - b;
}

export function carp(a, b) {
    return a * b;
}

export function bol(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }

    return a / b;
}
