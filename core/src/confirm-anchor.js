customElements.define('confirm-anchor', class extends HTMLAnchorElement{
  connectedCallback(){
    this.addEventListener("click",(e)=>{
      if(!confirm('You will be redirected outside this application!')){
        e.preventDefault();
        return false;
      }
      else{
        return true;
      }
    });
  }
},{
  extends: 'a'
});