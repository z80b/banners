import Backbone from 'backbone';
import LpFormView from '@js/libs/form-view.js';

class QuizResultFormView extends LpFormView {
  constructor(props) {
      super(props);
  }
  
  showError(message, el) {
      if (this.$el.data('factor') == 'desktop') {
          super.showError(message, el);
      } else {
          if (typeof(message) == 'string') {
              $('.js-quiz-final-result-text').html(message);
          } else {
              $('.js-quiz-final-result-text').html('Что-то пошло не так. Попробуйте еще раз позднее.');
          }
      }
  }
  
  showSuccess() {
      $('.js-more-discounts').show();
      $('.js-quiz-final-result-text').html('Поздравляем! На ваш e-mail придет письмо<br/>с промокодом на скидку 15%');
      $('.js-quiz-form').hide();
      $('.lp-promo-form__footer').show();
      $('.lp-game__slider-button').removeClass('element-hidden');
      Backbone.trigger('quiz_email:success');
  }
}

export default QuizResultFormView;