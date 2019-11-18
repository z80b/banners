import _ from 'underscore';
import Backbone from 'backbone';
import QuizResultView from '@js/quiz-result-view.js';
import QuizSteps from '@js/quiz-steps.js';
import QuizStepView from '@js/quiz-step-view.js';
import QuizResultModel from '@js/quiz-result-model.js';
import QuizResultFormView from '@js/quiz-result-form-view.js';

class QuizView extends Backbone.View {
  constructor(props) {
      super(props);
  }
  
  initialize() {
      var _this = this;
      //this.skus = this.$('[name=quiz]').map((ix, el) => { return [el.value.split(',')] }).get();
      this.skus = _.map(this.el.dataset, val => val.split(','));
      // console.log(this.skus, this.el);

      this.slider = document.querySelector('.lp-game__slider');
      this.touchStart = 0;
      this.touchEnd = 0;

      this.goNextStep = this.goNextStep.bind(this);
      this.goPrevStep = this.goPrevStep.bind(this);

      this.collection = new QuizSteps();
      this.collection.update(this.skus);
      
      this.listenTo(this.collection, 'collection:ready', this.render.bind(this));
      this.listenTo(Backbone, 'quiz-model:cahge', this.onAnswered.bind(this));
      this.listenTo(Backbone, 'quiz:restart', this.restartQuiz.bind(this));
      this.listenTo(Backbone, 'game:over', this.gameOver.bind(this));
      
      this.$('.lp-game__slider-button--next').on('click', this.goNextStep);
      this.$('.lp-game__slider-button--prev').on('click', this.goPrevStep);

      this.slider.addEventListener('touchstart', function(event) {
          if (_this.$('.lp-game__slider-button').hasClass('element-hidden')) return;
          _this.touchStart = event.changedTouches[0].screenX;
      }, false);

      this.slider.addEventListener('touchend', function(event) {
          if (_this.$('.lp-game__slider-button').hasClass('element-hidden')) return;
          if (_this.touchStart <= event.changedTouches[0].screenX) {
              _this.goPrevStep();
          } else _this.goNextStep();
      }, false);
      
      if (!this.quizResultModel) {
          window.quizResultModel = this.quizResultModel = new QuizResultModel();
      }
      this.$el.addClass('lp-game-begining');
  }
  
  get events() {
      return {
          'click .js-look-answers': 'lookAnswers'
      }
  }
     
  render() {
      this.$('.js-game-slider').empty();
      
      _(this.collection.models).each((model, index) => {
          model.set('step', index);
          let quizStepView = new QuizStepView({
              id: 'qwiz-step-' + index,
              model: model
          });
          
          let quizStepElement = quizStepView.render();
          this.$('.js-game-slider').append(quizStepElement);
      });
      
      const quizResultView = new QuizResultView({
          model: this.quizResultModel,
      });
      this.$('.js-game-slider').append(quizResultView.render());
      
      this.resultForm = new QuizResultFormView({ el: '.js-quiz-form' });
          
  }
  
  lookAnswers() {
      this.$('.lp-game').attr('data-step', 2);
  }
  
  goNextStep() {
      let step = parseInt(this.$('.lp-game').attr('data-step')) + 1;
      if (step < 4) this.$('.lp-game').attr('data-step', step);
  }
  goPrevStep() {
      let step = parseInt(this.$('.lp-game').attr('data-step')) - 1;
      if (step >= 0) this.$('.lp-game').attr('data-step', step);
  }
  
  setStep(number = 0) {
      if (number >= 0 && number <= 3) {
          this.$('.lp-game').attr('data-step', number);
      }
  }
  
  onAnswered(model) {
      let currentStep = model.get('step');
      setTimeout(this.setStep.bind(this, currentStep + 1), 500);
  }
  
  restartQuiz() {
      this.$('.lp-game').attr('data-step', 0);
      this.$('.lp-game__slider-button').addClass('element-hidden');
      this.$el.addClass('lp-game-begining');
      this.collection.reset();
      this.collection.update(_.map(this.el.dataset, val => val.split(',')));
  }
  
  gameOver() {
      this.$('.lp-game__slider-button').removeClass('element-hidden');
      this.$el.removeClass('lp-game-begining');
  }
}

export default QuizView;