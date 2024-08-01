import axiosInstance from '../axiosInstance';

const getBooks = async () => {
    const { data } = await axiosInstance.get('/books');
    return data;
};

const getBook = async (id) => {
    const { data } = await axiosInstance.get(`/books/${id}`);
    return data;
};

const addBook = async (book, token) => {
    const { data } = await axiosInstance.post('/books', book, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

const updateBook = async (id, book, token) => {
    const { data } = await axiosInstance.put(`/books/${id}`, book, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

const deleteBook = async (id, token) => {
    await axiosInstance.delete(`/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export { getBooks, getBook, addBook, updateBook, deleteBook };
