export var DatabaseType;
(function (DatabaseType) {
    DatabaseType["IndexedDB"] = "indexedDB";
    DatabaseType["LocalStorage"] = "localStorage";
})(DatabaseType || (DatabaseType = {}));
