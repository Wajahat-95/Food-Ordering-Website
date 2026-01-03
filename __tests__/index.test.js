import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages/index'
import { Provider } from 'react-redux'
import store from '../redux/store'

describe('Home', () => {
  it('renders a heading', () => {
    const productList = []
    render(
      <Provider store={store}>
        <Home productList={productList} />
      </Provider>
    )

    const heading = screen.getByRole('heading', {
      name: /THE BEST FRIES IN TOWN/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
