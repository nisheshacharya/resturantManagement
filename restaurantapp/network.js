const baseURL = 'http://localhost:5001';
const resturantId = '6532df372a474e2233506e82'

const checkError = async (response, error) => {
  const responseData = await response.json();
  if (responseData.success) return responseData.data;
  throw new Error(error + responseData.error);
};

export async function signup(email, password) {
  try {
    const response = await fetch(`${baseURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Sign-up failed');

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}


export async function getUser(id, token) {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Unauthorized');
      return { success: false, error: 'Unauthorized' };
    }

    const data = await response.json();
    if (data) return { success: true, data };
  } catch (error) {
    return { success: false, error: 'An error occurred' };
  }
}

export async function login(email, password) {
  try {
    const response = await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Login failed');

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getFood(token) {
  try {
    const response = await fetch(`${baseURL}/restuarants/${resturantId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    return null;
  }
}


export async function addFood(newFood, token) {
  try {

    const response = await fetch(`${baseURL}/restuarants/${resturantId}/foods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newFood),
    });
    if (!response.ok) throw new Error('Failed to add product');
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function editFood(newFood, token) {
  try {
    const response = await fetch(`${baseURL}/restuarants/${resturantId}/foods/${newFood._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newFood),
    });
    if (!response.ok) throw new Error('Failed to edit product');
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}


export async function deleteFood(id, token) {
  try {
    const response = await fetch(`${baseURL}/restuarants/${resturantId}/foods/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to delete product');

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}


export async function updateProfile(data, token) {
  try {
    
    const response = await fetch(`${baseURL}/update/${data._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error; // You can handle the error as needed in your component
  }
}


export async function CheckoutItem(id, token) {
  try {
    const response = await fetch(`${baseURL}/restuarants/${resturantId}/cart/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to delete product');

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}



export async function addToCart(newFood, token) {
  try {

    const response = await fetch(`${baseURL}/restuarants/${resturantId}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newFood),
    });
    if (!response.ok) throw new Error('Failed to add item in cart');
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}


//Notes Section

export async function addNotes(newNote, token) {
  try {

    const response = await fetch(`${baseURL}/restuarants/${resturantId}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newNote),
    });
    if (!response.ok) throw new Error('Failed to add note');
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}


export async function getNotes(token) {
  try {
    const response = await fetch(`${baseURL}/restuarants/${resturantId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch notes');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    return null;
  }
}
