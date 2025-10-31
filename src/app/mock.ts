// src/data/mockRecipes.ts
import { Comment } from '@/@core/domain/entities/Comment';
import { Recipe } from '@/@core/domain/entities/Recipe';
import { IUser } from '@/Domain/Interfaces/IUser';

// Mock Users
const MOCK_USERS: IUser[] = [
  {
    id: 'u1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    avatar: '/avatars/avatar1.jpg',
    isVerified: true,
  },
  {
    id: 'u2',
    name: 'João Santos',
    email: 'joao.santos@email.com',
    avatar: '/avatars/avatar2.jpg',
    isVerified: false,
  },
  {
    id: 'u3',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    avatar: '/avatars/avatar3.jpg',
    isVerified: true,
  },
  {
    id: 'u4',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    avatar: '/avatars/avatar4.jpg',
    isVerified: false,
  },
];

// Mock Recipes
export const MOCK_RECIPES: Recipe[] = [
  Recipe.create({
    id: 'r1',
    title: 'Bolo de Cenoura Perfeito',
    description:
      'Um bolo de cenoura fofinho e úmido, com aquela cobertura de chocolate irresistível que todo mundo ama. Perfeito para o café da tarde!',
    imageUrl: '/recipes/bolo-de-cenoura.jpg',
    preparationTime: 75,
    servings: 8,
    difficulty: 'Médio',
    ingredients: [
      '3 cenouras médias descascadas e picadas',
      '4 ovos',
      '1 xícara de óleo de canola',
      '2 xícaras de açúcar refinado',
      '2 xícaras de farinha de trigo',
      '1 colher de sopa de fermento em pó',
      '1 pitada de sal',
      'Para a cobertura:',
      '200g de chocolate meio amargo',
      '1 lata de creme de leite sem soro',
      '1 colher de sopa de manteiga',
    ],
    instructions: [
      'Preaqueça o forno a 180°C. Unte e enfarinhe uma forma de furo central.',
      'No liquidificador, adicione as cenouras picadas, os ovos e o óleo. Bata até obter uma mistura homogênea.',
      'Em uma tigela grande, misture o açúcar, a farinha de trigo, o fermento e o sal.',
      'Despeje a mistura do liquidificador na tigela com os ingredientes secos e mexa delicadamente até incorporar. Não bata demasiado para não desenvolver o glúten.',
      'Despeje a massa na forma preparada e leve ao forno por aproximadamente 40 minutos, ou até que um palito inserido no centro saia limpo.',
      'Enquanto o bolo assa, prepare a cobertura: em banho-maria, derreta o chocolate com a manteiga.',
      'Retire do fogo e misture o creme de leite até obter um creme liso e brilhante.',
      'Espere o bolo esfriar completamente antes de desenformar e aplicar a cobertura.',
    ],
    tags: ['Sobremesa', 'Clássico', 'Fácil', 'Bolo', 'Café da Tarde'],
    author: MOCK_USERS[0],
    nutrition: {
      calories: 320,
      protein: '5g',
      carbs: '45g',
      fat: '12g',
    },
  }),

  Recipe.create({
    id: 'r2',
    title: 'Strogonoff Clássico de Frango',
    description:
      'O clássico strogonoff brasileiro, cremoso e saboroso, perfeito para um almoço em família ou para receber visitas. Um prato que agrada a todos!',
    imageUrl: '/recipes/strogonoff-de-frango.jpg',
    preparationTime: 40,
    servings: 4,
    difficulty: 'Fácil',
    ingredients: [
      '500g de peito de frango em cubos',
      '1 cebola média picada',
      '2 dentes de alho picados',
      '1 colher de sopa de manteiga',
      '1 colher de sopa de azeite de oliva',
      '1 colher de sopa de mostarda Dijon',
      '2 colheres de sopa de ketchup',
      '1 colher de sopa de molho inglês',
      '1 lata de creme de leite',
      '100g de champignons em conserva (opcional)',
      'Sal e pimenta-do-reino a gosto',
      'Salsinha picada para decorar',
      'Batata palha para acompanhar',
    ],
    instructions: [
      'Tempere o frango com sal e pimenta a gosto.',
      'Em uma panela grande, aqueça o azeite e a manteiga em fogo médio.',
      'Adicione a cebola e o alho picados e refogue até ficarem dourados e perfumados.',
      'Acrescente o frango e doure por todos os lados, cerca de 5-7 minutos.',
      'Adicione a mostarda, o ketchup e o molho inglês. Misture bem.',
      'Se estiver usando champignons, adicione-os agora.',
      'Cozinhe por mais 5 minutos em fogo baixo, mexendo ocasionalmente.',
      'Desligue o fogo e adicione o creme de leite. Misture suavemente.',
      'Volte ao fogo baixo por 2 minutos, apenas para aquecer (não deixe ferver).',
      'Finalize com salsinha picada e sirva imediatamente com arroz branco e batata palha.',
    ],
    tags: ['Prato Principal', 'Família', 'Cremoso', 'Frango', 'Almoço'],
    author: MOCK_USERS[1],
    nutrition: {
      calories: 280,
      protein: '25g',
      carbs: '8g',
      fat: '16g',
    },
  }),
];

