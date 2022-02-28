import { render, screen } from '@testing-library/react';
import store from './store/index.js';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import RecipeForm from './components/forms/RecipeForm'
const request = require('supertest');
const diets = [
      {
        id: 2,
        name: 'gluten free',
        createdAt: '2022-02-27T19:11:58.557Z',
        updatedAt: '2022-02-27T19:11:58.557Z'
      },
      {
        id: 5,
        name: 'ketogenic',
        createdAt: '2022-02-27T19:11:58.559Z',
        updatedAt: '2022-02-27T19:11:58.559Z'
      },
      {
        id: 4,
        name: 'vegetarian',
        createdAt: '2022-02-27T19:11:58.550Z',
        updatedAt: '2022-02-27T19:11:58.550Z'
      },
      {
        id: 3,
        name: 'lacto vegetarian',
        createdAt: '2022-02-27T19:11:58.561Z',
        updatedAt: '2022-02-27T19:11:58.561Z'
      },
      {
        id: 7,
        name: 'pescetarian',
        createdAt: '2022-02-27T19:11:58.587Z',
        updatedAt: '2022-02-27T19:11:58.587Z'
      },
      {
        id: 1,
        name: 'ovo vegetarian',
        createdAt: '2022-02-27T19:11:58.563Z',
        updatedAt: '2022-02-27T19:11:58.563Z'
      },
      {
        id: 6,
        name: 'vegan',
        createdAt: '2022-02-27T19:11:58.585Z',
        updatedAt: '2022-02-27T19:11:58.585Z'
      },
      {
        id: 9,
        name: 'low fodmap',
        createdAt: '2022-02-27T19:11:58.591Z',
        updatedAt: '2022-02-27T19:11:58.591Z'
      },
      {
        id: 10,
        name: 'primal',
        createdAt: '2022-02-27T19:11:58.590Z',
        updatedAt: '2022-02-27T19:11:58.590Z'
      },
      {
        id: 8,
        name: 'paleolithic',
        createdAt: '2022-02-27T19:11:58.589Z',
        updatedAt: '2022-02-27T19:11:58.589Z'
      },
      {
        id: 11,
        name: 'whole 30',
        createdAt: '2022-02-27T19:11:58.598Z',
        updatedAt: '2022-02-27T19:11:58.598Z'
      }
    ]

it('El form debe tener un tag con name "TITLE" y type "TEXT"', () => {
  const { container } = render(<Provider store={store}> <BrowserRouter><RecipeForm/></BrowserRouter></Provider>);
  const element = container.querySelectorAll('input')[0]
  expect(element.type).toBe('text');
  expect(element.name).toBe('title');
});
it('El form debe tener un tag con name "SUMMARY" y type "TEXTAREA"', () => {
  const { container } = render(<Provider store={store}> <BrowserRouter><RecipeForm/></BrowserRouter></Provider>);
  const element = container.querySelectorAll('textarea')[0]
  expect(element.type).toBe('textarea');
  expect(element.name).toBe('summary');
});
it('El form debe tener un tag con name "STEP" y type "TEXT"', () => {
  const { container } = render(<Provider store={store}> <BrowserRouter><RecipeForm/></BrowserRouter></Provider>);
  const element = container.querySelectorAll('input')[3]
  expect(element.type).toBe('text');
  expect(element.name).toBe('step');
});

it('deberia responder con un status code 200 /types', async () => {
  const res = await request('http://localhost:3001').get('/types');
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(diets.length)
});

it('deberia responder con un status code 401 /recipe', async () => {
  const res = await request('http://localhost:3001').post('/recipe');
  expect(res.statusCode).toBe(401);
  expect(res.body.done).toBe(false)
});


