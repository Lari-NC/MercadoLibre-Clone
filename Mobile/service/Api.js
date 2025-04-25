import axios from 'axios';
import { saveToken, getToken } from '../resources/Storage';

const baseUrl = 'http://tu_ip:7070';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      email: email,
      password: password,
    });
    await saveToken(response.headers['authorization']);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
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

    return response ; 
  } catch (error) {
    console.error("Error al registrar usuario: ", error.response);
    throw error;
  }
};

const getUser = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${baseUrl}/user`, {
      headers: { 'Authorization': token },
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

const getCart = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${baseUrl}/cart`, {
      headers: { 'Authorization': token },
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
  const token = await getToken();

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
  const token = await getToken();
  try {
    const response = await axios.post(`${baseUrl}/purchase`, {
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvv: cvv,
      name: name,
    }, {
      headers: { 'Authorization': token },
    });
    return response.data;
  } catch (error) {
    console.error("Error al realizar la compra: ", error.response?.data?.message || error.message);
    throw error;
  }
};

const addProductToCart = async (productId, amount) => {
  try {
    const token = await getToken();
    const response = await axios.put(`${baseUrl}/cart`, {
      productId: productId,
      amount: amount,
    }, {
      headers: { 'Authorization': token },
    });
    return response.data;
  } catch (error) {
    console.error("Error al agregar al carrito", error.response?.data?.message || error.message);
    throw error;
  }
};

const getRelatedProducts = async (id) => {
  try {
    const token = await getToken();
    const response = await axios.get(`${baseUrl}/products/${id}/related`, {
      headers: { 'Authorization': token },
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar el usuario: ", error.response?.data?.message || error.message);
    throw error;
  }
};

const likeProduct = async (id) => {
  try {
    const token = await getToken();
    const response = await axios.put(`${baseUrl}/products/${id}/like`, {}, {
      headers: { Authorization: token }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addQuestionProduct = async (id, text) => {
  try {
    const token = await getToken();
    const response = await axios.post(`${baseUrl}/products/${id}/question`, {
      text: text,
    }, { headers: { Authorization: token } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addAnswerProduct = async (productId, text, questionId) => {
  try {
    const token = await getToken();
    const response = await axios.put(`${baseUrl}/products/${productId}/question/${questionId}`, {
      text: text,
    }, { headers: { Authorization: token } });
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
  getProductByID,
  deleteProductFromCart,
  purchaseCart,
  addProductToCart,
  getRelatedProducts,
  likeProduct,
  addQuestionProduct,
  addAnswerProduct
};