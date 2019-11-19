import $ from 'jquery';
import Backbone from 'backbone';

class QuizModel extends Backbone.Model {
  constructor(props) {
      super(props);
  }
  
  get defaults() {
      return {
          'sku1': '',
          'sku2': '',
          'step': 0,
          'products': {},
          'status': 'none',
          'answer': '',
          'result': null
      }
  }
  
  initialize() {
      this.on('change:answer', this.checkResult);
      this.reset = this.reset.bind(this);
  }
  
  update(_data) {
    let data = Object.assign({ 'sku1': this.get('sku1'), 'sku2': this.get('sku2') }, _data );
    return $.post('/blackfriday/preparequestions/', data, this.updateHandler.bind(this));
  }
  
  updateHandler(response) {
      if (response && response.status == 'OK') {
          this.set('products', response.products);
          this.set('status', 'ready');
      }
  }
  
  checkResult() {
      console.log('checkResult');
      const products = this.get('products');
      const answer = this.get('answer');
      const sku1 = this.get('sku1');
      const sku2 = this.get('sku2');
      console.log(products, answer);
      if (products && products[sku1]) {
          switch(this.get('step')) {
              case 0:
                  if (parseInt(products[sku1].purchase_count) > parseInt(products[sku2].purchase_count)) {
                    console.log(products, answer);
                      if (answer == sku1) {
                          this.set('result', true);
                          Backbone.trigger('quiz-model:rightanswer', answer, true);
                      } else {
                          this.set('result', false);
                          Backbone.trigger('quiz-model:rightanswer', answer, false);
                      }
                  }  else if (parseInt(products[sku1].purchase_count) == parseInt(products[sku2].purchase_count)) {
                      this.set('result', true);
                      Backbone.trigger('quiz-model:rightanswer', answer, true);
                  } else {
                      if (answer == sku2) {
                          this.set('result', true);
                          Backbone.trigger('quiz-model:rightanswer', answer, true);
                      } else {
                          this.set('result', false);
                          Backbone.trigger('quiz-model:rightanswer', answer, false);
                      }
                  }
                  break;
                  
              case 1:
                  if (parseInt(products[sku1].discount) > parseInt(products[sku2].discount)) {
                      if (answer == sku1) {
                          this.set('result', true);
                          Backbone.trigger('quiz-model:rightanswer', answer, true);
                      } else {
                          this.set('result', false);
                          Backbone.trigger('quiz-model:rightanswer', answer, false);
                      }
                  }  else if (parseInt(products[sku1].discount) == parseInt(products[sku2].discount)) {
                      this.set('result', true);
                      Backbone.trigger('quiz-model:rightanswer', answer, true);
                  } else {
                      if (answer == sku2) {
                          this.set('result', true);
                          Backbone.trigger('quiz-model:rightanswer', answer, true);
                      } else {
                          this.set('result', false);
                          Backbone.trigger('quiz-model:rightanswer', answer, false);
                      }
                  }
                  break;
                  
              case 2:
                  if (parseInt(products[sku1].price) > parseInt(products[sku2].price)) {
                      if (answer == sku1) {
                          this.set('result', true);
                          Backbone.trigger('quiz-model:rightanswer', answer, true);
                      } else {
                          this.set('result', false);
                          Backbone.trigger('quiz-model:rightanswer', answer, false);
                      }
                  }  else if (parseInt(products[sku1].price) == parseInt(products[sku2].price)) {
                      this.set('result', true);
                      Backbone.trigger('quiz-model:rightanswer', answer, true);
                  } else {
                      if (answer == sku2) {
                          this.set('result', true);
                          Backbone.trigger('quiz-model:rightanswer', answer, true);
                      } else {
                          this.set('result', false);
                          Backbone.trigger('quiz-model:rightanswer', answer, false);
                      }
                  }
                  break;
          }
          Backbone.trigger('quiz-model:cahge', this);
      }
  }
  
  reset() {
      this.clear().set(this.defaults);
  }
}

export default QuizModel;