class TestComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        this.shadowRoot.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(response => response.text());
    }
}

customElements.define("test-component", TestComponent);