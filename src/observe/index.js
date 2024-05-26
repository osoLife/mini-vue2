import { newArrayMethods } from './array'

class Observer {
    constructor(value) {
        Object.defineProperty(value, '__ob__', {
            enumerable: false,
            value: this
        })
        if (Array.isArray(value)) {
            value.__proto__ = newArrayMethods
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }
    walk(data) {
        let keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let value = data[key]
            defineReactive(data, key, value)
        }
    }
    observeArray(data) {
        data.forEach(item => observe(item))
    }
}

function defineReactive(target, key, value) {
    observe(value)
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue === value) return
            observe(newValue)
            value = newValue
        }
    })
}


export function observe(data) {
    if (typeof data !== 'object' || data === null) return
    if (data.__ob__ instanceof Observer) {
        return data.__ob__
    }
    return new Observer(data)
}