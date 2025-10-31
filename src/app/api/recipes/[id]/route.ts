// src/app/api/recipes/route.ts
import { MOCK_RECIPES } from '@/app/mock';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simular um delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (request.nextUrl.searchParams.get('error') === 'true') {
      throw new Error('Simulated error');
    }
    // Converter as entidades Recipe para IRecipe usando toInterface()
    const recipes = MOCK_RECIPES.find(
      (recipe) => recipe.id === request.nextUrl.pathname.split('/').pop()
    )?.toInterface();

    return NextResponse.json({
      data: recipes,
      message: 'Receitas carregadas com sucesso',
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Erro ao carregar receitas' },
      { status: 500 }
    );
  }
}
