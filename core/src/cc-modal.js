class ModalElement extends HTMLElement{

  constructor(){
    super();
    const shadowRoot = this.attachShadow({mode:'open'});
    shadowRoot.innerHTML = `
      <style>
      
        :host([opened]) #backdrop,
        :host([opened]) #modal{
          opacity: 1;
          pointer-events: all;
        }

        :host([opened]) #modal{
          top: 15vh;
        }

        #backdrop{
          width: 100vw;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background-color: rgba(0,0,0,0.65);
          z-index: 10;
          opacity:0;
          pointer-events: none;
        }

        #modal{
          width: 50%;
          position: fixed;
          top: 10vh;
          left: 25%;
          background-color: white;
          z-index: 100;
          display:flex;
          flex-direction: column;
          justify-content: space-between;
          opacity:0;
          pointer-events: none;
          transition: all 0.5s ease-out;
        }

        header, section, footer{
          padding: 0.5rem;
        }

        footer{
          border-top: 1px solid #ccc;
          display: flex;
          justify-content: flex-end;
        }

        footer button{
          margin-right: 0.5rem;
        }

        header{
          border-bottom: 1px solid #ccc;
        }

        ::slotted(h1){
          margin: 0.5rem 0;
          font-size: 1.5rem;
        }
    
      </style>
      <div id="backdrop">
      </div>
      <div id="modal">
        <header>
          <slot name="title">
            <h1>Confirm Dialog</h1>
          </slot>
        </header>
        <section>
         <slot name="content">
          <p>
            No info to show.
          </p>
         </slot>
        </section>
        <footer>
          <button id="cancel">Cancel</button>
          <button id="confirm">Confirm</button>
        </footer>
      </div>
    `;
  }


  connectedCallback(){
    const cancelButton = this.shadowRoot.querySelector('#cancel');
    const confirmButton = this.shadowRoot.querySelector('#confirm');
    
    cancelButton.addEventListener('click', (e)=>{
      this.hideModal();
      this.dispatchEvent(new Event('cancelled'));
    });

    confirmButton.addEventListener('click', (e)=>{
      this.hideModal();
      this.dispatchEvent(new Event('confirmed'));
      
    });
  }

  attributeChangedCallback(name, oldValue, newValue){
    if(this.isOpened){
      const event =  new Event('opened');
      this.dispatchEvent(event);
    }
    else{
      const event =  new Event('closed');
      this.dispatchEvent(event);
    }
  }

  static get observedAttributes(){
    return ['opened'];
  }


  hideModal(){
    this.removeAttribute('opened');
  }

  showModal(){
    this.setAttribute('opened','');
  }

  get isOpened(){
    return this.hasAttribute('opened');
  }

  set isOpened(val){
    return;  
  }

}

customElements.define('cc-modal', ModalElement);