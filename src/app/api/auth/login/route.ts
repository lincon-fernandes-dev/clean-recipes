// src/app/api/auth/login/route.ts
import { IApiResponse } from '@/Domain/Interfaces/IApiResponse';
import Database from 'better-sqlite3';
import { NextRequest, NextResponse } from 'next/server';

const db = new Database('recipes.db');

interface LoginRequest {
  email: string;
  password: string; // Vamos ignorar a senha na autenticação falsa
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    if (!email) {
      const errorResponse: IApiResponse<null> = {
        data: null,
        error: 'Bad Request',
        message: 'Email é obrigatório',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Buscar usuário pelo email
    const userStmt = db.prepare(`
      SELECT * FROM user WHERE email = ?
    `);
    // eslint-disable-next-line
    const userRow = userStmt.get(email) as any;

    if (!userRow) {
      const errorResponse: IApiResponse<null> = {
        data: null,
        error: 'Unauthorized',
        message: 'Email ou senha incorretos',
      };
      return NextResponse.json(errorResponse, { status: 401 });
    }

    // Na autenticação falsa, qualquer senha funciona se o email existir
    // Mas podemos fazer uma validação básica se quiser
    if (!password || password.length < 6) {
      const errorResponse: IApiResponse<null> = {
        data: null,
        error: 'Unauthorized',
        message: 'Senha deve ter pelo menos 6 caracteres',
      };
      return NextResponse.json(errorResponse, { status: 401 });
    }

    const user = {
      id: userRow.id,
      name: userRow.name,
      email: userRow.email,
      avatar: userRow.avatar,
      isVerified: Boolean(userRow.is_verified),
      createdAt: new Date(userRow.created_at),
      updatedAt: new Date(userRow.updated_at),
    };

    // eslint-disable-next-line
    const successResponse: IApiResponse<{ user: any; token: string }> = {
      data: {
        user,
        token: `fake-jwt-token-${userRow.id}`, // Token fake
      },
      message: 'Login realizado com sucesso',
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    console.error('Error during login:', error);

    const errorResponse: IApiResponse<null> = {
      data: null,
      error: 'Internal Server Error',
      message: 'Erro durante o login',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
