<div class="lp-game__slide-body">
  <% for (var sku in props.products) { %>
  <div  class="lp-game__slide-part" data-sku="<%= sku %>">
      <img
          class="lp-game__slide-image"
          src="//a.lmcdn.ru/pi/img389x562/<%= props.products[sku].images[0] %>"/>
      <div class="lp-game__slide-result">
          <div class="lp-game__slide-result-title">Правильный ответ!</div>
          <div class="lp-game__slide-result-text js-quiz-result-text"></div>
      </div>
  </div>
  <% } %>
</div>