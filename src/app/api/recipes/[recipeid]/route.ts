// src/app/api/recipes/[id]/route.ts
import { IApiResponse } from '@/Domain/Interfaces/IApiResponse';
import { IComment } from '@/Domain/Interfaces/IComment';
import { IRecipe } from '@/Domain/Interfaces/IRecipe';
import Database from 'better-sqlite3';
import { NextRequest, NextResponse } from 'next/server';

const db = new Database('recipes.db');

interface RouteParams {
  params: Promise<{
    recipeid: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { recipeid } = await params;

    if (!recipeid) {
      const errorResponse: IApiResponse<null> = {
        data: null,
        error: 'Bad Request',
        message: 'ID da receita é obrigatório',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Buscar receita completa
    const recipe = await getRecipeById(recipeid);

    if (!recipe) {
      const errorResponse: IApiResponse<null> = {
        data: null,
        error: 'Not Found',
        message: 'Receita não encontrada',
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const successResponse: IApiResponse<IRecipe> = {
      data: recipe,
      message: 'Receita carregada com sucesso',
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    console.error('Error fetching recipe:', error);

    const errorResponse: IApiResponse<null> = {
      data: null,
      error: 'Internal Server Error',
      message: 'Erro ao carregar receita',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

async function getRecipeById(id: string): Promise<IRecipe | null> {
  // Buscar receita básica
  const recipeStmt = db.prepare(`
    SELECT 
      r.*,
      u.id as author_id, u.name as author_name, u.email as author_email,
      u.avatar as author_avatar, u.is_verified as author_is_verified,
      u.created_at as author_created, u.updated_at as author_updated,
      COUNT(rl.id) as votes,
      GROUP_CONCAT(DISTINCT rl.user_id) as voted_by_user_ids
    FROM recipe r
    JOIN user u ON r.author_id = u.id
    LEFT JOIN recipeLike rl ON r.id = rl.recipe_id
    WHERE r.id = ?
    GROUP BY r.id
  `);
  // eslint-disable-next-line
  const recipeRow = recipeStmt.get(id) as any;

  if (!recipeRow) {
    return null;
  }

  return await buildCompleteRecipe(recipeRow);
}

// Reutilizar as mesmas funções do route anterior
// eslint-disable-next-line
async function buildCompleteRecipe(recipeRow: any): Promise<IRecipe> {
  const recipeId = recipeRow.id;

  // Buscar autor
  const author = {
    id: recipeRow.author_id,
    name: recipeRow.author_name,
    password: '',
    email: recipeRow.author_email,
    avatar: recipeRow.author_avatar,
    isVerified: Boolean(recipeRow.author_is_verified),
    createdAt: new Date(recipeRow.author_created),
    updatedAt: new Date(recipeRow.author_updated),
  };

  // Buscar ingredientes
  const ingredientsStmt = db.prepare(`
    SELECT ingredient 
    FROM ingredients 
    WHERE recipe_id = ? 
    ORDER BY position
  `);
  // eslint-disable-next-line
  const ingredientsRows = ingredientsStmt.all(recipeId) as any[];
  const ingredients = ingredientsRows.map((row) => row.ingredient);

  // Buscar instruções
  const instructionsStmt = db.prepare(`
    SELECT instruction 
    FROM instructions 
    WHERE recipe_id = ? 
    ORDER BY step_number
  `);
  // eslint-disable-next-line
  const instructionsRows = instructionsStmt.all(recipeId) as any[];
  const instructions = instructionsRows.map((row) => row.instruction);

  // Buscar tags
  const tagsStmt = db.prepare(`
    SELECT t.title 
    FROM tags t
    JOIN recipeTags rt ON t.id = rt.tag_id
    WHERE rt.recipe_id = ?
  `);
  // eslint-disable-next-line
  const tagsRows = tagsStmt.all(recipeId) as any[];
  const tags = tagsRows.map((row) => row.title);

  // Buscar informações nutricionais
  const nutritionStmt = db.prepare(
    'SELECT * FROM nutritionInfo WHERE recipe_id = ?'
  );
  // eslint-disable-next-line
  const nutritionRow = nutritionStmt.get(recipeId) as any;
  const nutrition = nutritionRow
    ? {
        calories: nutritionRow.calories,
        protein: nutritionRow.protein,
        carbs: nutritionRow.carbs,
        fat: nutritionRow.fat,
      }
    : undefined;

  // Buscar comentários
  const comments = await getRecipeComments(recipeId);

  // Calcular rating
  const rating = calculateRating(recipeRow.votes);

  // Construir objeto votedBy
  const votedByUserIds = recipeRow.voted_by_user_ids
    ? recipeRow.voted_by_user_ids.split(',')
    : [];
  const votedBy = new Set(votedByUserIds as string[]);

  const recipe: IRecipe = {
    id: recipeRow.id,
    title: recipeRow.title,
    description: recipeRow.description,
    imageUrl: recipeRow.imageUrl,
    preparationTime: recipeRow.preparationTime,
    servings: recipeRow.servings,
    difficulty: recipeRow.difficulty,
    ingredients,
    instructions,
    tags: tags.length > 0 ? tags : undefined,
    author,
    nutrition,
    votes: recipeRow.votes || 0,
    votedBy,
    comments: comments.length > 0 ? comments : undefined,
    rating,
    createdAt: new Date(recipeRow.created_at),
    updatedAt: new Date(recipeRow.updated_at),
  };

  return recipe;
}

async function getRecipeComments(recipeId: string) {
  // Buscar comentários principais (sem parent)
  const commentsStmt = db.prepare(`
    SELECT 
      c.*,
      u.id as author_id, u.name as author_name, u.email as author_email,
      u.avatar as author_avatar, u.is_verified as author_is_verified,
      COUNT(cl.id) as likes_count,
      GROUP_CONCAT(DISTINCT cl.user_id) as liked_by_user_ids
    FROM comment c
    JOIN user u ON c.author_id = u.id
    LEFT JOIN comment_like cl ON c.id = cl.comment_id
    WHERE c.recipe_id = ? AND c.parent_comment_id IS NULL
    GROUP BY c.id
    ORDER BY c.created_at
  `);
  // eslint-disable-next-line
  const commentRows = commentsStmt.all(recipeId) as any[];
  const comments = [];

  for (const row of commentRows) {
    const comment = await buildCompleteComment(row);
    comments.push(comment);
  }

  return comments;
}
// eslint-disable-next-line
async function buildCompleteComment(commentRow: any) {
  const commentId = commentRow.id;

  // Buscar autor do comentário
  const author = {
    id: commentRow.author_id,
    name: commentRow.author_name,
    password: '',
    email: commentRow.author_email,
    avatar: commentRow.author_avatar,
    isVerified: Boolean(commentRow.author_is_verified),
  };

  // Buscar respostas (replies)
  const repliesStmt = db.prepare(`
    SELECT 
      c.*,
      u.id as author_id, u.name as author_name, u.email as author_email,
      u.avatar as author_avatar, u.is_verified as author_is_verified,
      COUNT(cl.id) as likes_count,
      GROUP_CONCAT(DISTINCT cl.user_id) as liked_by_user_ids
    FROM comment c
    JOIN user u ON c.author_id = u.id
    LEFT JOIN comment_like cl ON c.id = cl.comment_id
    WHERE c.parent_comment_id = ?
    GROUP BY c.id
    ORDER BY c.created_at
  `);
  // eslint-disable-next-line
  const replyRows = repliesStmt.all(commentId) as any[];
  const replies = [];

  for (const row of replyRows) {
    const reply = await buildCompleteComment(row);
    replies.push(reply);
  }

  // Construir likedBy
  const likedByUserIds = commentRow.liked_by_user_ids
    ? commentRow.liked_by_user_ids.split(',')
    : [];
  const likedBy = new Set(likedByUserIds as string[]);

  const comment: IComment = {
    id: commentRow.id,
    recipeId: commentRow.recipe_id,
    parentCommentId: commentRow.parent_comment_id || undefined,
    author,
    content: commentRow.content,
    likes: commentRow.likes_count || 0,
    replies: replies.length > 0 ? replies : undefined,
    likedBy,
    createdAt: new Date(commentRow.created_at),
    updatedAt: new Date(commentRow.updated_at),
  };

  return comment;
}

function calculateRating(votes: number): number {
  if (votes === 0) return 0;

  const baseRating = 4.0 + Math.min(votes, 50) / 50;
  return Math.round(baseRating * 10) / 10;
}
