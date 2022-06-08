function faqsShowTab() {
    $(document).on("click", ".faqs-service__head", function (e) {
        e.preventDefault();
        const $_this = $(this);
        const items = $_this.parents(".faqs-service__item").siblings();
        $_this.toggleClass("is-active");
        $_this.siblings(".faqs-service__content").slideToggle();
        items.children(".faqs-service__content").slideUp();
        items.children(".faqs-service__head").removeClass("is-active");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    jQuery(document).ready(function ($) {
        faqsShowTab();
        theme.scrollToStep(".scroll-to-step");
    });
});
