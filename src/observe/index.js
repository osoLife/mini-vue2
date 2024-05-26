class Observer {
    constructor(value) {
        this.walk(value)
    }
    walk(data) {
        let keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let value = data[key]
            defineReactive(data, key, value)
        }
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
    return new Observer(data)
}