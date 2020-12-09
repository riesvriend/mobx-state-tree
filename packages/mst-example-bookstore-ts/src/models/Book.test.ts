import * as fs from "fs"
import { when } from "mobx"
import { ShopModel, Environment } from "./Shop"

const testBooksAsJsonString = fs.readFileSync("./public/books.json").toString()
const bookFetcher = () => Promise.resolve(JSON.parse(testBooksAsJsonString))
const environment = {
    fetch: bookFetcher
} as Environment

// node.exe .\node_modules\jest\bin\jest.js -i Book.test.ts
it("bookstore fetches data", (done) => {
    const shop = ShopModel.create({}, environment)
    when(
        () => shop.isLoading === false,
        () => {
            expect(shop.books.size).toBe(4)
            expect(shop.books.get("978-1933988177")?.price).toBe(30.5)
            done()
        }
    )
})

it("bookstore sorts data", (done) => {
    const shop = ShopModel.create({}, environment)
    when(
        () => shop.isLoading === false,
        () => {
            expect(shop.sortedAvailableBooks.map((book) => book.name)).toEqual([
                "Lucene in Action, Second Edition",
                "Sophie's World : The Greek Philosophers",
                "The Lightning Thief",
                "The Sea of Monsters"
            ])
            done()
        }
    )
})