// Agora vamos adicionar comentários e votos às receitas
// Bolo de Cenoura (r1)
MOCK_RECIPES[0].addComment(
  Comment.create({
    id: 'c1',
    content:
      'Fiz esse bolo no domingo e ficou incrível! Minha família adorou. A dica de não bater demais a massa na tigela fez toda a diferença para a textura ficar fofinha.',
    author: MOCK_USERS[3],
    recipeId: 'r1',
  })
);

MOCK_RECIPES[0].addComment(
  Comment.createReply({
    id: 'c1r1',
    content:
      'Que bom que gostou, Carlos! Realmente, essa dica da massa é fundamental para o bolo ficar fofinho. A cenoura também precisa estar bem triturada no liquidificador.',
    author: MOCK_USERS[0],
    recipeId: 'r1',
    parentCommentId: 'c1',
  })
);

MOCK_RECIPES[0].addComment(
  Comment.create({
    id: 'c2',
    content:
      'Alguém já tentou fazer com cenoura orgânica? Faz diferença no sabor? Estou pensando em testar na próxima vez.',
    author: MOCK_USERS[2],
    recipeId: 'r1',
  })
);

MOCK_RECIPES[0].addComment(
  Comment.createReply({
    id: 'c2r1',
    content:
      'Já fiz com cenoura orgânica e fica um sabor mais doce e natural. Vale a pena testar! A cor também fica mais vibrante.',
    author: MOCK_USERS[1],
    recipeId: 'r1',
    parentCommentId: 'c2',
  })
);

// Strogonoff (r2)
MOCK_RECIPES[1].addComment(
  Comment.create({
    id: 'c3',
    content:
      'Receita perfeita para o almoço de domingo! Minhas crianças adoraram. Usei creme de leite fresco e ficou ainda mais cremoso.',
    author: MOCK_USERS[0],
    recipeId: 'r2',
  })
);

MOCK_RECIPES[1].addComment(
  Comment.create({
    id: 'c4',
    content:
      'Alguém tem dica para deixar o frango mais macio? Fiz conforme a receita mas achei que poderia ficar mais tenro.',
    author: MOCK_USERS[3],
    recipeId: 'r2',
  })
);

MOCK_RECIPES[1].addComment(
  Comment.createReply({
    id: 'c4r1',
    content:
      'Uma dica é marinar o frango por 30 minutos com um pouco de suco de limão ou vinagre antes de cozinhar. Fica super macio!',
    author: MOCK_USERS[1],
    recipeId: 'r2',
    parentCommentId: 'c4',
  })
);

// Adicionar alguns votos
MOCK_RECIPES[0].vote('u2');
MOCK_RECIPES[0].vote('u3');
MOCK_RECIPES[0].vote('u4');

MOCK_RECIPES[1].vote('u1');
MOCK_RECIPES[1].vote('u3');
MOCK_RECIPES[1].vote('u4');

// Adicionar alguns likes nos comentários
MOCK_RECIPES[0].comments[0].like('u1'); // Like no primeiro comentário do bolo
MOCK_RECIPES[0].comments[0].like('u2');
MOCK_RECIPES[1].comments[0].like('u3'); // Like no primeiro comentário do strogonoff

// Função auxiliar para buscar receita por ID
export const getRecipeById = (id: string): Recipe | undefined => {
  return MOCK_RECIPES.find((recipe) => recipe.id === id);
};

// Função para buscar todas as receitas
export const getAllRecipes = (): Recipe[] => {
  return MOCK_RECIPES;
};

// Função para buscar receitas por autor
export const getRecipesByAuthor = (authorId: string): Recipe[] => {
  return MOCK_RECIPES.filter((recipe) => recipe.author.id === authorId);
};
