"use strict";
/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AFObject_1 = require("../AFObject");
const AFArray_1 = require("../array/AFArray");
const AFMap_1 = require("./AFMap");
const AFIterator_1 = require("../AFIterator");
/**
 * A immutable generic implementation of a native javascript object.
 */
class AFDictionary extends AFObject_1.AFObject {
    /**
     * The default constructor will only create an instance. Use the static method helpers to create new instances.
     */
    constructor() {
        super();
        this.map = new Map();
    }
    /**
     * Get a value for a specific key from the instance.
     * @param {K} key The key to be used.
     * @return {V} The value for the specified key.
     */
    get(key) {
        return this.map.get(key);
    }
    /**
     * Get the key for a specified value.
     * @param {V} value The value.
     * @return {K} The key for the specified value.
     */
    getKey(value) {
        return this.keys().get(this.values().indexOf(value));
    }
    /**
     * Returns the number of key value pairs on the instance.
     * @return {number}
     */
    size() {
        return this.keys().size();
    }
    /**
     * Checks if the instance contains a specific key.
     * @param {K} key The key to be searched for.
     * @return {boolean} Whether the key was found on the instance.
     */
    containsKey(key) {
        return this.keys().contains(key);
    }
    /**
     * Get all the keys of the instance.
     * @return {AFArray<K>} A new AFArray instance containing all the keys on the instance.
     */
    keys() {
        return AFArray_1.AFArray.initFromNativeArray(Array.from(this.map.keys()));
    }
    /**
     * Get an AFIterator instance with the keys from the instance.
     * @return {AFIterator<K>}
     */
    keyIterator() {
        return AFIterator_1.AFIterator.initWithArray(this.keys());
    }
    /**
     * Checks if the instance contains a specific value.
     * @param {V} value The value to be searched for.
     * @return {boolean} Whether the value was found on the instance.
     */
    containsValue(value) {
        return this.values().contains(value);
    }
    /**
     * Get all the values of the instance.
     * @return {AFArray<V>} A new AFArray instance containing all the values on the instance.
     */
    values() {
        return AFArray_1.AFArray.initFromNativeArray(Array.from(this.map.values()));
    }
    /**
     * Get an AFIterator instance with the values from the instance.
     * @return {AFIterator<V>} A new AFIterator instance.
     */
    valueIterator() {
        return AFIterator_1.AFIterator.initWithArray(this.values());
    }
    /**
     * Checks if the instance contains a specific key and value pair.
     * @param {K} key The key to be searched for.
     * @param {V} value The value to be searched for.
     * @return {boolean} Whether the key value pair was found on the instance.
     */
    containsKeyValuePair(key, value) {
        return this.containsKey(key) && this.get(key) === value;
    }
    /**
     * An iterator helper to iterator through every key value pair.
     * @param {(key: K, value: V) => void} iterator An arrow function.
     */
    forEach(iterator) {
        this.keys().forEach((key) => iterator(key, this.get(key)));
    }
    /**
     * An iterator helper to iterator through every key value pair that supports each iteration being an async function.
     * @param {(key: K, value: V) => Promise<void>} iterator An async arrow function.
     * @return {Promise<void>} A promise.
     */
    forEachSync(iterator) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.keys().forEachSync((key) => __awaiter(this, void 0, void 0, function* () { return yield iterator(key, this.get(key)); }));
        });
    }
    /**
     * Convert this instance to a native JavaScript object. Calls toNativeObject() method on instance.
     * @return {object} A native JavaScript object (JSON).
     */
    toJSON() {
        return this.toNativeObject();
    }
    /**
     * Convert this instance to a native JavaScript object. Same as toJSON() function.
     * @return {object} A native JavaScript object (JSON).
     */
    toNativeObject() {
        let json = {};
        this.forEach((key, value) => {
            if (typeof key !== "string")
                throw new Error(`Key '${key}' is not a string. Native JavaScript objects must have a string for their keys.`);
            json[key] = value;
        });
        return json;
    }
    /**
     * Convert this instance to a JSON string.
     * @return {string} A string with JSON encoding.
     */
    toString() {
        return JSON.stringify(this.toNativeObject());
    }
    /**
     * Convert this instance to a AFMap instance.
     * @return {AFMap<K, V>} A new AFMap instance with the same internal data as the instance.
     */
    toMap() {
        return AFMap_1.AFMap.initWithNativeMap(this.map);
    }
    /**
     * Convert this instance to a native Map instance.
     * @return {Map<K, V>} A new Map instance with the same internal data as the instance.
     */
    toNativeMap() {
        return this.map;
    }
    /**
     * Convert this instance to a AFDictionary instance.
     * @return {AFDictionary<K, V>} A new AFDictionary instance with the same internal data as the instance.
     */
    toDictionary() {
        return this;
    }
    /**
     * Create a new instance with keys and values.
     * @param {K[]} keys A native JavaScript array of keys.
     * @param {V[]} values A native JavaScript array of values.
     * @return {AFDictionary<K, V>} A new AFDictionary instance.
     */
    static initWithKeysAndValues(keys, values) {
        if (keys.length !== values.length)
            throw new Error(`The number of keys does not equal the number of values (${keys.length} !== ${values.length}).`);
        let afDictionary = new AFDictionary();
        let map = new Map();
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = values[i];
            map.set(key, value);
        }
        afDictionary.map = map;
        return afDictionary;
    }
    /**
     * Create a new instance with keys and values.
     * @param {K[]} keys An AFArray instance containing keys.
     * @param {V[]} values An AFArray instance containing values.
     * @return {AFDictionary<K, V>} A new AFDictionary instance.
     */
    static initWithKeyArrayAndValueArray(keys, values) {
        if (keys.size() !== values.size())
            throw new Error(`The number of keys does not equal the number of values (${keys.size()} !== ${values.size()}).`);
        let afDictionary = new AFDictionary();
        let map = new Map();
        for (let i = 0; i < keys.size(); i++) {
            let key = keys.get(i);
            let value = values.get(i);
            map.set(key, value);
        }
        afDictionary.map = map;
        return afDictionary;
    }
    /**
     * Create a new instance with a native JavaScript object.
     * @param {object} nativeObject A native JavaScript object.
     * @return {AFDictionary<string, V>} A new AFDictionary instance.
     */
    static initWithNativeObject(nativeObject) {
        let afDictionary = new AFDictionary();
        let map = new Map();
        let keys = Object.keys(nativeObject);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = nativeObject[key];
            map.set(key, value);
        }
        afDictionary.map = map;
        return afDictionary;
    }
    /**
     * Create a new instance with a native Map instance.
     * @param {Map<K, V>} map A native Map instance.
     * @return {AFDictionary<K, V>} A new AFDictionary instance.
     */
    static initWithNativeMap(map) {
        let afDictionary = new AFDictionary();
        afDictionary.map = map;
        return afDictionary;
    }
    /**
     * Create a new instance with a Map instance.
     * @param {AFMap<K, V>} map An AFMap instance.
     * @return {AFDictionary<K, V>} A new AFDictionary instance.
     */
    static initWithMap(map) {
        return AFDictionary.initWithNativeMap(map.toNativeMap());
    }
}
exports.AFDictionary = AFDictionary;