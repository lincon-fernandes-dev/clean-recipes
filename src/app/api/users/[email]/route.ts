// src/app/api/users/[email]/route.ts
import { IApiResponse } from '@/Domain/Interfaces/IApiResponse';
import { IUser } from '@/Domain/Interfaces/IUser';
import Database from 'better-sqlite3';
import { NextRequest, NextResponse } from 'next/server';

const db = new Database('recipes.db');

interface RouteParams {
  params: Promise<{
    email: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { email } = await params;

    if (!email) {
      const errorResponse: IApiResponse<null> = {
        data: null,
        error: 'Bad Request',
        message: 'Email é obrigatório',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Decodificar email (pode vir encoded na URL)
    const decodedEmail = decodeURIComponent(email);

    // Buscar usuário pelo email
    const userStmt = db.prepare(`
      SELECT * FROM user WHERE email = ?
    `);

    const userRow = userStmt.get(decodedEmail) as IUser | undefined;

    if (!userRow) {
      const errorResponse: IApiResponse<null> = {
        data: null,
        error: 'Not Found',
        message: 'Usuário não encontrado',
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const user: IUser = {
      id: userRow.id,
      name: userRow.name,
      password: 'tezsadasdas',
      email: userRow.email,
      avatar: userRow.avatar,
    };

    const successResponse: IApiResponse<IUser> = {
      data: user,
      message: 'Usuário encontrado com sucesso',
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    console.error('Error fetching user:', error);

    const errorResponse: IApiResponse<null> = {
      data: null,
      error: 'Internal Server Error',
      message: 'Erro ao buscar usuário',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
