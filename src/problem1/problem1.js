// Assume param n is a valid positive integer then we can ignore the validation

// Using for loop
var sum_to_n_a = function(n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// Using JS function (in this case reduce)
var sum_to_n_b = function(n) {
    return Array.from({ length: n }, (_v, k) => k+1).reduce((a, b) => a + b, 0);
};

// Using Recursion
var sum_to_n_c = function(n) {
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n_b(n - 1);
};

// Using the Arithmetic Progression Formula
var sum_to_n_d = function(n) {
    return (n * (n + 1)) / 2;
};
