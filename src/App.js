import React, { useState, useEffect } from 'react'
import './App.scss'
const App = () => {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const books = [
    { name: 'book-1', price: 20, quantity: 50 },
    { name: 'book-2', price: 25, quantity: 50 },
    { name: 'book-3', price: 30, quantity: 50 },
    { name: 'book-4', price: 50, quantity: 50 },
    { name: 'book-5', price: 20, quantity: 50 },
    { name: 'book-6', price: 15, quantity: 50 },
    { name: 'book-7', price: 30, quantity: 50 },
  ]

  const [stock, setStock] = useState(books)
  useEffect(() => {
    const sum = cart.reduce((acc, curr) => acc + curr.totalPrice, 0)
    setTotal(sum)
  }, [cart])

  const descendingSort = (a, b) => (a.name > b.name ? 1 : -1)

  const addToCart = (book) => {
    let tempCart = cart
    const index = cart.findIndex((item) => item.name === book.name)
    const prevUnit = tempCart[index]?.unit || 0
    const tempStock = stock
    const prevStock = tempStock.find((item) => item.name === book.name)
    const filterStock = tempStock.filter((item) => item.name !== book.name)
    prevStock.quantity -= 1
    const newStock = [...filterStock, prevStock]
    setStock(newStock.sort(descendingSort))
    if (index === -1) {
      tempCart = [
        ...cart,
        { name: book.name, unit: 1, price: book.price, totalPrice: book.price },
      ]
    } else {
      const newBook = {
        name: book.name,
        unit: prevUnit + 1,
        price: book.price,
        totalPrice: book.price * (prevUnit + 1),
      }
      tempCart = cart.filter((item) => item.name !== book.name)
      tempCart = [...tempCart, newBook]
    }
    setCart(tempCart.sort(descendingSort))
  }

  const renderList = () => (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {stock.map((book) => (
          <tr key={book.name}>
            <td>{book.name}</td>
            <td>price:{book.price}</td>
            <td>quantity:{book.quantity}</td>
            <td>
              <button
                onClick={() => addToCart(book)}
                disabled={book.quantity <= 0}
              >
                Add to cart
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  const renderCart = () => (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((book) => (
          <tr key={book.name}>
            <td>{book.name}</td>
            <td>{book.price}</td>
            <td>{book.unit}</td>
            <td>{book.price * book.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div>
      <h1>Bookstore management</h1>
      {renderList()}
      <h1>Your cart</h1>
      {renderCart()}
      <h4>Total:{total}</h4>
    </div>
  )
}

export default App
