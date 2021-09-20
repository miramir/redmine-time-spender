import { useEffect } from 'react';
import Dexie from 'dexie';
export const database = new Dexie('redmine-cache');
database.version(1).stores({
    projects: '++, &id, updated_on',
    issues: '&id, updated_on',
    activities: '&id',
    entries: '&id, spent_on, updated_on', // order: updated_on <desc>
    tasks: '++id',
    logs: '++'
});
database.open();
export const log = (...data) => database.logs.add([new Date().toJSON(), ...data]) || console.log(...data);
export const storage = {
    get: (keys) => new Promise((resolve, reject) => chrome.storage.local.get(keys, (items) => chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(items))),
    set: (items) => new Promise((resolve, reject) => chrome.storage.local.set(items, () => chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve()))
};

export const useRaise = (type) => (detail) => window.dispatchEvent(new CustomEvent(type, { detail }));
export const useListen = (type, callback = (_detail) => { }) => useEffect(() => {
    const listener = (event) => callback(event.detail);
    window.addEventListener(type, listener);
    return () => window.removeEventListener(type, listener);
}, [callback]);
export const useAsyncEffect = (effect = async (_signal) => { }, cleaning = async () => { }, deps = undefined) => useEffect(() => {
    const controller = new AbortController();
    effect && effect(controller.signal);
    return () => controller.abort() || cleaning && cleaning();
}, deps);
