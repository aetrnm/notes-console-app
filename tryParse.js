export function tryParse(callback) {
    try {
        callback;
    } catch (error) {
        console.error(error)
        return undefined;
    }
    return callback;
}