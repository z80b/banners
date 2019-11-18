import $ from 'jquery';
import Backbone from 'backbone';1

class LpFormView extends Backbone.View {
  constructor(props) {
      super(props);
  }

  get events() {
      return {
          'focus [type=text]': 'resetError'       
      }
  }

  initialize() {
      if (LMDA && LMDA.user && LMDA.user.email) {
          this.$el.find('[name=email]').val(LMDA.user.email);
      }
      this.showError = this.showError.bind(this);
      this.$el.on('submit', this.submitForm.bind(this));
  }
  
  parseForm() {
      return this.$el
      .find(':input[type=text], :input[type=email], :input[type=hidden]')
      .get()
      .reduce((res, el) => {
          if (el.name) res[el.name] = el.value;
          return res;
      }, {});
  }
  
  verifyField(el) {
      switch ($(el).attr('data-type')) {
          case 'email':
              if (!el.value) {
                  this.showError('Пожалуйста, заполните поле', el);
                  return false;
              }
              if (!el.value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
                  this.showError('Пожалуйста, введите действительный адрес электронной почты', el);
                  return false;
              }
              break;
      }
      return true;        
  }
  
  verifyForm() {
      let formValid = true;
      this.$el.find(':input[data-type]').each((key, $input) => {
          if (formValid)
              formValid = this.verifyField($input);
      });
      return formValid;
  }
  
  submitForm(event) {
      event.preventDefault();
      
      if (this.verifyForm()) {
          let url = this.$el.attr('action');
          let data = this.parseForm();
          $.post(this.$el.attr('action'), this.parseForm())
          .done(response => {
              if (response) {
                  if (response.status.match(/ok/i)) {
                      this.showSuccess(response);
                  } else this.showError(response);
              } else this.showError('Что-то пошло не так. Попробуйте еще раз позднее.');
          })
          .error(this.showError);  
      }
  }
  
  showError(message, el) {
      $(el).parent().addClass('field-error').find('.form__error').text(message).show();
  }
  
  resetError(event) {
      let el = event.currentTarget;
      $(el).parent().removeClass('field-error').find('.form__error').text('');
  }
  
  showSuccess(response) {
      
  }
}

export default LpFormView;