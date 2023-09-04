import { App } from '../app'
import User from '../entities/User'
import request from 'supertest'
import crypto from 'node:crypto'

const app = new App()
const express = app.app

const user: User = {
  firstName: crypto.randomBytes(6).toString('hex'),
  lastName: crypto.randomBytes(6).toString('hex'),
  email: crypto.randomBytes(10).toString('hex') + '@test.com',
  password: crypto.randomBytes(10).toString('hex')
}

describe('user test', () => {
  it('/POST create user', async () => {
    const response = await request(express).post('/users/register').send(user)
    if (response.error) {
      console.log('ERRO: ', response.error)
    }

    expect(response.status).toBe(201)
    expect(response.body).toEqual({ message: 'User created' })
  })
  it('/POST check user exists', async () => {
    const response = await request(express).post('/users/register').send({
      firstName: 'Matheus',
      lastName: 'Kiyoshi',
      email: 'matheus@teste.com',
      password: '123456535531'
    })
    if (response.error) {
      console.log('ERRO: ', response.error)
    }

    expect(response.status).toBe(409)
    expect(response.body).toEqual({
      status: 409,
      message: 'User already exists'
    })
  })
  it('/POST password invalid', async () => {
    const response = await request(express).post('/users/register').send({
      firstName: 'Matheus',
      lastName: 'Kiyoshi',
      email: 'matheuadwas@teste.com',
      password: '5531'
    })
    if (response.error) {
      console.log('ERRO: ', response.error)
    }

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      status: 400,
      message: 'Password must be at least 8 characters'
    })
  })
  it('/GET/:email user email', async () => {
    const response = await request(express).get('/users/matheus@teste.com')
    if (response.error) {
      console.log('ERRO: ', response.error)
    }

    expect(response.status).toBe(200)
  })
})
