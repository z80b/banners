import Backbone from 'backbone';
import gameSlideTpl from '@tpl/game-slide.tpl';

class QuizStepView extends Backbone.View {
  constructor(props) {
      super(props);
      
      this.tagName = 'div';
  }
  
  get className() { return 'lp-game__slide' }
  
  get events() {
      return {
          'click .lp-game__slide-part': 'slideChecked'   
      }
  }
  
  initialize() {
      this.listenTo(this.model, 'change:result', this.showResult.bind(this));
      this.listenTo(Backbone, 'quiz:restart', this.model.reset);
      this.render = this.render.bind(this);
  }
  
  render() {
      this.$el.html(gameSlideTpl(this.model.toJSON()));
      return this.el;        
  }
  
  slideChecked(event) {
      if (!this.model.get('answer')) {
          this.model.set('answer', event.currentTarget.getAttribute('data-sku'));
      }
  }
  
  showResult(model) {
      const data = model.toJSON();
      if (data && data.products && data.products[data.sku1]) {
          if (data.result) {
              this.$el.find(`[data-sku="${data.answer}"]`).addClass('lp-game__slide-part--success');
              this.setRsultText(this.$el.find(`[data-sku="${data.answer}"] .js-quiz-result-text`), data.step, data.products[data.answer]);
          } else {
              if (data.answer == data.sku1) {
                  this.$el.find(`[data-sku="${data.sku2}"]`).addClass('lp-game__slide-part--success');
                  this.setRsultText(this.$el.find(`[data-sku="${data.sku2}"] .js-quiz-result-text`), data.step, data.products[data.sku2]);
              } else {
                  this.$el.find(`[data-sku="${data.sku1}"]`).addClass('lp-game__slide-part--success');
                  this.setRsultText(this.$el.find(`[data-sku="${data.sku1}"] .js-quiz-result-text`), data.step, data.products[data.sku1]);
              }
          }
      }
  }
  
  setRsultText(el, step, product) {
      let text = '';
      
      switch (step) {
          case 0:
              text = `Этого товара было продано больше`;
              break;
          case 1:
              text = `Скидка на товар ${product.discount} ${LMDA.country.currency}`;
              break;
          case 2:
              text = `Цена товара ${product.price} ${LMDA.country.currency}`;                
              break;
      }
      $(el).text(text);
  }
}

export default QuizStepView;