import { types, getParent, flow, Instance } from "mobx-state-tree"
import { Shop } from "./Shop"

// A model for a Book. Models are similar to a class.
export const BookModel = types.model("Book", {
    id: types.identifier,
    name: types.string,
    author: types.string,
    price: types.number,
    isAvailable: true
})

// This is the type of an instance of the BookModel. Similar to an object instance.
export interface Book extends Instance<typeof BookModel> {}

// Model for the bookstore
export const BookStoreModel = types
    .model("BookStore", {
        isLoading: true,
        books: types.map(BookModel)
    })
    .views((self) => ({
        get shop(): Shop {
            return getParent(self) as Shop
        },
        get booksMap() {
            return self.books.toJS()
        }
    }))
    .views((self) => ({
        get booksArray() {
            return Array.from(self.books.values())
        }
    }))
    .views((self) => ({
        get sortedAvailableBooks() {
            // MST ISSUE: We used to booksArray and not books because the type of the self.bookMaps.values()
            // is IIterable and not ReadOnlyArray (which it should be)
            return sortBooks(self.booksArray)
        }
    }))
    .actions((self) => {
        function markLoading(loading: boolean) {
            self.isLoading = loading
        }

        function updateBooks(json: Array<Book>) {
            self.booksArray.forEach((book) => (book.isAvailable = false))
            json.forEach((bookJson: any) => {
                self.books.put(bookJson)
                self.books.get(bookJson.id)!.isAvailable = true
            })
        }

        const loadBooks: () => Promise<void> = flow(function* loadBooksGenerator() {
            try {
                const json = yield self.shop.fetch("/books.json")
                updateBooks(json)
                markLoading(false)
            } catch (err) {
                console.error("Failed to load books ", err)
            }
        })

        return {
            updateBooks,
            loadBooks
        }
    })

export interface BookStore extends Instance<typeof BookStoreModel> {}

function sortBooks(books: ReadonlyArray<Book>) {
    return books
        .filter((b) => b.isAvailable)
        .sort((a, b) => (a.name > b.name ? 1 : a.name === b.name ? 0 : -1))
}
