import QuizView from '@js/quiz-view.js';
import '@css/index.styl';

document.addEventListener('DOMContentLoaded',function() {
  var quiz = new QuizView({ el: '.js-quiz-block' });
});