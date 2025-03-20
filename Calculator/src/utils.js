exports.manageWindow = (storedNumbers, newNumbers, windowSize) => {
    const uniqueNumbers = [...new Set([...storedNumbers, ...newNumbers])];
    return uniqueNumbers.slice(-windowSize);
};
