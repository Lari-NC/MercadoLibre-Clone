import axios from 'axios';

const baseUrl = 'http://localhost:7070';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      email: email,
      password: password
    });
    localStorage.setItem('token', response.headers['authorization']);
    return { user: response.data }; 
  } catch (error) {
    console.error("Error al iniciar sesión: ", error);
    throw error;
  }
};

const register = async (name, email, password, image) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, {
      name: name,
      email: email,
      password: password,
      image: image
    });

    const token = response.headers['Authorization'];
    return { token, user: response.data }; 
  } catch (error) {
    console.error("Error al registrar usuario: ", error.response.data.message);
    throw error;
  }
};

const getUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}/user`, {
      headers: { 'Authorization': localStorage.getItem('token') }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos del usuario: ", error.response.data.message);
    throw error;
  }
};

const getAllProducts = async (page) => {
  try {
    const response = await axios.get(`${baseUrl}/products?page=${page}`);
    return {
      products: response.data.products,
      totalPages: response.data.amountOfPages
    };
  } catch (error) {
    console.error("Error al obtener los productos", error.response?.data?.message || error.message);
    throw error;
  }
};

const getCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorias: ", error.response.data.message);
    throw error;
  }
};

const getProductsByCategory = async (id, page) => {
  try {
    const response = await axios.get(`${baseUrl}/categories/${id}`, {
      params: { page: page },
    });

    return {
      products: response.data.products,
      currentPage: response.data.currentPage,
      totalPages: response.data.amountOfPages,
    };
  } catch (error) {
    console.error("Error al obtener los productos de la categoría: ", error.response?.data?.message || error.message);
    throw error;
  }
};

const editProduct = async (product, id) => {
  try {
    const response = await axios.put(`${baseUrl}/products/${id}`, product, {
      headers: { 'Authorization': localStorage.getItem('token') }
    });
    return response.data;
  } catch (error) {
    console.error("Error al editar el producto");
    throw error;
  }
};

const search = async (text, page) => {
  try {
    const response = await axios.get(`${baseUrl}/search`, {
      params: {
        query: text,
        page: page,
      }
    });
    return {
      products: response.data.products,
      currentPage: response.data.currentPage,
      amountOfPages: response.data.amountOfPages,
    };
  } catch (error) {
    console.error("Error al obtener los resultados: ", error.response?.data?.message || error.message);
    throw error;
  }
};

const createNewProduct = async (product) => {
  try {
    const response = await axios.post(`${baseUrl}/products`, product, {
      headers: { 'Authorization': localStorage.getItem('token') }
    });
    return { product: response.data };
  } catch (error) {
    console.error(error.response);
    throw error;
  }
};

const getCart = async () => {
  try {
    const response = await axios.get(`${baseUrl}/cart`, {
      headers: { 'Authorization': localStorage.getItem('token') }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el carrito: ", error.response?.data?.message || error.message);
    throw error;
  }
};

const getProductByID = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al traer el producto");
    throw error;
  }
};

const deleteProductFromCart = async (productId) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.delete(`${baseUrl}/cart/${productId}`, {
      headers: { 'Authorization': token },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error.response?.data?.message || error.message);
    throw error;
  }
};

const purchaseCart = async (cardNumber, expirationDate, cvv, name) => {
  try {
    const response = await axios.post(`${baseUrl}/purchase`, {
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvv: cvv,
      name: name,
    }, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    return response.data;
  } catch (error) {
    console.error("Error al realizar la compra: ", error.response?.data?.message || error.message);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/user/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar el usuario: ", error.response?.data?.message || error.message);
    throw error;
  }
};

const addProductToCart = async (productId, amount) => {
  try {
    const response = await axios.put(`${baseUrl}/cart`, {
      productId: productId,
      amount: amount,
    }, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    return response.data;
  } catch (error) {
    console.error("Error al agregar al carrito", error.response?.data?.message || error.message);
    throw error;
  }
};

const getRelatedProducts = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/products/${id}/related`, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar el usuario: ", error.response?.data?.message || error.message);
    throw error;
  }
};

const likeProduct = async (id) => {
  try {
    const response = await axios.put(`${baseUrl}/products/${id}/like`, {}, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addQuestionProduct = async (id, text) => {
  try {
    const response = await axios.post(`${baseUrl}/products/${id}/question`, {
      text: text,
    }, { headers: { Authorization: localStorage.getItem('token') } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addAnswerProduct = async (productId, text, questionId) => {
  try {
    const response = await axios.put(`${baseUrl}/products/${productId}/question/${questionId}`, {
      text: text,
    }, { headers: { Authorization: localStorage.getItem('token') } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  register,
  getUser,
  getAllProducts,
  getCategories,
  getProductsByCategory,
  search,
  getCart,
  editProduct,
  createNewProduct,
  getProductByID,
  deleteProductFromCart,
  purchaseCart,
  getUserById,
  addProductToCart,
  getRelatedProducts,
  likeProduct,
  addQuestionProduct,
  addAnswerProduct
};