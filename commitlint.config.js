module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build', // Alterações que afetam o sistema de build ou dependências externas
        'chore', // Tarefas de manutenção, não afetam funcionalidades
        'ci', // Alterações em configuração de CI/CD
        'docs', // Apenas documentação
        'feat', // Nova funcionalidade
        'fix', // Correção de bug
        'perf', // Melhorias de performance
        'refactor', // Refatoração de código sem alterar funcionalidade
        'revert', // Revertendo commits anteriores
        'style', // Alterações de formatação, não afetam significado
        'test', // Adicionando ou corrigindo testes
        'translation', // Alterações relacionadas a traduções
        'security', // Correções de segurança
        'changeset', // Adicionando ou modificando changesets
      ],
    ],
  },
};
