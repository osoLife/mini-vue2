let oldArrayProtoMethods = Array.prototype

export let newArrayMethods = Object.create(oldArrayProtoMethods)

let methods = [
    'push',
    'pop',
    'unshift',
    'shift',
    'splice',
    'sort',
    'reverse'
]

methods.forEach(method => {
    newArrayMethods[method] = function (...args) {
        let result = oldArrayProtoMethods[method].apply(this, args)
        let inserted
        let ob = this.__ob__
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2)
                break;
        }
        if (inserted) {
            ob.observeArray(inserted)
        }
        return result
    }
})