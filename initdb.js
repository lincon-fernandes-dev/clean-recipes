// eslint-disable-next-line
const sql = require('better-sqlite3');
const db = sql('recipes.db');

// Função para gerar IDs únicos
function generateId() {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

const MOCK_USERS = [
  {
    id: generateId('user'),
    name: 'Admin User',
    email: 'admin@email.com', // email em lowercase
    avatar: '/avatars/admin.jpg',
    is_verified: 1, // SQLite usa 1/0 para boolean
  },
  {
    id: generateId('user'),
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    avatar: '/avatars/avatar1.jpg',
    is_verified: 1,
  },
  {
    id: generateId('user'),
    name: 'João Santos',
    email: 'joao.santos@email.com',
    avatar: '/avatars/avatar2.jpg',
    is_verified: 0,
  },
  {
    id: generateId('user'),
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    avatar: '/avatars/avatar3.jpg',
    is_verified: 1,
  },
  {
    id: generateId('user'),
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    avatar: '/avatars/avatar4.jpg',
    is_verified: 0,
  },
];

async function createTables() {
  // User table (✅ OK)
  db.exec(`
    CREATE TABLE IF NOT EXISTS user (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      avatar TEXT,
      is_verified BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Recipe table (✅ OK)
  db.exec(`
    CREATE TABLE IF NOT EXISTS recipe (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      imageUrl TEXT,
      preparationTime INTEGER NOT NULL,
      servings INTEGER NOT NULL,
      difficulty TEXT CHECK(difficulty IN ('Fácil', 'Médio', 'Difícil')) NOT NULL,
      author_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES user (id) ON DELETE CASCADE
    )
  `);

  // RecipeLike table (CORRIGIDA)
  db.exec(`
    CREATE TABLE IF NOT EXISTS recipeLike (
      id TEXT PRIMARY KEY,
      recipe_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
      UNIQUE(recipe_id, user_id)
    )
  `);

  // Tags table (✅ OK)
  db.exec(`
    CREATE TABLE IF NOT EXISTS tags (
      id TEXT PRIMARY KEY,
      title TEXT UNIQUE NOT NULL  -- Added UNIQUE constraint
    )
  `);

  // RecipeTags table (CORRIGIDA)
  db.exec(`
    CREATE TABLE IF NOT EXISTS recipeTags (
      id TEXT PRIMARY KEY,  -- Added primary key
      recipe_id TEXT NOT NULL,
      tag_id TEXT NOT NULL,
      FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE,
      UNIQUE(recipe_id, tag_id)  -- Prevent duplicate tags per recipe
    )
  `);

  // NutritionInfo table (CORRIGIDA)
  db.exec(`
    CREATE TABLE IF NOT EXISTS nutritionInfo (
      id TEXT PRIMARY KEY,  -- Added primary key
      recipe_id TEXT NOT NULL,
      protein TEXT NOT NULL,
      carbs TEXT NOT NULL,
      fat TEXT NOT NULL,
      calories INTEGER NOT NULL,  -- Changed to INTEGER
      FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE,
      UNIQUE(recipe_id)  -- One nutrition info per recipe
    )
  `);

  // Ingredients table (CORRIGIDA)
  db.exec(`
    CREATE TABLE IF NOT EXISTS ingredients (
      id TEXT PRIMARY KEY,  -- Added primary key
      recipe_id TEXT NOT NULL,
      ingredient TEXT NOT NULL,
      position INTEGER NOT NULL,  -- Added for ordering
      FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE
    )
  `);

  // Instructions table (CORRIGIDA)
  db.exec(`
    CREATE TABLE IF NOT EXISTS instructions (
      id TEXT PRIMARY KEY,  -- Added primary key
      recipe_id TEXT NOT NULL,
      instruction TEXT NOT NULL,  -- Fixed typo: insttruction → instruction
      step_number INTEGER NOT NULL,  -- Added for ordering
      FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE
    )
  `);

  // Comment table (✅ OK)
  db.exec(`
    CREATE TABLE IF NOT EXISTS comment (
      id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      author_id TEXT NOT NULL,
      recipe_id TEXT NOT NULL,
      parent_comment_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES user (id) ON DELETE CASCADE,
      FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE,
      FOREIGN KEY (parent_comment_id) REFERENCES comment (id) ON DELETE CASCADE
    )
  `);

  // Comment_like table (✅ OK)
  db.exec(`
    CREATE TABLE IF NOT EXISTS comment_like (
      id TEXT PRIMARY KEY,
      comment_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (comment_id) REFERENCES comment (id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
      UNIQUE(comment_id, user_id)
    )
  `);

  // Create indexes for performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_recipe_author ON recipe(author_id);
    CREATE INDEX IF NOT EXISTS idx_recipe_like_recipe ON recipeLike(recipe_id);
    CREATE INDEX IF NOT EXISTS idx_recipe_like_user ON recipeLike(user_id);
    CREATE INDEX IF NOT EXISTS idx_recipe_tags_recipe ON recipeTags(recipe_id);
    CREATE INDEX IF NOT EXISTS idx_recipe_tags_tag ON recipeTags(tag_id);
    CREATE INDEX IF NOT EXISTS idx_ingredients_recipe ON ingredients(recipe_id);
    CREATE INDEX IF NOT EXISTS idx_instructions_recipe ON instructions(recipe_id);
    CREATE INDEX IF NOT EXISTS idx_comment_recipe ON comment(recipe_id);
    CREATE INDEX IF NOT EXISTS idx_comment_parent ON comment(parent_comment_id);
    CREATE INDEX IF NOT EXISTS idx_comment_like_comment ON comment_like(comment_id);
  `);
}

async function seedData() {
  console.log('🌱 Seeding database...');

  const tables = [
    'comment_like',
    'comment',
    'instructions',
    'ingredients',
    'nutritionInfo',
    'recipeTags',
    'tags',
    'recipeLike',
    'recipe',
    'user',
  ];

  tables.forEach((table) => {
    db.prepare(`DELETE FROM ${table}`).run();
  });

  // Insert users
  const insertUser = db.prepare(`
    INSERT INTO user (id, name, email, avatar, is_verified)
    VALUES (?, ?, ?, ?, ?)
  `);

  MOCK_USERS.forEach((user) => {
    insertUser.run(
      user.id,
      user.name,
      user.email,
      user.avatar,
      user.is_verified
    );
  });
  console.log(`✅ Inserted ${MOCK_USERS.length} users`);

  // Insert sample recipe
  const recipeId = generateId();
  const insertRecipe = db.prepare(`
    INSERT INTO recipe (id, title, description, imageUrl, preparationTime, servings, difficulty, author_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertRecipe.run(
    recipeId,
    'Bolo de Cenoura Perfeito',
    'Um bolo de cenoura fofinho e úmido com cobertura de chocolate irresistível',
    '/recipes/bolo-cenoura.jpg',
    75,
    8,
    'Médio',
    MOCK_USERS[1].id // Maria Silva
  );
  console.log('✅ Inserted sample recipe');

  // Insert tags
  const tags = ['Sobremesa', 'Fácil', 'Bolo', 'Chocolate'];
  const insertTag = db.prepare(
    'INSERT OR IGNORE INTO tags (id, title) VALUES (?, ?)'
  );
  const insertRecipeTag = db.prepare(
    'INSERT INTO recipeTags (id, recipe_id, tag_id) VALUES (?, ?, ?)'
  );

  tags.forEach((tag) => {
    const tagId = generateId();
    insertTag.run(tagId, tag);
    insertRecipeTag.run(generateId(), recipeId, tagId);
  });
  console.log('✅ Inserted tags');

  // Insert ingredients
  const ingredients = [
    '3 cenouras médias',
    '4 ovos',
    '1 xícara de óleo',
    '2 xícaras de açúcar',
    '2 xícaras de farinha de trigo',
  ];
  const insertIngredient = db.prepare(`
    INSERT INTO ingredients (id, recipe_id, ingredient, position) 
    VALUES (?, ?, ?, ?)
  `);

  ingredients.forEach((ingredient, index) => {
    insertIngredient.run(generateId(), recipeId, ingredient, index);
  });
  console.log('✅ Inserted ingredients');

  // Insert instructions
  const instructions = [
    'Preaqueça o forno a 180°C',
    'Bata as cenouras, ovos e óleo no liquidificador',
    'Misture os ingredientes secos em uma tigela',
    'Incorpore as misturas delicadamente',
    'Asse por 40 minutos',
  ];
  const insertInstruction = db.prepare(`
    INSERT INTO instructions (id, recipe_id, instruction, step_number) 
    VALUES (?, ?, ?, ?)
  `);

  instructions.forEach((instruction, index) => {
    insertInstruction.run(generateId(), recipeId, instruction, index);
  });
  console.log('✅ Inserted instructions');

  // Insert nutrition info
  const insertNutrition = db.prepare(`
    INSERT INTO nutritionInfo (id, recipe_id, protein, carbs, fat, calories)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertNutrition.run(generateId(), recipeId, '5g', '45g', '12g', 320);
  console.log('✅ Inserted nutrition info');

  // Insert recipe likes
  const insertRecipeLike = db.prepare(`
    INSERT INTO recipeLike (id, recipe_id, user_id) 
    VALUES (?, ?, ?)
  `);

  // Maria, João and Ana liked the recipe
  insertRecipeLike.run(generateId(), recipeId, MOCK_USERS[1].id);
  insertRecipeLike.run(generateId(), recipeId, MOCK_USERS[2].id);
  insertRecipeLike.run(generateId(), recipeId, MOCK_USERS[3].id);
  console.log('✅ Inserted recipe likes');

  console.log('🎉 Database seeded successfully!');
}

async function initDb() {
  try {
    await createTables();
    await seedData();

    // Test queries
    const recipeCount = db
      .prepare('SELECT COUNT(*) as count FROM recipe')
      .get().count;
    const userCount = db
      .prepare('SELECT COUNT(*) as count FROM user')
      .get().count;
    const likeCount = db
      .prepare('SELECT COUNT(*) as count FROM recipeLike')
      .get().count;

    console.log('\n📊 Final Statistics:');
    console.log(`   Recipes: ${recipeCount}`);
    console.log(`   Users: ${userCount}`);
    console.log(`   Likes: ${likeCount}`);
  } catch (error) {
    console.error('💥 Database initialization failed:', error);
  } finally {
    db.close();
  }
}

initDb();
