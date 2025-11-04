// src/app/api/users/route.ts
import { IApiResponse } from '@/Domain/Interfaces/IApiResponse';
import { IUser } from '@/Domain/Interfaces/IUser';
import Database from 'better-sqlite3';
import { NextRequest, NextResponse } from 'next/server';

const db = new Database('recipes.db');
function generateId() {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validações
    if (!name || !email || !password) {
      const errorResponse: IApiResponse<null> = {
        data: null,
        error: 'Bad Request',
        message: 'Nome, email e senha são obrigatórios',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (password.length < 6) {
      const errorResponse: IApiResponse<null> = {
        data: null,
        error: 'Bad Request',
        message: 'Senha deve ter pelo menos 6 caracteres',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Verificar se usuário já existe
    const checkUserStmt = db.prepare('SELECT * FROM user WHERE email = ?');
    const existingUser = checkUserStmt.get(email) as IUser | undefined;

    if (existingUser) {
      const errorResponse: IApiResponse<null> = {
        data: null,
        error: 'Conflict',
        message: 'Email já cadastrado',
      };
      return NextResponse.json(errorResponse, { status: 409 });
    }

    // Criar novo usuário
    const userId = generateId();

    const insertUser = db.prepare(`
    INSERT INTO user (id, name, email, avatar, is_verified)
    VALUES (?, ?, ?, ?, ?)
    `);

    insertUser.run(userId, name, email, '/avatars/admin.jpg', 1);

    // Buscar usuário criado
    const getUserStmt = db.prepare('SELECT * FROM user WHERE id = ?');
    const newUser = getUserStmt.get(userId) as IUser;

    const successResponse: IApiResponse<IUser> = {
      data: newUser,
      message: 'Usuário criado com sucesso',
    };

    return NextResponse.json(successResponse, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);

    const errorResponse: IApiResponse<null> = {
      data: null,
      error: 'Internal Server Error',
      message: 'Erro interno do servidor',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function GET() {
  try {
    const getUsersStmt = db.prepare(
      'SELECT * FROM user ORDER BY created_at DESC'
    );
    const users = getUsersStmt.all() as IUser[];

    const successResponse: IApiResponse<IUser[]> = {
      data: users,
      message: 'Usuários recuperados com sucesso',
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    console.error('Error fetching users:', error);

    const errorResponse: IApiResponse<null> = {
      data: null,
      error: 'Internal Server Error',
      message: 'Erro ao buscar usuários',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
