// path: ./src/types/booktype.ts

interface UpdateBookBody {
    title?: string,
    available?: boolean
}

interface Book{
    id: number,
    title: string,
    releaseDate: Date,
    available: boolean
};

declare global{
    namespace Express {
        interface Request{
            book?: Book;
        }
    }
}
export { Book, UpdateBookBody}