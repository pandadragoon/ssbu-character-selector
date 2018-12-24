import {
  DefaultPage,
  Question,
  Character,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'ssbu-character-selector',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
    { path: '/question/:id', name: 'Question', component: Question },
    { path: '/character/:id', name: 'Character', component: Character },
    { path: '/ssbu-character-selector/question/:id', name: 'QuestionProd', component: Question },
    { path: '/ssbu-character-selector/character/:id', name: 'CharacterProd', component: Character },
  ],
};
