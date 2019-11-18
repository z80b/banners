import Backbone from 'backbone';

class QuizResultModel extends Backbone.Model {
  constructor(props) {
      super(props);
  }
  
  get defaults() {
      return {
          'steps': [ false, false, false ],
          'result': null
      }
  }
  
  initialize() {
      this.listenTo(Backbone, 'quiz-model:cahge', this.updateResult);
  }
  
  reset() {
      this.clear({ silent: true }).set(this.defaults);
  }
  
  updateResult(model) {
      let steps = this.get('steps');
      steps[model.get('step')] = model.get('result');
      this.set('steps', steps);
      this.set('result', this.attributes.steps.every(val => val));
      this.trigger('change:result', this);
  }
}

export default QuizResultModel;