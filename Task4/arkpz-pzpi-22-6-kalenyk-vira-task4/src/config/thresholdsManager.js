let thresholds = {};

function updateThresholds(newThresholds) {
    thresholds = { ...thresholds, ...newThresholds };
}

function getThresholds() {
    return thresholds;
}

module.exports = { updateThresholds, getThresholds };