import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import QuizModel from '@js/quiz-model.js';

class QuizSteps extends Backbone.Collection {
  constructor(props) {
      super(props);
      this.currentStep = 0;
  }
  
  get model() {
      return QuizModel;
  }
  
  initialize() {
      this.listenTo(Backbone, 'quiz-model:cahge', this.checkModels.bind(this));
  }
  
  update(skus) {
      let defResult = [];
      let _models = [];
      
      if (skus && skus.length) {
          for (let _skus of skus) {
              _skus = _skus.sort(() => (.5 - Math.random()));
              _models.push({
                  'sku1': _skus.pop(),
                  'sku2': _skus.pop()
              });
          }
          this.add(_models);
      }
      
      _.each(this.models, (model, index) => {
          let data = {};
          
          if (index == 0) {
              data = { 'bestseller': 1 };
          }
          
          defResult.push(model.update(data));
      });
      
      $.when(...defResult).done(() => {
          this.trigger('collection:ready');
      });
  }
  
  isReady() {
      let result = true;
      _(this.models).each(model => {
          if (model.status != 'ready')
              result = false;
      });
      return result;
  }
  
  checkModels() {
      let result = true;
      _(this.models).each(model => {
          if (!model.get('answer')) result = false;
      });
      if (result) Backbone.trigger('game:over');
      return result;
  }
}

export default QuizSteps;