import { observe } from "./observe/index"

export function initState(vm) {
    let opts = vm.$options
    if (opts.props) {
        initProps(vm)
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.methods) {
        initMethods(vm)
    }
    if (opts.computed) {
        initComputed(vm)
    }
    if (opts.watch) {
        initWatch(vm)
    }
}
function initProps() { }
function initData(vm) {
    let data = vm.$options.data
    data = typeof data === 'function' ? data.call(vm) : data
    vm._data = data
    observe(data)
    for (let key in data) {
        proxy(vm, '_data', key)
    }
}
function initMethods() { }
function initComputed() { }
function initWatch() { }

function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[target][key]
        },
        set(newValue) {
            vm[target][key] = newValue
        }
    })
}