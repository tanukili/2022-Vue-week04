export default {
    // prop 將外層資料傳入內層
    props: ['pages', 'getData'],
    template: `<nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item"
        :class="{ disabled: !pages.has_pre }">
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="getData(pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- 呈現頁數 -->
      <li class="page-item" 
        v-for="page in pages.total_pages" :key="page +'page'"
        :class="{ active: pages.current_page === page }">
        <!-- 記得要把 page 作為參數帶入 -->
        <a class="page-link" href="#"
          @click.prevent="getData(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item"
        :class="{ disabled: !pages.has_next }">
        <a class="page-link" href="#" aria-label="Next"
          @click.prevent="getData(pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
};
// 另一種寫法：使用 emit 觸發外層方發 getData
// 將 當前頁面取名為 change-page 傳出
// @click.prevent="$emit('change-page', page)"
// 在 html 元件中使用 v-on 觸發外層方法
// <pagination :pages="page" :change-page="getData"></pagination>