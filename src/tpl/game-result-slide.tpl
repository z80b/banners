<div class="lp-game__slide-body">
  <div class="lp-game__result lp-game__result--success">
      <div class="lp-game__result-icon"></div>
      <div class="lp-game__result-text lp-game__result-text--success">
          <span class="js-quiz-final-result-text">Ура, вы дали верные ответы на все вопросы
          Введите ваш e-mail для получения скидки 15%</span>
      </div>
      <div class="lp-game__result-text lp-game__result-text--fail">
          <span>Упс, вы не угадали ответы на все вопросы...
          Попытайте удачу еще раз!</span>
      </div>
      <div class="lp-game__result-content lp-game__result-content--success">
          <form class="lp-promo-form js-quiz-form" action="/blackfriday/quiz/sendcoupon/" data-factor="desktop">
              <div class="lp-promo-form__element lp-promo-form__element--email">
                  <input class="lp-promo-form__email" type="text" name="email" value="" maxlength="50" placeholder="Введите e-mail ..." autocomplete="off" data-type="email"/>
                  <div data-form-error="email" class="form__error lp-promo-form__form-error"></div>
              </div>
              <div data-form-widget="gender" class="lp-promo-form__buttons">
                  <input type="hidden" name="gender" value="F" data-form-control="gender" />
                  <button class="lp-promo-form__submit lp-promo-form__submit--women" type="submit" name="gender" value="M" data-gender="F"></button>
                  <button class="lp-promo-form__submit lp-promo-form__submit--men" type="submit" name="gender" value="F" data-gender="M"></button>
              </div>

          </form>
          <div class="lp-promo-form__footer">
              <a class="lp-promo-form__footer-link js-more-discounts" href="">Хочу еще скидок</a>
          </div>
      </div>
      <div class="lp-game__result-content lp-game__result-content--fail">
          <div class="lp-game__result-dots">
              <div class="lp-game__result-dot lp-game__result-dot--1"></div>
              <div class="lp-game__result-dot lp-game__result-dot--2"></div>
              <div class="lp-game__result-dot lp-game__result-dot--3"></div>
          </div>
          <div class="lp-game__result-buttons">
              <button class="lp-game__result-button js-game-restart">Теперь точно угадаю</button>
          </div>
      </div>
  </div>
</div>