import { App } from '../app'
import User from '../entities/User'
import request from 'supertest'

const app = new App()
const express = app.app

const user: User = {
  firstName: 'Matheus',
  lastName: 'Kiyoshi',
  email: 'matheus@teste.com',
  password: '123456',
}

describe('Event test', () => {
  it('/POST Event', async () => {
    const response = await request(express).post('/users').send(user)
    if (response.error) {
      console.log('ERRO: ', response.error)
    }

    expect(response.status).toBe(201)
    expect(response.body).toEqual({ message: 'User created' })
  })
})
