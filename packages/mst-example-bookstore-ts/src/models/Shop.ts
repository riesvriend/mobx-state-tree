import { types, getEnv, Instance } from "mobx-state-tree"
import { BookStoreModel, Book } from "./Book"
// import { CartStore } from "./CartStore"
// import { ViewStore } from "./ViewStore"

// Environment (context fields) provided by the App or tester
export interface Environment {
    fetch: (url: string) => Promise<Array<Book>>
}

export const ShopModel = types
    .model("ShopModel", {
        bookStore: types.optional(BookStoreModel, {
            books: {}
        })
        // cart: types.optional(CartStore, {
        //     entries: []
        // }),
        // view: types.optional(ViewStore, {})
    })
    .volatile((self) => ({
        get environment(): Environment {
            return getEnv(self)
        }
    }))
    .views((self) => ({
        get fetch() {
            return self.environment.fetch
        },
        // get alert() {
        //     return self.environment.alert
        // },
        get isLoading() {
            return self.bookStore.isLoading
        },
        get books() {
            return self.bookStore.books
        },
        get sortedAvailableBooks() {
            return self.bookStore.sortedAvailableBooks
        }
    }))
    .actions((self) => ({
        afterCreate() {
            self.bookStore.loadBooks()
        }
    }))
export interface Shop extends Instance<typeof ShopModel> {}
