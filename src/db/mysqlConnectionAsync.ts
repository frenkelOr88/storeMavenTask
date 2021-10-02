/*
  Promisifies some API calls of mysql client connection
*/
import Connection from 'mysql/lib/Connection';

const functionsToPromisify = [
    'query',
    'beginTransaction',
    'commit',
    'rollback',
];

function createCallback(resolve, reject) {
    return (err, results) => {
        if (err) {
            reject(err);
        } else {
            resolve(results);
        }
    };
}

functionsToPromisify.forEach((functionName) => {
    const functionNameAsync = `${functionName}Async`;

    Connection.prototype[functionNameAsync] = function connection() {
        return new Promise((resolve, reject) => {
            const cb = createCallback(resolve, reject);
            // eslint-disable-next-line prefer-rest-params
            this[functionName].apply(this, [...arguments, cb]);
        });
    };
});
