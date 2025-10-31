// src/components/RecipeCard/RecipeCard.stories.tsx
import { Recipe } from '@/@core/domain/entities/Recipe';
import type { Meta, StoryObj } from '@storybook/react';
import RecipeCard, { IRecipe } from './RecipeCard';

const meta: Meta<typeof RecipeCard> = {
  title: 'Templates/RecipeCard',
  component: RecipeCard,
  tags: ['autodocs'],
  argTypes: {
    onVote: { action: 'Votar na receita' },
    onComment: { action: 'Abrir comentários' },
    onEdit: { action: 'Abrir edição' },
  },
};

export default meta;
type Story = StoryObj<typeof RecipeCard>;

const mockRecipeBase: IRecipe = {
  id: 'r1',
  title: 'Bolo de Chocolate Vulcânico com Calda de Brigadeiro',
  imageUrl:
    'https://images.unsplash.com/photo-1579737158327-024c084e7233?fit=crop&w=400&q=80',
  time: '1h 15m',
  servings: 10,
  votes: 42,
  commentCount: 15,
  hasVoted: false,
  canEdit: false,
  difficulty: 'Difícil',
};

export const MediumDifficulty: Story = {
  args: {
    recipe: Recipe.create({
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
      author: {
        id: 'u1',
        name: 'Maria Silva',
        email: 'maria.silva@email.com',
        avatar: '/avatars/avatar1.jpg',
        isVerified: true,
      },
      nutrition: {
        calories: 320,
        protein: '5g',
        carbs: '45g',
        fat: '12g',
      },
    }),
  },
};

export const EasyAndVoted: Story = {
  args: {
    recipe: Recipe.create({
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
      author: {
        id: 'u1',
        name: 'Maria Silva',
        email: 'maria.silva@email.com',
        avatar: '/avatars/avatar1.jpg',
        isVerified: true,
      },
      nutrition: {
        calories: 320,
        protein: '5g',
        carbs: '45g',
        fat: '12g',
      },
    }),
  },
};

export const HardAndEditable: Story = {
  args: {
    recipe: Recipe.create({
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
      author: {
        id: 'u1',
        name: 'Maria Silva',
        email: 'maria.silva@email.com',
        avatar: '/avatars/avatar1.jpg',
        isVerified: true,
      },
      nutrition: {
        calories: 320,
        protein: '5g',
        carbs: '45g',
        fat: '12g',
      },
    }),
  },
};
