import { newEngine } from '@comunica/actor-init-sparql'

const myEngine = newEngine();

function waitFor(obj, prop, timeout, expected) {
    if (!obj) return Promise.reject(new TypeError("waitFor expects an object"));
    if (!expected) expected = Boolean;
    var value = obj[prop];
    if (expected(value)) return Promise.resolve(value);
    return new Promise(function (resolve, reject) {
        if (timeout)
            timeout = setTimeout(function () {
                Object.defineProperty(obj, prop, { value: value, writable: true });
                reject(new Error("waitFor timed out"));
            }, timeout);
        Object.defineProperty(obj, prop, {
            enumerable: true,
            configurable: true,
            get: function () { return value; },
            set: function (v) {
                if (expected(v)) {
                    if (timeout) clearTimeout(timeout);
                    Object.defineProperty(obj, prop, { value: v, writable: true });
                    resolve(v);
                } else {
                    value = v;
                }
            }
        });
    });
}

function mapData(one, res) {
    one = one.toObject()
    console.log(one)
    res.push(one)
}

export default function SPARQLQuery(qry, type, endpoint) {
    console.log(endpoint)
    console.log(type)
    let context = {sources: [{ type: type, value: endpoint }],};
    let streamstatus = { done: false }
    let results = []

    console.log('context', context)


    myEngine.query(qry, context)
        .then(function (result) {
            result.bindingsStream.on('data', (maprow) => mapData(maprow, results))
            result.bindingsStream.on('end', (done) => {
                streamstatus["done"] = true
            })
        })
        .then(async function () {
            await waitFor(streamstatus, "done", 5000)
            console.log(results)
            return results
        })
}

