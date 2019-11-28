<div class="bf-actions-slide__content">
  <div class="bf-actions-slide__timer"></div>
  <% if (props.discountPrefix) { %>
    <div class="bf-actions-slide__prefix"><%= props.discountPrefix %></div>
  <% } %>
  <% if (props.discount) { %>
    <div class="<%= props.discountClass %>"><%= props.discount %>%</div>
  <% } %>
  <% if (props.title) { %>
    <div class="bf-actions-slide__title"><%= props.title %></div>
  <% } %>
  <% if (props.teaser) { %>
    <img class="bf-actions-slide__teaser" src="<%= props.teaser %>"/>
  <% } %>
  <img class="bf-actions-slide__image" src="<%= props.image %>"/>
</div>