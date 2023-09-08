var Username;

// Function to render items in the items-container
function renderItems(items) {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';
  
    items.forEach((item) => {
      const itemCard = document.createElement('div');
      itemCard.className = 'item-card';
      itemCard.innerHTML = `
        <h3>${item.name}</h3>
        <img src="../uploads/${item.image}" alt="${item.name}">
        <p>Price: $${item.price}</p>
        <p>Seller: ${item.seller}</p>
        <p>Quantity(kg): ${item.quantity}</p>
        <button onclick="editItem('${item.name}')">Edit</button>
        <button onclick="deleteItem('${item.name}')">Delete</button>
      `;
      itemsContainer.appendChild(itemCard);
    });
  }
  
  // Function to fetch and display items

// Function to fetch and display items for a specific username
function fetchItems(username) {
  fetch(`http://localhost:3000/api/items?username=${encodeURIComponent(username)}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Add this line to inspect the response data in the browser console
      let items = data; // Replace this with the appropriate way to extract the items array from the response
      renderItems(items);
    })
    .catch((error) => {
      console.error('Error fetching items:', error);
    });
}
  
// Function to add a new item
function addItem() {
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const image = document.getElementById("image").files[0];
  const seller = Username;
  const quantity = parseInt(document.getElementById("quantity").value);
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("image", image);
  formData.append("seller", seller);
  formData.append("quantity",quantity);

  fetch("http://localhost:3000/api/items", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("Server Response:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Parsed JSON Data:", data);
      console.log(data.message);
      // Fetch and display items again after successful addition (optional)
      fetchItems();
    })
    .catch((error) => {
      console.error("Error adding item:", error);
    });
}

  
  
  // Function to edit an existing item's details (dummy function, customize as needed)
  function editItem(name) {
    // Prompt the user to enter the new quantity and price
    const quantityInput = prompt(`Enter the new quantity for ${name}:`);
    const priceInput = prompt(`Enter the new price for ${name}:`);
  
    // Convert the inputs to numbers (assuming they should be numbers)
    const quantity = parseFloat(quantityInput);
    const price = parseFloat(priceInput);
  
    // Check if the inputs are valid numbers
    if (!isNaN(quantity) && !isNaN(price)) {
      // Make an API call to update the item
      fetch(`http://localhost:3000/api/edit_items`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          seller: Username,
          quantity: quantity,
          price: price,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Item updated successfully:', data.message);
        })
        .catch((error) => {
          console.error('Error updating item:', error);
        });
    } else {
      // If inputs are not valid numbers, show an error message
      console.log('Invalid input. Please enter valid numbers for quantity and price.');
    }
    fetchItems();
  }

  // Function to edit an existing item's details (dummy function, customize as needed)
  function deleteItem(name) {
    // Make an API call to update the item
    fetch(`http://localhost:3000/api/delete_items`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        seller: Username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Item deleted successfully:', data.message);
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
    fetchItems();
  }

  // Attach event listener to the "Add Item" button
  document.getElementById('add-item-btn').addEventListener('click', addItem);
  
  // Initial rendering of items
  fetchItems();
  
// Function to get the value of a query parameter from the URL
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Get the username from the URL
Username = getQueryParam('username');

// Display the username at the top right corner
const userInfoContainer = document.getElementById("user-info-container");
userInfoContainer.textContent = `Welcome, ${Username}!`;

// Example usage (replace 'example_username' with the actual username)
fetchItems(Username);