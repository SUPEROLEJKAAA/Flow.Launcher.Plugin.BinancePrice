import fs from "fs";

const dbPath = '.\\src\\db\\db.json';

function readDatabase() {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
}

function writeDatabase(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

export function addData(coin, price) {
    const db = readDatabase(dbPath)
    db[coin] = price
    writeDatabase(db)
}

export function getData(coin) {
    const db = readDatabase()
    return db[coin] || 0
}